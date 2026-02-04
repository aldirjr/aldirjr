// api/petsitting/calendar.js
import { getCollection } from '../utils/mongodb.js';
import { requireAuth } from '../utils/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const calendar = await getCollection('pet_calendar');

  // GET - Fetch calendar availability (public)
  if (req.method === 'GET') {
    try {
      const { month, year } = req.query;
      
      let query = {};
      if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        query = {
          date: {
            $gte: startDate.toISOString().split('T')[0],
            $lte: endDate.toISOString().split('T')[0]
          }
        };
      }

      const availability = await calendar.find(query).toArray();
      return res.status(200).json(availability);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST/PUT - Update calendar (requires authentication)
  if (req.method === 'POST' || req.method === 'PUT') {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return res.status(401).json({ error: auth.error });
    }

    try {
      const { date, available, notes } = req.body;

      const result = await calendar.updateOne(
        { date },
        { 
          $set: { 
            date, 
            available, 
            notes: notes || '',
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );

      return res.status(200).json({ 
        success: true,
        message: 'Calendar updated successfully'
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
