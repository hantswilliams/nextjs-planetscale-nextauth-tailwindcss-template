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

    console.log('request body image uuid: ', req?.body?.image_uid)

    try {
        const mediaUpdate = await client.$transaction ([
            client.media.update({
                where: {
                    media_uid: req?.body?.image_uid
                },
                data: {
                    viewable: false
                },
            }),
        ])
        res.status(200).json(mediaUpdate)
    } catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }

}


