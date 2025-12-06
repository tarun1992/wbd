import { exportDailyAnalytics } from '../services/exportJob';

export const handler = async () => {
  try {
    const file = await exportDailyAnalytics();
    return { statusCode: 200, body: `Exported to ${file}` };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Export failed' };
  }
};
