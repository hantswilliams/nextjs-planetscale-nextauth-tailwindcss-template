


import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

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
      redirect_uri: 'https://socialcomprehend.com/api/connect/instagram/',
      code,
    }),
  });

  // Parse the response JSON and store the access token in the user's session or database
  const data = await response.json();
  const accessToken = data.access_token;

  // Return a response to the client
  res.status(200).json({ access_token: accessToken });
  
}
