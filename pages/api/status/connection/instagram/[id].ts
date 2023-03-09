import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../../lib/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    //@ts-ignore    
    const { id } = req.query;

    // if no userid is provided, return error
    if (!id) {
        res.status(400).json({ error: 'No id provided' })
        return
    }

    try {
        const instagram = await client.$transaction ([
            client.instagram.findMany({
                where: {
                    //@ts-expect-error
                    userId: id
                },
                orderBy: {
                    tokencreated: 'desc'
                },
                take: 1
            })
        ])
        res.status(200).json(instagram)
    } catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }

}