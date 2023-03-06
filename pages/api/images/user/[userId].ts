import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { userId } = req.query

    if (!userId) {
        res.status(401).json({ error: 'Please provide a userId' })
        return
    }
 
    try {
        const media = await client.$transaction ([
            client.media.findMany({
                where: {
                    //@ts-expect-error
                    userId: userId,
                },
            })
        ])
        // convert media to JSON
        const mediaJson = JSON.stringify(media)
        res.status(200).json(mediaJson)
    }
    catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }
}
