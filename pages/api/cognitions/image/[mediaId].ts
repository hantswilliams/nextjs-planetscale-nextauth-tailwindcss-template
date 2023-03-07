import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/prismadb'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { mediaId } = req.query

    if (!mediaId) {
        res.status(401).json({ error: 'Please provide a imageID' })
        return
    }
 
    try {
        const media = await client.$transaction ([
            client.cognition.findFirst({
                where: {
                    //@ts-expect-error
                    mediaId: mediaId,
                },
            })
        ])
        // convert media to JSON
        // const mediaJson = JSON.stringify(media)
        res.status(200).json(media)
    }
    catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }
}
