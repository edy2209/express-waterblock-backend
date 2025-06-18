const TransactionLog = require('../models/TransactionLog');

const getLogs = async (req, res) => {
  try {
    const logs = await TransactionLog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch logs', error: error.message });
  }
};

module.exports = getLogs;
