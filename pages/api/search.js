import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    await client.connect();
    const database = client.db('Pbsports);
    const collection = database.collection('test');

    const results = await collection
      .find({ $text: { $search: query } })
      .limit(10)
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
