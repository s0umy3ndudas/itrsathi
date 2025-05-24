// models/EProceeding.js
const mongoose = require('mongoose');

const eProceedingSchema = new mongoose.Schema({
  type: { type: String, required: true },
  ay: { type: Number, required: true },
  assesseeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessee', required: true },
});

const EProceeding = mongoose.model('EProceeding', eProceedingSchema);

module.exports = EProceeding;
