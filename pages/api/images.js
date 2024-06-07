// pages/api/images.js
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const bucketName = "pbsports";
const pbsports = new S3Client({
  endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: "auto",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: "banner/",
    });
    const data = await pbsports.send(command);
    const images = data.Contents.map((item) => ({
      url: `https://${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${item.Key}`,
      key: item.Key,
    }));
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
