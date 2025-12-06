import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

beforeAll(async ()=>{
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/wbd-test');
});

afterAll(async ()=> {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

test('POST /api/events should accept an event', async ()=>{
  const res = await request(app).post('/api/events').send({
    userId: 't-test',
    eventType: 'PAGE_VIEW',
    metadata: { pageId: 'home' }
  });
  expect(res.status).toBe(201);
  expect(res.body.inserted).toBeGreaterThanOrEqual(1);
});

test('GET /api/users/:id/journey returns events', async ()=>{
  await request(app).post('/api/events').send({ userId: 't-journey', eventType: 'PAGE_VIEW', metadata: {pageId:'home'} });
  const res = await request(app).get('/api/users/t-journey/journey');
  expect(res.status).toBe(200);
  expect(res.body.events).toBeDefined();
});
