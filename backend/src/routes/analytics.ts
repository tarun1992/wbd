import { Router } from 'express';
import Event from '../models/event.model';

const router = Router();

router.get('/top-pages', async (req, res) => {
  const agg = await Event.aggregate([
    { $match: { eventType: 'PAGE_VIEW' } },
    { $group: { _id: '$metadata.pageId', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  res.json(agg);
});

router.get('/top-users', async (req, res) => {
  const agg = await Event.aggregate([
    { $group: { _id: '$userId', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
  res.json(agg);
});

export default router;
