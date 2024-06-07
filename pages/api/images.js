import axios from 'axios';

const bucketName = 'pbsports';
const pub = 'pub-286a1a3ce1784237a33c76a3f5cf95d3';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com/${bucketName}?prefix=banner/`, {
      headers: {
        'Authorization': `AWS ${process.env.S3_ACCESS_KEY}:${process.env.S3_SECRET_ACCESS_KEY}`,
      },
    });

    // Parse the XML response to extract the image URLs
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "text/xml");
    const keys = xmlDoc.getElementsByTagName("Key");
    const imageUrls = Array.from(keys).map(key => ({
      url: `https://${pub}.r2.dev/${key.textContent}`
    }));

    res.status(200).json(imageUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching images' });
  }
}
