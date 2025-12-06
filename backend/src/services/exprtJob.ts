import Event from '../models/event.model';
import fs from 'fs';
import path from 'path';

export async function exportDailyAnalytics() {
  const since = new Date(Date.now() - 24 * 3600 * 1000);
  const agg = await Event.aggregate([
    { $match: { timestamp: { $gte: since } } },
    { $group: { _id: '$userId', events: { $sum: 1 } } }
  ]);
  const outDir = path.resolve(__dirname, '../../exports');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const filePath = path.join(outDir, `export-${new Date().toISOString().slice(0,10)}.json`);
  fs.writeFileSync(filePath, JSON.stringify(agg, null, 2));
  return filePath;
}
