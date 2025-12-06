import { Router } from 'express';
import Event from '../models/event.model';

const router = Router();

// Ingest event(s)
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const docs = Array.isArray(payload) ? payload : [payload];
    const created = await Event.insertMany(docs);
    res.status(201).json({ inserted: created.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to ingest events' });
  }
});

export default router;
