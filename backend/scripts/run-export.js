// run-export.js - run in Node env with MONGO_URI in env
const mongoose = require('mongoose');
const { exportDailyAnalytics } = require('../dist/services/exportJob');

async function run(){
  const MONGO = process.env.MONGO_URI;
  if(!MONGO) { console.error('Set MONGO_URI'); process.exit(1); }
  await mongoose.connect(MONGO);
  try {
    const file = await exportDailyAnalytics();
    console.log('Export written to', file);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
}
run();
