const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const kirimData = require('../logic/KirimData');
const getLogs = require('../logic/getLogs');
const getLogByHash = require('../logic/getlogshash');
const contract = require('../utils/contract');

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*', // atau sesuaikan
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection (once per cold start)
let isConnected = false;
async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('✅ MongoDB Connected');
  }
}

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const status = ['disconnected', 'connected', 'connecting', 'disconnecting'];

    const healthData = {
      status: 'OK',
      database: status[dbStatus],
      timestamp: new Date().toISOString(),
    };

    if (contract && contract.provider) {
      healthData.network = await contract.provider.getNetwork();
      healthData.contract = contract.address;
    } else {
      healthData.network = 'Contract not initialized';
    }

    res.json(healthData);
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message });
  }
});

app.post('/api/kirim-data', kirimData);
app.get('/api/logs', getLogs);
app.get('/api/logs/:txHash', getLogByHash);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

module.exports = serverless(app); // Export untuk Vercel

// Tambahan untuk bisa jalan lokal juga
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at http://localhost:${PORT}`);
  });
}
