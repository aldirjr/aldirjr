// api/utils/mongodb.js
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = 'juniors-world';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}

// Database Collections Structure:
// - users: { _id, email, password (hashed), role, createdAt }
// - travel_posts: { _id, title, slug, content (HTML), country, flag, date, images[], published, translations: {pt, fr, en} }
// - pet_calendar: { _id, date, available, notes }
// - pet_clients: { _id, petName, petImage, description, date }
// - resume: { _id, sections: {}, lastUpdated }
// - site_settings: { _id, key, value }
