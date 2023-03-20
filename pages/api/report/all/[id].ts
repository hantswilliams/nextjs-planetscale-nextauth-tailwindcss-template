import type { NextApiRequest, NextApiResponse } from 'next'
import client from '../../../../lib/prismadb'
import SumsNumeric from './helperFunctions/numericSums'
import SumsCategorical from './helperFunctions/categoricalSum'

// example call: https://localhost:3000/api/report/all/cleq5z8980004g7ns4zxj6ss4


interface UserOutputCleaned {
    binary: {
        binary: string;
    }
    category: {
        Alcohol: boolean;
        Drugs: boolean;
        'Explicit Nudity': boolean;
        Gambling: boolean;
        'Hate Symbols': boolean;
        'Rude Gestures': boolean;
        Suggestive: boolean;
        Tabacco: boolean;
        Violence: boolean;
        'Visually Disturbing': boolean;
        'Revealing Clothes'?: boolean; // added optional property to match one of the objects in the response
        'Weapon Violence'?: boolean; // added optional property to match one of the objects in the response
    };
    numeric: {
        Alcohol: number;
        Drugs: number;
        'Explicit Nudity': number;
        Gambling: number;
        'Hate Symbols': number;
        'Rude Gestures': number;
        Suggestive: number;
        Tabacco: number;
        Violence: number;
        'Visually Disturbing': number;
        'Weapon Violence'?: number; // added optional property to match one of the objects in the response
    };
    dateProcessed: string;
    totalConfidence: number;
}

interface Cognition {
    outputcleaned: UserOutputCleaned[];
}

interface Cognitions {
    userId: string;
    cognitions: Cognition[];
}

type PrismaResponse = Cognitions[][];

    
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query

    if (!id) {
        res.status(401).json({ error: 'Please provide a user ID to generate report summary' })
        return
    }
 
    try {

        const PrismaResponse = await client.$transaction ([
            client.media.findMany({
                where: {
                    userId: id.toString(),
                },
                select: {
                    userId: true,
                    cognitions: {
                        select: {
                            outputcleaned: true
                        }
                    }
                }
            })
        ])

        // example of going down the nest....
        // console.log("PrismaResponse: ", PrismaResponse)
        const Cognitions = PrismaResponse.flat()
        // console.log("Cognitions: ", Cognitions)
        // console.log("Cognitions: count: ", Cognitions.length)


        // if cognitions count is 0, then return False 
        if (Cognitions.length === 0) {
            res.status(200).json({ cognitions: false })
            return
        }

        // console.log("Cognitions: first item in array, outputCleaned: ", Cognitions[0]?.cognitions[0]?.outputcleaned)

        //@ts-expect-error
        const summaryNumericSums = await SumsNumeric(PrismaResponse)

        //@ts-expect-error
        const summaryCategoricalSums = await SumsCategorical(PrismaResponse)


        res.status(200).json({ summaryNumericSums, summaryCategoricalSums })
    }
    catch (error) {
        res.status(400).json({ error })
        console.log(error)
    }
}
