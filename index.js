require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const kirimData = require('./logic/KirimData');
const getLogs = require('./logic/getLogs');
const getLogByHash = require('./logic/getlogshash');
const contract = require('./utils/contract');

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection
const MONGODB_URI = process.env.MONGO_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB Error:', err.message);
  process.exit(1);
});

// Health Check endpoint
app.get('/health', async (req, res) => {
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
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

// POST /kirim-data
app.post('/kirim-data', kirimData);

// GET /data-log
app.get('/logs', getLogs);

// GET /logs/:txHash
app.get('/logs/:txHash', getLogByHash);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Graceful Shutdown
const shutdown = async () => {
  console.log('🛑 Shutting down...');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } catch (err) {
    console.error('Shutdown error:', err);
    process.exit(1);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
