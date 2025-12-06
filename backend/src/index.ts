import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/wbd';

mongoose.connect(MONGO).then(() => {
  console.log('Mongo connected');
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => {
  console.error('Mongo connection error', err);
  process.exit(1);
});
