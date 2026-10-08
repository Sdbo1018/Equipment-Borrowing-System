const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Check server/.env');
  }
  const conn = await mongoose.connect(uri, { dbName: 'equipment_borrowing' });
  console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDB;