import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import client from '../../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getSession({ req });

  if (!session) {
      res.status(401).json({ error: 'Not authenticated' })
      return
  }

  const session_user_id = session?.user?.id
  const { code } = req.query;

  try {
    // Construct the request body as a FormData object
    const body = new FormData();
        
    body.append('grant_type', 'authorization_code');
    body.append('client_id', process.env.INSTAGRAM_CLIENT_ID?.toString() ?? '');
    body.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET?.toString() ?? '');
    body.append('redirect_uri', process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI?.toString() ?? '');    
    body.append('code', code?.toString() ?? '');

    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body,
    });

    const data = await response.json();
    const instagram_accessToken = data?.access_token;
    const instagram_oauth_user_id = data?.user_id.toString();
    console.log('instagram data callback: ', data)

    // Check if the response was successful
    if (!response.ok) {
      console.log(response.status)
      throw new Error(`Failed to exchange Instagram authorization code. Status: ${response.status}`);
    }

    // if so, then exchange for a long-lived access token
    const response2 = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${instagram_accessToken}`);
    const data2 = await response2.json();
    const instagram_longLivedAccessToken = data2?.access_token;
    console.log('instagram data2 callback: ', data2)

    // then also capture the user's IG basic id and handle
    const response3 = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${instagram_longLivedAccessToken}`);
    const data3 = await response3.json();
    console.log('instagram data3 callback: ', data3)
    const instagram_username = data3?.username;
    const instagram_user_id = data3?.id;
    const instagram_media_count = data3?.media_count;
    const instagram_account_type = data3?.account_type;
    

    try {
      await client.$transaction ([
          client.instagram.create({
            //@ts-expect-error
            data: {
              igtoken: instagram_longLivedAccessToken,
              igoauthid: instagram_oauth_user_id,
              igusername: instagram_username,
              iguserid: instagram_user_id,
              igmediacount: instagram_media_count,
              igaccounttype: instagram_account_type,
              userId: session_user_id,
              tokencreated: new Date()
            }
          })
        ])
    } catch (error) {
      console.log('error: ', error)
    }

    // Return a success response to the client with the access token
    // res.status(200).json({ message: 'user IG info added succesfully to DB', instagram_access_token: instagram_accessToken, instagram_user_id: instagram_oauth_user_id, user: session?.user });
  
    // Redirect the user to the home page
    res.redirect('/settings');

  } catch (error) {
    console.error('Error while exchanging Instagram authorization code:', error);
    res.status(500).json({ error: 'You big dog. Something went wrong.' });
  }
}
