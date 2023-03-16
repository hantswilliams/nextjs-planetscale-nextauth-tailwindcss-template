import { Card, Title, Text } from '@tremor/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import client from '../../../lib/prismadb';
import Link from 'next/link';

export default async function InstagramMePage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div>
            <Card>
              <Title >You are not logged in</Title>
              <Text>
                Please log in.
              </Text>
              <div className="flex justify-center">
                <Link href="/api/auth/signin" className="group mt-5 rounded-2xl h-12 w-40 bg-slate-900 font-bold text-sm text-white relative overflow-hidden flex items-center justify-center">
                   Login 
                </Link>
              </div>
            </Card>
            </div>
        )
    }

    const session_user_id = session?.user?.id

    // get instagram token from db of user
    const igtoken_user_request = await client.instagram.findFirst({
        where: {
            userId: session_user_id
        },
        orderBy: {
            tokencreated: 'desc'
        },
        select: {
            igtoken: true
        }
    }).catch((e) => {
        console.log('error getting igtoken from db: ', e)
    })

    // console.log('igtoken_user_request: ', igtoken_user_request)

    // if igtoken_user_request is null, return message that you need to first connect IG 
    if (!igtoken_user_request) {
        return (
            <div>
                <Card>
                    <Title>Instagram Me</Title>
                    <Text>
                        This is the Instagram Me page.
                    </Text>
                    <Text>
                        You need to connect your Instagram account first. Please go to your settings to connect. 
                    </Text>
                </Card>
            </div>
        )
    }

    const tokenOnly = igtoken_user_request?.igtoken
    
    const ig_status_check = async () => {
        const response = await fetch('http://localhost:5005' + '/instagram/official/me', {
            cache: 'no-store',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ igtoken: tokenOnly})
          });
          
          const igmeresponse = await response.text();
          return igmeresponse
    }

    const data = await ig_status_check()

    return (

        <div>
            <Card>
                <Title>Instagram Me</Title>
                <Text>
                    This is the Instagram Me page.
                </Text>
                <Text>
                    {data}
                </Text>
            </Card>
        </div>
            
    )



}