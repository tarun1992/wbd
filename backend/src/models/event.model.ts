import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  eventType: { type: String, required: true },
  metadata: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now, index: true }
});

EventSchema.index({ userId: 1, timestamp: -1, eventType: 1 });

export default mongoose.model('Event', EventSchema);
