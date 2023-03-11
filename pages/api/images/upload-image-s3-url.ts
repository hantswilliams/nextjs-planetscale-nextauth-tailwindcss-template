import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  const {url} = req.body;
  console.log('url received by the API: ', url)
  
  const imagedata = await axios.get(url, { responseType: 'arraybuffer' });
  
  // Save file to S3 bucket
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}.jpg`, // replace with appropriate file extension
    Body: imagedata.data,
    ContentType: imagedata.headers['content-type'],
  //   ACL: 'public-read', // or 'private' depending on your requirements
  };
  
  try {
  //@ts-expect-error
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully to ${data.Location}`);
    return res.status(200).json({ dataUrlS3: data.Location });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }


}
