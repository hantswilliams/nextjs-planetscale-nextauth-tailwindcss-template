import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import client from '../../../lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });
  console.log('FromAPIendpoint: ', session)

  if (!session) {
      res.status(401).json({ error: 'Not authenticated' })
      return
  }

  try {
    const { code } = req.query;
    console.log('code: ', code);

    // Make a request to exchange the authorization code for an access token
    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'https://socialcomprehend.appliedhealthinformatics.com/api/connect/instagram',
        code: code,
      }),
    });

    // // Check if the response was successful
    // if (!response.ok) {
    //   throw new Error(`Failed to exchange Instagram authorization code. Status: ${response.status}`);
    // }

    // Parse the response JSON and store the access token in the user's session or database
    const data = await response.json();
    console.log('instagram data callback: ', data)
    const accessToken = data?.access_token;

    // Return a success response to the client with the access token
    res.status(200).json({ access_token: accessToken });
  } catch (error) {
    console.error('Error while exchanging Instagram authorization code:', error);

    // Return an error response to the client
    res.status(500).json({ error: 'Failed to exchange Instagram authorization code. Please try again later.' });
  }
}
