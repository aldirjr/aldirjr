import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    
    // The "Ping" command is the simplest way to test a connection
    const db = client.db("admin");
    await db.command({ ping: 1 });

    res.status(200).json({ 
      status: "Success!", 
      message: "Vercel successfully shook hands with MongoDB Atlas.",
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ 
      status: "Error", 
      message: "Connection failed. Check your MONGODB_URI in Vercel settings.",
      error: e.message 
    });
  }
}