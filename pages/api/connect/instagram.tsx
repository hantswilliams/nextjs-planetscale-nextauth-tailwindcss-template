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

  const session_user_id = session?.user?.id

  const { code } = req.query;
  console.log('code: ', code);
  console.log('client ids and secrets: ', process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID, process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET)

  try {

    // Construct the request body as a FormData object
    const body = new FormData();
    
    if (typeof process.env.INSTAGRAM_CLIENT_ID === 'string') { // Type guard to check if the code variable is defined
      body.append('code', process.env.INSTAGRAM_CLIENT_ID);
    }
    
    if (typeof process.env.INSTAGRAM_CLIENT_SECRET === 'string') { // Type guard to check if the code variable is defined
      body.append('code', process.env.INSTAGRAM_CLIENT_SECRET);
    }
    
    body.append('grant_type', 'authorization_code');
    body.append('redirect_uri', 'https://socialcomprehend.appliedhealthinformatics.com/api/connect/instagram');
    
    if (typeof code === 'string') { // Type guard to check if the code variable is defined
      body.append('code', code);
    }
    
    // Make a request to exchange the authorization code for an access token
    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body,
    });

    const data = await response.json();
    console.log('instagram data callback: ', data)

    // Check if the response was successful
    if (!response.ok) {
      console.log(response.status)
      throw new Error(`Failed to exchange Instagram authorization code. Status: ${response.status}`);
    }

    // Parse the response JSON and store the access token in the user's session or database
    // token
    const instagram_accessToken = data?.access_token;
    const instagram_oauth_user_id = data?.user_id;

    // see if user already has an instagram account connected
    const user_instagram = await await client.$transaction ([
      client.instagram.findUnique({
        where: {
          //@ts-expect-error
          userId: session_user_id
        }
      })
    ])

    //@ts-expect-error
    if (user_instagram?.instagram_user_id) {
      // update the instagram access token
      await client.instagram.update({
        where: {
          //@ts-expect-error
          userId: session_user_id
        },
        data: {
          igtoken: instagram_accessToken
        }
      })
    } else {
      // add the instagram access token
      await client.instagram.update({
        where: {
          //@ts-expect-error
          userId: session_user_id
        },
        data: {
          igtoken: instagram_accessToken,
          igoauthid: instagram_oauth_user_id
        }
      })
    }


    // Return a success response to the client with the access token
    res.status(200).json({ message: 'user IG info added succesfully to DB', instagram_access_token: instagram_accessToken, instagram_user_id: instagram_oauth_user_id, user: session.user });
  } catch (error) {
    console.error('Error while exchanging Instagram authorization code:', error);
    // Return an error response to the client
    res.status(500).json({ error: 'Failed to exchange Instagram authorization code. Please try again later.' });
  }
}
