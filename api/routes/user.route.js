const express = require("express");
const { User, Assessee, Notice, Demand, Itr, Audit, EProceeding, Otp } = require("../models/models");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; // keep in env variable!
// const JWT_EXPIRES_IN = "15m"; // short-lived access token

const { Resend } = require("resend");
const authMiddleware = require("../middlewares/auth.middleware");
const resend = new Resend(process.env.RESEND_API_KEY);

function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET
    // 👆 no expiresIn => token never expires
  );
}



/* --------------------- PASSWORD FLOW (hybrid register/login) --------------------- */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      // 🚫 Do not allow password update
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid password" });

      return res.status(200).json({
        message: "User already exists (logged in)",
        user: { id: user._id, email: user.email },
        accessToken: generateAccessToken(user),
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, email: user.email },
      accessToken: generateAccessToken(user),
    });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ error: "Failed to create or fetch user" });
  }
});

/* --------------------------- PASSWORDLESS OTP FLOW --------------------------- */
// Request OTP
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    await Otp.deleteMany({ email }); // clear old codes
    await Otp.create({ email, otp, expiresAt });

    await resend.emails.send({
      from: "Som Das <noreply@somdas.xyz>", // verified domain
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    console.error("request-otp error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    // ✅ Allow special test user with fixed OTP "12345"
    if (email === "test@somdas.xyz" && otp === "12345") {
      let user = await User.findOne({ email });
      if (!user) user = await User.create({ email });

      const accessToken = generateAccessToken(user);
      return res.json({
        message: "Login successful (test user)",
        user: { id: user._id, email: user.email },
        accessToken,
      });
    }

    // 🔒 Normal OTP flow
    const rec = await Otp.findOne({ email, otp });
    if (!rec || rec.expiresAt < Date.now()) {
      return res.status(401).json({ error: "Invalid or expired OTP" });
    }

    await Otp.deleteOne({ _id: rec._id });

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    const accessToken = generateAccessToken(user);
    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
      accessToken,
    });
  } catch (err) {
    console.error("verify-otp error:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});




// ✅ Link assessee (PAN) to user
router.post("/link", async (req, res) => {
  try {
    const { userId, pan, name, password } = req.body;

    // 0. Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 1. find or create assessee
    let assessee = await Assessee.findOne({ pan });

    if (!assessee) {
      assessee = new Assessee({ pan, name, password, users: [userId] });
      await assessee.save();
    } else {
      // if exists, push userId if not already linked
      if (!assessee.users.includes(userId)) {
        assessee.users.push(userId);
        await assessee.save();
      }
    }

    // 2. link assessee to user
    if (!user.assessees.includes(assessee._id)) {
      user.assessees.push(assessee._id);
      await user.save();
    }

    res.status(200).json({
      message: "Assessee linked successfully",
      assessee
    });
  } catch (err) {
    console.error("Error linking assessee:", err);
    res.status(500).json({ error: "Failed to link assessee" });
  }
});




// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("assessees", "pan name");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Get single user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("assessees", "pan name");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});


router.use(authMiddleware );

// Use auth middleware earlier in the stack to set req.user
// e.g. router.use(authMiddleware);

// GET /calendar  -> events for all assessees of the authenticated user
router.get("/calendar", async (req, res) => {
  try {
    // user comes from auth middleware
    const userId = req.user && (req.user._id || req.user.id);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    // 1. Find user with their assessees
    const user = await User.findById(userId).populate("assessees", "pan name");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const assesseeIds = user.assessees.map(a => a._id);

    // First get proceedings linked to the user’s assessees
    const eProceedingIds = await EProceeding.find({ assesseeId: { $in: assesseeIds } })
      .distinct("_id");

    // 2. Fetch all events for these assessees
    const [notices, demands, itrs, audits /*, proceedings (unused)*/] = await Promise.all([
      Notice.find({ eProceedingId: { $in: eProceedingIds } })
        .populate({
          path: "eProceedingId",
          populate: { path: "assesseeId", select: "pan name" }
        }),
      Demand.find({ assessee: { $in: assesseeIds } }).populate("assessee", "pan name"),
      Itr.find({ assessee: { $in: assesseeIds } }).populate("assessee", "pan name"),
      Audit.find({ assessee: { $in: assesseeIds } }).populate("assessee", "pan name"),
      // EProceeding.find({ assesseeId: { $in: assesseeIds } }).populate("assesseeId", "pan name"),
    ]);

    const events = [];

    // 🔴 Notices
    notices.forEach((n) => {
      if (n.eProceedingId && n.eProceedingId.assesseeId) {
        events.push({
          title: `[${n.eProceedingId.assesseeId.pan}] Notice ${n.type || ""} (${n.us || "u/s"})`,
          start: n.noticeDate,
          color: "#ef4444",
          type: "notice",
          eventData: {
            pan: n.eProceedingId.assesseeId.pan,
            assesseeName: n.eProceedingId.assesseeId.name,
            noticeType: n.type,
            section: n.us,
            noticeNumber: n.noticeNumber,
            status: n.status,
            responseStatus: n.responseStatus
          }
        });

        if (n.dueDate) {
          events.push({
            title: `[${n.eProceedingId.assesseeId.pan}] Due for Notice ${n.noticeNumber}`,
            start: n.dueDate,
            color: "#dc2626",
            type: "notice_due",
            eventData: {
              pan: n.eProceedingId.assesseeId.pan,
              assesseeName: n.eProceedingId.assesseeId.name,
              noticeNumber: n.noticeNumber,
              originalNoticeDate: n.noticeDate
            }
          });
        }
      }
    });

    // 🟡 Demands
    demands.forEach((d) => {
      events.push({
        title: `[${d.assessee.pan}] Demand ${d.demandRefNo} (₹${d.total})`,
        start: d.dateOfDemand,
        color: "#f59e0b",
        type: "demand",
        eventData: {
          pan: d.assessee.pan,
          assesseeName: d.assessee.name,
          demandRefNo: d.demandRefNo,
          assessmentYear: d.assessmentYear,
          section: d.section,
          taxOrPenalty: d.taxOrPenalty,
          interestAmount: d.interestAmount,
          total: d.total
        }
      });
    });

    // 🟢 ITRs
    itrs.forEach((i) => {
      events.push({
        title: `[${i.assessee.pan}] ITR ${i.itrForm || ""} (${i.assessmentYear})`,
        start: i.filingDate,
        color: "#10b981",
        type: "itr",
        eventData: {
          pan: i.assessee.pan,
          assesseeName: i.assessee.name,
          assessmentYear: i.assessmentYear,
          itrForm: i.itrForm,
          currentStatus: i.currentStatus,
          returnProcessingStatus: i.returnProcessingStatus,
          ackNumber: i.ackNumber,
          filingSection: i.filingSection
        }
      });
    });

    // 🔵 Audits
    audits.forEach((a) => {
      events.push({
        title: `[${a.assessee.pan}] Audit ${a.auditSection || ""}`,
        start: a.filingDate,
        color: "#3b82f6",
        type: "audit",
        eventData: {
          pan: a.assessee.pan,
          assesseeName: a.assessee.name,
          assessmentYear: a.assessmentYear,
          returnForm: a.returnForm,
          auditSection: a.auditSection,
          auditStatus: a.auditStatus,
          auditForm: a.auditForm,
          acknowledgment: a.acknowledgment
        }
      });
    });

    return res.json(events);
  } catch (err) {
    console.error("Error fetching calendar:", err);
    return res.status(500).json({ error: "Failed to fetch calendar events" });
  }
});


// GET /calendar/pan/:pan  -> calendar for a specific PAN (or ALL) in the authenticated user's assessee list
router.get("/calendar/pan/:pan", async (req, res) => {
  try {
    // Expect auth middleware to populate req.user (with ._id or .id)
    const userId = req.user && (req.user._id || req.user.id);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const rawPan = req.params.pan;
    if (!rawPan) return res.status(400).json({ error: "PAN is required" });

    const panParam = String(rawPan).trim().toUpperCase();

    // 1. Find user with their assessees (we only need pan, name and _id)
    const user = await User.findById(userId).populate("assessees", "pan name");
    if (!user) return res.status(404).json({ error: "User not found" });

    // 2. Determine which assesseeIds to fetch for
    let assesseeIds = [];
    if (panParam === "ALL") {
      assesseeIds = user.assessees.map(a => a._id);
      if (assesseeIds.length === 0) {
        // No assessees for this user
        return res.json([]);
      }
    } else {
      const matched = user.assessees.find(a => (a.pan || "").toUpperCase() === panParam);
      if (!matched) {
        return res.status(404).json({ error: `PAN ${rawPan} not found in user's assessees` });
      }
      assesseeIds = [matched._id];
    }

    // 3. First get proceedings linked to these assessee(s)
    const eProceedingIds = await EProceeding.find({ assesseeId: { $in: assesseeIds } }).distinct("_id");

    // 4. Fetch events (notices, demands, itrs, audits) for these assessee(s)
    const [notices, demands, itrs, audits] = await Promise.all([
      Notice.find({ eProceedingId: { $in: eProceedingIds } })
        .populate({
          path: "eProceedingId",
          populate: { path: "assesseeId", select: "pan name" }
        }),
      Demand.find({ assessee: { $in: assesseeIds } }).populate("assessee", "pan name"),
      Itr.find({ assessee: { $in: assesseeIds } }).populate("assessee", "pan name"),
      Audit.find({ assessee: { $in: assesseeIds } }).populate("assessee", "pan name"),
    ]);

    const events = [];

    // 🔴 Notices
    notices.forEach((n) => {
      const proceeding = n.eProceedingId;
      const assessee = proceeding && proceeding.assesseeId ? proceeding.assesseeId : null;
      if (!assessee) return;

      events.push({
        title: `[${assessee.pan}] Notice ${n.type || ""} (${n.us || "u/s"})`,
        start: n.noticeDate,
        color: "#ef4444",
        type: "notice",
        eventData: {
          pan: assessee.pan,
          assesseeName: assessee.name,
          noticeType: n.type,
          section: n.us,
          noticeNumber: n.noticeNumber,
          status: n.status,
          responseStatus: n.responseStatus
        }
      });

      if (n.dueDate) {
        events.push({
          title: `[${assessee.pan}] Due for Notice ${n.noticeNumber}`,
          start: n.dueDate,
          color: "#dc2626",
          type: "notice_due",
          eventData: {
            pan: assessee.pan,
            assesseeName: assessee.name,
            noticeNumber: n.noticeNumber,
            originalNoticeDate: n.noticeDate
          }
        });
      }
    });

    // 🟡 Demands
    demands.forEach((d) => {
      if (!d.assessee) return;
      events.push({
        title: `[${d.assessee.pan}] Demand ${d.demandRefNo} (₹${d.total})`,
        start: d.dateOfDemand,
        color: "#f59e0b",
        type: "demand",
        eventData: {
          pan: d.assessee.pan,
          assesseeName: d.assessee.name,
          demandRefNo: d.demandRefNo,
          assessmentYear: d.assessmentYear,
          section: d.section,
          taxOrPenalty: d.taxOrPenalty,
          interestAmount: d.interestAmount,
          total: d.total
        }
      });
    });

    // 🟢 ITRs
    itrs.forEach((i) => {
      if (!i.assessee) return;
      events.push({
        title: `[${i.assessee.pan}] ITR ${i.itrForm || ""} (${i.assessmentYear})`,
        start: i.filingDate,
        color: "#10b981",
        type: "itr",
        eventData: {
          pan: i.assessee.pan,
          assesseeName: i.assessee.name,
          assessmentYear: i.assessmentYear,
          itrForm: i.itrForm,
          currentStatus: i.currentStatus,
          returnProcessingStatus: i.returnProcessingStatus,
          ackNumber: i.ackNumber,
          filingSection: i.filingSection
        }
      });
    });

    // 🔵 Audits
    audits.forEach((a) => {
      if (!a.assessee) return;
      events.push({
        title: `[${a.assessee.pan}] Audit ${a.auditSection || ""}`,
        start: a.filingDate,
        color: "#3b82f6",
        type: "audit",
        eventData: {
          pan: a.assessee.pan,
          assesseeName: a.assessee.name,
          assessmentYear: a.assessmentYear,
          returnForm: a.returnForm,
          auditSection: a.auditSection,
          auditStatus: a.auditStatus,
          auditForm: a.auditForm,
          acknowledgment: a.acknowledgment
        }
      });
    });

    return res.json(events);
  } catch (err) {
    console.error("Error fetching calendar by PAN:", err);
    return res.status(500).json({ error: "Failed to fetch calendar events for PAN" });
  }
});


// GET /notices/pan/:pan -> calendar notices for a specific PAN (or ALL) in the authenticated user's assessee list
router.get("/notices/pan/:pan", async (req, res) => {
  try {
    // Expect auth middleware to populate req.user (with ._id or .id)
    const userId = req.user && (req.user._id || req.user.id);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const rawPan = req.params.pan;
    if (!rawPan) return res.status(400).json({ error: "PAN parameter is required" });

    // 1. Find user & populate assessees (only pan and name needed)
    const user = await User.findById(userId).populate("assessees", "pan name");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Normalize pan param
    const panParam = String(rawPan).trim().toUpperCase();

    // Determine assesseeIds to search: either all user's assessees or the single matching PAN
    let assesseeIds = [];

    if (panParam === "ALL") {
      assesseeIds = user.assessees.map(a => a._id);
      if (assesseeIds.length === 0) {
        // No assessees for this user
        return res.json({ openNotices: [], closedNotices: [] });
      }
    } else {
      // Find matching assessee in user's assessees (case-insensitive)
      const matched = user.assessees.find(a => (a.pan || "").toUpperCase() === panParam);
      if (!matched) {
        return res.status(404).json({ error: `PAN ${rawPan} not found in user's assessees` });
      }
      assesseeIds = [matched._id];
    }

    // 2. Find eProceedings for these assessees and collect their IDs
    const eProceedings = await EProceeding.find({ assesseeId: { $in: assesseeIds } }).select("_id assesseeId type ay");
    const eProceedingIds = eProceedings.map(e => e._id);

    // 3. Find notices linked to these eProceedings and populate assessee info
    const notices = await Notice.find({ eProceedingId: { $in: eProceedingIds } })
      .populate({
        path: "eProceedingId",
        populate: { path: "assesseeId", model: "Assessee", select: "pan name" }
      });

    // 4. Separate notices into open & closed
    const openNotices = [];
    const closedNotices = [];

    notices.forEach(n => {
      const proceeding = n.eProceedingId;
      const assessee = proceeding && proceeding.assesseeId ? proceeding.assesseeId : null;

      // If for some reason assessee missing (defensive), skip
      if (!assessee) return;

      const baseMeta = {
        assessee: assessee.name,
        pan: assessee.pan,
        proceedingType: proceeding.type,
        assessmentYear: proceeding.ay,
        noticeNumber: n.noticeNumber,
        status: n.status,
        responseStatus: n.responseStatus
      };

      // ---- Notice Issued Event ----
      if (n.noticeDate) {
        const event = {
          title: `[${assessee.pan}] Notice Issued ${n.type || ""} ${n.us ? `(u/s ${n.us})` : ""}`,
          start: n.noticeDate,
          color: "#3b82f6",
          meta: baseMeta
        };
        (n.status === "Completed" || n.responseStatus === "Submitted")
          ? closedNotices.push(event)
          : openNotices.push(event);
      }

      // ---- Due Date Event ----
      if (n.dueDate) {
        const event = {
          title: `[${assessee.pan}] Notice Due ${n.type || ""}`,
          start: n.dueDate,
          color: "#ef4444",
          meta: baseMeta
        };
        (n.status === "Completed" || n.responseStatus === "Submitted")
          ? closedNotices.push(event)
          : openNotices.push(event);
      }

      // ---- Response Date Event ----
      if (n.responseDate) {
        const event = {
          title: `[${assessee.pan}] Response Filed ${n.type || ""}`,
          start: n.responseDate,
          color: "#22c55e",
          meta: baseMeta
        };
        closedNotices.push(event);
      }
    });

    // 5. Return only events related to the requested PAN(s)
    return res.json({ openNotices, closedNotices });
  } catch (err) {
    console.error("Error fetching calendar notices by PAN:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;