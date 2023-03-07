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

    // // need to move this part to the API/backend so can convert this page to client side
    // // make photo not viewable
    // const softdeleteImage = async (media_uid: number) => {
    //     await queryBuilder 
    //         .updateTable('Media')
    //         .set({viewable: 0})
    //         .where('media_uid', 'like', `%${media_uid}%`)
    //         .execute();
    // }

    try {
        const mediaUpdate = await client.$transaction ([
            client.media.update({
                where: {
                    media_uid: req.body?.uuid
                },
                data: {
                    viewable: false
                },
            })
        ])
        res.status(200).json(mediaUpdate)
    } catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }

}


