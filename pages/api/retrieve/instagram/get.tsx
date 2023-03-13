import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import ig_me_media from './get_retrieve';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //// EXPERIMETNAL: THIS PART IS EXPERIMENTAL UP UNTIL res.flushHeaders() /
    // res.setHeader('Content-Type', 'text/event-stream')
    // res.setHeader('Cache-Control', 'no-cache')
    // res.setHeader('Connection', 'keep-alive')
    // res.flushHeaders()

    const session = await getSession({ req });
    console.log('FromAPIendpoint: ', session)

    if (!session) {
        res.status(401).json({ error: 'Not authenticated' })
        return
    }

    console.log('request body: ', req.body)

    const ig_userID = req.body.iguserId
    const ig_userToken = req.body.iguserToken
    const currentuserId = req.body.currentuserid

    console.log("from IG GET API: received IG id, IG token, and userID: ", ig_userID, ig_userToken, currentuserId)

    /// Step 1 - Retrieve the data from Instagram
    var ig_media = await ig_me_media(ig_userToken, ig_userID);
    console.log('retrieved media: ', ig_media)

    /// For testing purpsoses, just keep the first 5 items
    ig_media = ig_media.slice(0, 5);

    /// Step 2 - Loop through the data and save each item to S3 bucket and the database
    for (let i = 0; i < ig_media.length; i++) {

        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/images/upload-image-s3-from-instagram`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: currentuserId,
                ig_url: ig_media[i].media_url,
                ig_caption: ig_media[i].caption,
                ig_mediatype: ig_media[i].media_type,
                ig_timestamp: ig_media[i].timestamp,
                ig_permalink: ig_media[i].permalink,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.error || 'Failed to upload file');
        }
        console.log('finished with: ', ig_media[i].media_url)

        // EXPERIMETNAL: this part here is also experimental
        console.log(`${i + 1}/${ig_media.length}\n\n`)

    }
    
    res.status(200).json({ ig_media })

    // EXPERIMETNAL: this part here is also experimental 
    // res.end(200).json({ ig_media })

}



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//     const session = await getSession({ req });
//     console.log('FromAPIendpoint: ', session)

//     if (!session) {
//         res.status(401).json({ error: 'Not authenticated' })
//         return
//     }

//     console.log('request body: ', req.body)

//     const ig_userID = req.body.iguserId
//     const ig_userToken = req.body.iguserToken
//     const currentuserId = req.body.currentuserid

//     console.log("from IG GET API: received IG id, IG token, and userID: ", ig_userID, ig_userToken, currentuserId)

//     /// Step 1 - Retrieve the data from Instagram
//     var ig_media = await ig_me_media(ig_userToken, ig_userID);
//     console.log('retrieved media: ', ig_media)

//     /// For testing purpsoses, just keep the first 5 items
//     ig_media = ig_media.slice(0, 5);

//     /// Step 2 - Loop through the data and save each item to S3 bucket and the database
//     for (let i = 0; i < ig_media.length; i++) {

//         console.log(`${i + 1}/${ig_media.length}\n\n`)

//         const response = await fetch(`${process.env.NEXTAUTH_URL}/api/images/upload-image-s3-from-instagram`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 user_id: currentuserId,
//                 ig_url: ig_media[i].media_url,
//                 ig_caption: ig_media[i].caption,
//                 ig_mediatype: ig_media[i].media_type,
//                 ig_timestamp: ig_media[i].timestamp,
//                 ig_permalink: ig_media[i].permalink,
//             }),
//             headers: { 'Content-Type': 'application/json' },
//         })
//         const data = await response.json();
//         if (!response.ok) {
//             throw new Error(data?.error || 'Failed to upload file');
//         }
//         console.log('finished with: ', ig_media[i].media_url)

//     }
    
//     res.status(200).json({ ig_media })

// }
