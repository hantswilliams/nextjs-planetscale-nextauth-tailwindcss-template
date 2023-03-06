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

    console.log('request body: ', req.body)

    try {
        const media = await client.$transaction ([
            client.cognition.create({
                data: {
                    model: 'amazon',
                    modelsubtype: 'rekognition',
                    output: req.body?.cognitionResults?.raw,
                    outputcleaned: req.body?.cognitionResults?.analytics,
                    mediaId: req.body?.uuid
                },
            })
        ])
        res.status(200).json(media)
    } catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }

}