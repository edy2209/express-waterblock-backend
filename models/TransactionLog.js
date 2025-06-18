const mongoose = require('mongoose');

const TransactionLogSchema = new mongoose.Schema({
  water_level: {
    type: Number,
    required: true
  },
  waktu_ukur: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  tx_hash: {
    type: String,
    required: true,
    unique: true
  },
  block_number: {
    type: Number,
    required: true
  }
}, {
  timestamps: true // untuk createdAt dan updatedAt otomatis
});

module.exports = mongoose.model('TransactionLog', TransactionLogSchema);
