const mongoose = require('mongoose');

const bcrypt = require("bcrypt");



const otpSchema = new mongoose.Schema({
  email: { type: String, index: true, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Number, required: true },
});

const Otp = mongoose.model('Otp', otpSchema);


// User Schema

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    assessees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assessee" }],

    // ✅ NEW: last synced timestamp (null until first sync)
    lastSyncedOn: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

// 🔐 Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema);


//assese schema



const assesseeSchema = new mongoose.Schema({
  pan: { type: String, unique: true, required: true },
  name: { type: String },
  lastSyncedOn: { type: Date },
  password: { type: String },  // if you store IT portal password
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}); 


const Assessee = mongoose.model('Assessee', assesseeSchema);

//
// EProceeding Schema
//
const eProceedingSchema = new mongoose.Schema({
  id: { type: String, required: true }, 
  type: { type: String, required: true },
  ay: { type: Number, required: true },
  assesseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessee', required: true },
  name: { type: String, required: false },
  date: { type: Date, required: false },
});

const EProceeding = mongoose.model('EProceeding', eProceedingSchema);

//
// Notice Schema (linked to EProceeding)
//
const noticeSchema = new mongoose.Schema({
  eProceedingId: { type: mongoose.Schema.Types.ObjectId, ref: 'EProceeding', required: true },

  us: { type: String, required: false },             // u/s
  type: { type: String, required: false },
  noticeNumber: { type: String, required: false },
  noticeDate: { type: Date, required: false },
  dueDate: { type: Date, required: false },
  status: { type: String, required: false },
  responseStatus: { type: String, required: false },
  responseDate: { type: Date, required: false },

  noticeDocs: [{ type: String }],
  resDocs: [{ type: String }]
});


const Notice = mongoose.model('Notice', noticeSchema);


// demands

const demandSchema = new mongoose.Schema({
  assessmentYear: { type: String, required: true }, // A.Y
  section: { type: String, required: true },        // U/s
  demandRefNo: { type: String, required: true },    // Demand Reference No
  dateOfDemand: { type: Date, required: true },     // Date of Demand
  taxOrPenalty: { type: Number, required: true },   // Tax/Penalty
  interestAmount: { type: Number, required: true }, // Interest Amount
  total: { type: Number, required: true },          // Total
  responsePdf: { type: String, required: false },   // Response PDF (can be a URL or file path)
  assessee: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessee', required: true } // Reference to Assessee
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const Demand = mongoose.model('Demand', demandSchema);



//itr
const itrSchema = new mongoose.Schema({
  assessee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessee',
    required: true
  },
  assessmentYear: { type: String, required: true },              // A.Y
  itrForm: { type: String, required: false },                      // ITR FORM
  filingDate: { type: Date, required: false },                     // FILING DATE
  currentStatus: { type: String, required: false },               // Current Status
  returnProcessingStatus: { type: String, required: false },      // Return Processing Status
  itrAckPdfUrl: { type: String, required: false },                // ITR Ack PDF
  itrFormPdfUrl: { type: String, required: false },               // ITR Form PDF
  intimationPdfUrl: { type: String, required: false },            // Intimation PDF
  aisPdfUrl: { type: String, required: false },                   // AIS PDF
  form26asPdfUrl: { type: String, required: false },              // 26AS PDF
  link: { type: String, required: false },                        // Optional link to income tax portal
  ackNumber: { type: String, required: false },                   // Acknowledgement Number
  filingSection: { type: String, required: false },               // Filing Section
  createdAt: { type: Date, default: Date.now }
});

const Itr = mongoose.model('Itr', itrSchema);

/// ---------------------------------audit

const auditSchema = new mongoose.Schema({
  assessee: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessee', required: true },
  assessmentYear: { type: String, required: true },          // A.Y
  returnForm: { type: String },                              // Return Form
  auditSection: { type: String },                            // Audit Section
  auditStatus: { type: String },                             // Audit Status
  filingDate: { type: Date },                                // Filing Date
  auditForm: { type: String },                               // Audit Form
  acknowledgment: { type: String },                          // Acknowledgment
  link: { type: String },                                    // Link (could be URL)
}, {
  timestamps: true  // Adds createdAt and updatedAt
});

const Audit = mongoose.model('Audit', auditSchema);




//
// Export all models
//
module.exports = {
    User,
  Assessee,
  EProceeding,
  Notice,
  Demand,
  Itr,
  Audit,
  Otp
};
