import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../lib/prismadb'
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession({ req });
    console.log('FromAPIendpoint: ', session)

    if (!session) {
        res.status(401).json({ error: 'Not authenticated' })
        return
    }

    try {
        const media = await client.$transaction ([
            client.media.create({
                //@ts-expect-error
                data: {
                    userId: session?.user?.id,
                    media_uid: req.body.media_uid,
                    media_type: req.body.media_type,
                    origin: req.body.origin,
                    medial_url: req.body.medial_url,
                    s3bucket_key: req.body.s3bucket_key,
                    permalink: req.body.permalink,
                    title: req.body.title,
                    content: req.body.content,
                    timestampMedia: req.body.timestampMedia,
                },
            })
        ])
        res.status(200).json(media)
    } catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }
    
}

