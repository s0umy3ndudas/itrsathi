// routes/queue.routes.js
const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { User,Assessee } = require("../models/models"); // must export User (with assessees populated elsewhere)

/**
 * Factory to create queue router with a provided Redis client.
 * Mount at: app.use("/api/queue", createQueueRoutes(redis))
 * Key format: job:${userId}:${PAN}
 */
function createQueueRoutes(redis) {
  const router = express.Router();




// 🚨 Admin route: get ALL jobs across all users
router.get("/getAllQueues", async (req, res) => {
  try {
    const pattern = "job:*"; // match all jobs
    const keys = await redis.keys(pattern);
    const queue = [];

    for (const key of keys) {
      const job = await redis.hgetall(key);
      if (job && Object.keys(job).length > 0) {
        queue.push({ jobId: key, ...job });
      }
    }

    res.status(200).json({ total: queue.length, queue });
  } catch (error) {
    console.error("getAllQueues error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

  // 🔒 Protect ALL routes
  router.use(authMiddleware);

  // --- Helpers ---
  async function getAllowedPans(userId) {
    const user = await User.findById(userId).populate("assessees", "pan");
    if (!user) return new Set();
    return new Set(
      (user.assessees || [])
        .map(a => String(a.pan || "").trim().toUpperCase())
        .filter(Boolean)
    );
  }

  const keyFor = (userId, pan) => `job:${userId}:${String(pan).trim().toUpperCase()}`;

  // Clear entire queue (for this user only)
  router.post("/clear-queue", async (req, res) => {
    try {
      const userId = req.user.id;

      // Efficient SCAN by pattern instead of KEYS (safer in production)
      const pattern = `job:${userId}:*`;
      const toDelete = [];
      let cursor = "0";
      do {
        const [next, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
        cursor = next;
        if (keys && keys.length) toDelete.push(...keys);
      } while (cursor !== "0");

      if (!toDelete.length) {
        return res.status(200).json({ message: "Queue already empty for this user." });
      }

      await redis.del(...toDelete);
      res.status(200).json({
        message: `Cleared ${toDelete.length} jobs from your queue.`,
        deletedKeys: toDelete,
      });
    } catch (err) {
      console.error("clear-queue error:", err);
      res.status(500).json({ error: "Failed to clear queue" });
    }
  });

  // Bulk upload PAN/password pairs (only user’s assessees)
// Bulk upload PAN/password pairs (auto-link to user, then queue)
router.post("/upload-pan-json", async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const panList = req.body;

    if (!Array.isArray(panList)) {
      return res.status(400).json({ error: "Expected an array of { pan, password }" });
    }

    // 1) Normalize + dedupe input
    const incoming = [...new Map(
      panList
        .filter(e => e?.pan && e?.password)
        .map(e => [
          String(e.pan).trim().toUpperCase(),
          { pan: String(e.pan).trim().toUpperCase(), password: String(e.password).trim() }
        ])
    ).values()];

    if (incoming.length === 0) {
      return res.status(200).json({ message: "No valid entries", addedCount: 0, skippedCount: 0, added: [], skipped: [] });
    }

    // 2) Ensure user exists
    let user = await User.findById(userId);
    if (!user) {
      user = await User.create({ _id: userId, email: userEmail, assessees: [] });
    }

    const added = [];
    const skipped = [];
    let linkedCount = 0;

    for (const { pan, password } of incoming) {
      // 3) Find or create assessee + link to user
      let assessee = await Assessee.findOne({ pan });
      if (!assessee) {
        assessee = await Assessee.create({ pan, password, users: [userId] });
        linkedCount++;
      } else {
        // keep/refresh password if you want
        if (password && assessee.password !== password) {
          assessee.password = password;
        }
        if (!assessee.users.includes(userId)) {
          assessee.users.push(userId);
          linkedCount++;
        }
        await assessee.save();
      }

      await User.updateOne({ _id: userId }, { $addToSet: { assessees: assessee._id } });

      // 4) Queue under namespaced key
      const jobKey = `job:${userId}:${pan}`;
      const exists = await redis.exists(jobKey);

      if (!exists) {
        await redis.hset(jobKey, {
          pan,
          password,
          status: "in_queue",
          owner: userId,
          ownerEmail: userEmail,
        });
        added.push(pan);
        continue;
      }

      const status = await redis.hget(jobKey, "status");
      if (["in_queue", "processing", "retry"].includes(status)) {
        skipped.push(pan);
      } else if (status === "success" || status === "wrong_password") {
        await redis.hset(jobKey, {
          pan,
          password,
          status: "in_queue",
          owner: userId,
          ownerEmail: userEmail,
        });
        added.push(pan);
      } else {
        skipped.push(pan);
      }
    }

    return res.status(200).json({
      message: "PAN list processed successfully",
      linkedCount,
      addedCount: added.length,
      skippedCount: skipped.length,
      added,
      skipped,
    });
  } catch (error) {
    console.error("upload-pan-json error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add/queue single PAN with auto-linking
router.post("/addPan", async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const { pan, password, name } = req.body;

    if (!pan || !password) {
      return res.status(400).json({ error: "pan and password are required" });
    }

    const cleanPan = String(pan).trim().toUpperCase();
    const cleanPwd = String(password).trim();

    // 1) Ensure user exists
    let user = await User.findById(userId);
    if (!user) {
      user = await User.create({ _id: userId, email: userEmail, assessees: [] });
    }

    // 2) Find or create assessee by PAN
    //    - create with provided name/password if new
    let assessee = await Assessee.findOne({ pan: cleanPan });
    if (!assessee) {
      assessee = await Assessee.create({
        pan: cleanPan,
        name: name || undefined,          // optional
        password: cleanPwd,               // store/refresh the portal password
        users: [userId],
      });
    } else {
      // keep password up to date (optional: only if changed)
      if (cleanPwd && assessee.password !== cleanPwd) {
        assessee.password = cleanPwd;
      }
      // ensure linkage to this user
      if (!assessee.users.includes(userId)) {
        assessee.users.push(userId);
      }
      await assessee.save();
    }

    // 3) Ensure user has this assessee linked (both sides)
    await User.updateOne(
      { _id: userId },
      { $addToSet: { assessees: assessee._id } }
    );

    await Assessee.updateOne(
      { _id: assessee._id },
      { $addToSet: { users: userId } }
    );

    // 4) Enqueue job for this user + PAN
    const jobKey = keyFor(userId, cleanPan); // job:${userId}:${PAN}
    const exists = await redis.exists(jobKey);

    if (!exists) {
      await redis.hset(jobKey, {
        pan: cleanPan,
        password: cleanPwd,
        status: "in_queue",
        owner: userId,
        ownerEmail: userEmail,
      });
      return res.status(200).json({
        message: "New PAN linked and added to queue",
        linked: true,
        queued: true,
      });
    }

    const status = await redis.hget(jobKey, "status");
    if (["in_queue", "processing", "retry"].includes(status)) {
      return res.status(200).json({
        message: `PAN exists with status "${status}", skipped`,
        linked: true,
        queued: false,
        skipped: true,
      });
    }

    if (status === "success" || status === "wrong_password") {
      await redis.hset(jobKey, {
        pan: cleanPan,
        password: cleanPwd,
        status: "in_queue",
        owner: userId,
        ownerEmail: userEmail,
      });
      return res.status(200).json({
        message: 'PAN re-queued with status "in_queue"',
        linked: true,
        queued: true,
      });
    }

    return res.status(200).json({
      message: `PAN exists with unknown status "${status}", skipped`,
      linked: true,
      queued: false,
      skipped: true,
    });
  } catch (error) {
    console.error("addPan error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

  // Delete job by PAN
  router.post("/terminatePan", async (req, res) => {
    try {
      const userId = req.user.id;
      const { pan } = req.body;
      if (!pan) return res.status(400).json({ success: false, message: "pan is required" });

      const cleanPan = String(pan).trim().toUpperCase();
      const allowed = await getAllowedPans(userId);
      if (!allowed.has(cleanPan)) {
        return res.status(403).json({ success: false, message: "PAN not allowed for this user" });
      }

      const jobKey = keyFor(userId, cleanPan);
      const exists = await redis.exists(jobKey);
      if (!exists) return res.status(404).json({ success: false, message: "Job not found" });

      await redis.del(jobKey);
      res.json({ success: true, message: "Job deleted successfully", pan: cleanPan });
    } catch (error) {
      console.error("terminatePan error:", error);
      res.status(500).json({ success: false, message: "Error deleting job", error: error.message });
    }
  });

  // Put job back to queue
  router.post("/addBacktoQueue", async (req, res) => {
    try {
      const userId = req.user.id;
      const userEmail = req.user.email;
      const { pan } = req.body;
      if (!pan) return res.status(400).json({ success: false, message: "pan is required" });

      const cleanPan = String(pan).trim().toUpperCase();
      const allowed = await getAllowedPans(userId);
      if (!allowed.has(cleanPan)) {
        return res.status(403).json({ success: false, message: "PAN not allowed for this user" });
      }

      const jobKey = keyFor(userId, cleanPan);
      const exists = await redis.exists(jobKey);
      if (!exists) return res.status(404).json({ success: false, message: "Job not found" });

      await redis.hset(jobKey, { status: "in_queue", owner: userId, ownerEmail: userEmail });
      res.json({ success: true, message: "Job added back to queue successfully", pan: cleanPan, status: "in_queue" });
    } catch (error) {
      console.error("addBacktoQueue error:", error);
      res.status(500).json({ success: false, message: "Error updating job status", error: error.message });
    }
  });

  // Get current queue snapshot (only this user’s jobs)
// GET /getQueue  — Upstash version
 router.get("/getQueue", async (req, res) => {
  try {
    const userId = req.user.id;
    const allowed = await getAllowedPans(userId);
    if (allowed.size === 0) return res.status(200).json({ total: 0, queue: [] });

    const pattern = `job:${userId}:*`;
    const keys = await redis.keys(pattern);
    const queue = [];

    for (const key of keys) {
      const job = await redis.hgetall(key);
      if (job && Object.keys(job).length > 0) {
        queue.push({ jobId: key, ...job });
      }
    }

    res.status(200).json({ total: queue.length, queue });
  } catch (error) {
    console.error("getQueue error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





  return router;
}






module.exports = createQueueRoutes;