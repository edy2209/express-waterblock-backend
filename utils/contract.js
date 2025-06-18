const { ethers } = require('ethers');
const abi = require('../abicode/waterabi.json');

const provider = new ethers.JsonRpcProvider(process.env.INFURA_API);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

module.exports = contract;
