import { Router } from 'express';
import User from '../models/user.model';
import Event from '../models/event.model';

const router = Router();

// Create or upsert user
router.post('/', async (req, res) => {
  try {
    const { userId, profile } = req.body;
    const u = await User.findOneAndUpdate({ userId }, { profile }, { upsert: true, new: true });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: 'user error' });
  }
});

// Get user journey
router.get('/:userId/journey', async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({ userId }).sort({ timestamp: 1 }).lean();
    res.json({ userId, events });
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch journey' });
  }
});

export default router;
