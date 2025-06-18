const TransactionLog = require('../models/TransactionLog');

const getLogByHash = async (req, res) => {
  try {
    const { txHash } = req.params;
    const log = await TransactionLog.findOne({ tx_hash: txHash });
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }
    res.json({ success: true, data: log });
  } catch (error) {
    console.error('Error fetching log by txHash:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch log', error: error.message });
  }
};

module.exports = getLogByHash;
