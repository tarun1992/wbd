import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  profile: {
    name: String,
    email: String,
    country: String
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
