require('dotenv').config();
const mongoose = require('mongoose');
const Plan = require('./server/models/Plan');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    await Plan.deleteMany({});
    await Plan.insertMany([
      { name: '1 Hour', price: 10, durationMinutes: 60 },
      { name: '2 Hours', price: 18, durationMinutes: 120 },
      { name: '5 Hours', price: 40, durationMinutes: 300 },
      { name: '1 Day', price: 70, durationMinutes: 1440 },
      { name: '30 Days', price: 499, durationMinutes: 43200 }
    ]);
    console.log('Plans seeded');
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
})();