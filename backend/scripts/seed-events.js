#!/usr/bin/env node
// quick seeder (Node, no TS)
const mongoose = require('mongoose');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('count', { alias: 'c', type: 'number', default: 10000 })
  .option('mongo', { alias: 'm', type: 'string', default: process.env.MONGO_URI })
  .argv;

if(!argv.mongo) {
  console.error('Provide --mongo MONGO_URI or set MONGO_URI env var');
  process.exit(1);
}

const EventSchema = new mongoose.Schema({
  userId: String, eventType: String, metadata: mongoose.Schema.Types.Mixed, timestamp: Date
});
const UserSchema = new mongoose.Schema({ userId: String, profile: Object, createdAt: Date });

const Event = mongoose.model('Event', EventSchema);
const User = mongoose.model('User', UserSchema);

async function run(){
  await mongoose.connect(argv.mongo, { useNewUrlParser: true, useUnifiedTopology: true });

  const usersCount = Math.max(5000, Math.floor(argv.count / 10));
  const users = [];
  for(let i=0;i<usersCount;i++){
    users.push({ userId: 'user-' + i, profile: { name: 'User ' + i, email: `u${i}@test.com` }, createdAt: new Date() });
  }
  await User.insertMany(users).catch(()=>{});

  const eventTypes = ['SESSION_START','PAGE_VIEW','ITEM_VIEW','PURCHASE','SESSION_END'];
  const pages = ['home','listing','product','cart','checkout'];

  const batchSize = 1000;
  let inserted = 0;
  for(let i=0;i<Math.ceil(argv.count / batchSize); i++){
    const batch = [];
    for(let j=0;j<batchSize && inserted < argv.count; j++){
      const uid = 'user-' + Math.floor(Math.random()*usersCount);
      const et = eventTypes[Math.floor(Math.random()*eventTypes.length)];
      const meta = {};
      if(et === 'PAGE_VIEW') meta.pageId = pages[Math.floor(Math.random()*pages.length)];
      if(et === 'ITEM_VIEW' || et === 'PURCHASE') meta.itemId = 'item-' + Math.floor(Math.random()*1000);
      meta.timeSpent = Math.floor(Math.random()*300);
      batch.push({ userId: uid, eventType: et, metadata: meta, timestamp: new Date(Date.now() - Math.floor(Math.random()*7*24*3600*1000)) });
      inserted++;
    }
    await Event.insertMany(batch).catch(err=>console.error('insert err', err));
    process.stdout.write(`Inserted ${Math.min(inserted, argv.count)}/${argv.count}\r`);
  }
  console.log('\nDone');
  process.exit(0);
}
run();
