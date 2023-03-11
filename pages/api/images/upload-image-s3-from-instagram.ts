import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import AWS from 'aws-sdk';
import client from '../../../lib/prismadb'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3_instagram = new AWS.S3();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  const {
    user_id, 
    ig_url, 
    ig_caption,
    ig_mediatype,
    ig_timestamp,
    ig_permalink,
  } = req.body;

  console.log('user_id received by the API: ', user_id)
  console.log('url received by the API: ', ig_url)
  console.log('caption received by the API: ', ig_caption)
  console.log('mediatype received by the API: ', ig_mediatype)
  console.log('timestamp received by the API: ', ig_timestamp)
  console.log('permalink received by the API: ', ig_permalink)

  const imagedata = await axios.get(ig_url, { responseType: 'arraybuffer' });
  
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
    const data = await s3_instagram.upload(params).promise();
    console.log(`File uploaded successfully to ${data.Location}`);

    // create a unique id for the image (UUID v4)
    const uuid = () => {
      let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid;
    }
    const media_uid_frontend = uuid();
    
    // save the image metadata to the database
    try {
      const media = await client.$transaction ([
          client.media.create({
              data: {
                  userId: user_id,
                  media_uid: media_uid_frontend,
                  media_type: ig_mediatype.toLowerCase(),
                  origin: 'instagram',
                  medial_url: data.Location,
                  permalink: ig_permalink,
                  content: ig_caption,
                  timestampMedia: new Date(ig_timestamp),
              },
          })
      ])
      res.status(200).json(media)
      } catch (error) {
          res.status(400).json({ error })
          console.log(error)
      }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }


}
