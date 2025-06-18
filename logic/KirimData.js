const contract = require('../utils/contract');
const TransactionLog = require('../models/TransactionLog');

const kirimData = async (req, res) => {
  const { waterLevel, waktuUkur, status } = req.body;

  if (waterLevel === undefined || !waktuUkur || !status) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: waterLevel, waktuUkur, status'
    });
  }

  try {
    const tx = await contract.simpanData(waterLevel, waktuUkur, status);
    const receipt = await tx.wait();

    const newLog = new TransactionLog({
      water_level: waterLevel,
      waktu_ukur: waktuUkur,
      status,
      tx_hash: tx.hash,
      block_number: receipt.blockNumber
    });

    await newLog.save();

    return res.json({
      success: true,
      message: 'Data successfully sent to blockchain and saved to DB',
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
      mongoId: newLog._id
    });
  } catch (error) {
    console.error('Transaction Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process transaction',
      error: error.message
    });
  }
};

module.exports = kirimData;
