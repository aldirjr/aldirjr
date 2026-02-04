import clientPromise from "../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("juniors_world"); // Your database name

    // Pulling the list of countries from your collection
    const locations = await db.collection("locations")
      .find({})
      .toArray();

    res.status(200).json(locations);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}