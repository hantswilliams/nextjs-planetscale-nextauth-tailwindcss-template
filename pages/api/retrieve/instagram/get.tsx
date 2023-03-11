import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/prismadb'
import { getSession } from 'next-auth/react';
import ig_me_media from './get_retrieve';
import {igUploadS3} from './get_save';

// testing - this hsould move to other file later 
import axios from 'axios';
import AWS from 'aws-sdk';
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  
  const s3 = new AWS.S3();
///////////

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({ req });
    console.log('FromAPIendpoint: ', session)

    if (!session) {
        res.status(401).json({ error: 'Not authenticated' })
        return
    }

    console.log('request body: ', req.body)

    const ig_userID = req.body.userId
    const ig_userToken = req.body.userToken

    console.log("received id and token: ", ig_userID, ig_userToken)


    /// Step 1 - Retrieve the data from Instagram
    const ig_media = await ig_me_media(ig_userToken, ig_userID);
    console.log('retrieved media: ', ig_media)

    // Step 2 - Save the data to S3 bucket and the database 
    ////TESTING 
    // get the first media item
    const first_media = ig_media[6];
    console.log('first media: ', first_media)
    const media_url = first_media.media_url;
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/images/upload-image-s3-url`, {
        method: 'POST',
        body: JSON.stringify({ url: media_url }),
        headers: { 'Content-Type': 'application/json' },
      });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data?.error || 'Failed to upload file');
    }
    console.log('data: ', data)

    ////END TESTING
    res.status(200).json({ ig_media })
    
}