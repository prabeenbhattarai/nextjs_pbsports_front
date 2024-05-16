// pages/api/search.js

import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Pbsports'); // Replace 'yourDatabaseName' with your actual database name

    // Assuming you have a collection named 'yourCollectionName'
    const collection = db.collection('test');
    
    const results = await collection.find({ name: { $regex: query, $options: 'i' } }).toArray();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
