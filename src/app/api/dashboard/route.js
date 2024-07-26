
import pool from '../../../lib/db';

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    const { rows } = await pool.query('SELECT pending_requests, approved_requests, rejected_requests FROM dashboard WHERE user_id = $1', [userId]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Dashboard data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
