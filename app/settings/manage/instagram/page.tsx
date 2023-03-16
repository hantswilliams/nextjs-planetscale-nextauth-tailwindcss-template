import {
    Card,
    Title,
    Text
} from '@tremor/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { queryBuilder } from '../../../../lib/planetscale';
import { json } from 'stream/consumers';
import IntegrationDetails from './components/integrationDetails';
import IntegrationActions from './components/integrationActions';
import Link from 'next/link';
import InstagramStreamer from './components/instagramStreamer';


export default async function InstagramSettingsPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="p-10 md:p-10 mx-auto max-w-2xl">
            <Card>
              <Title >You are not logged in</Title>
              <Text>
                To see dashboard, please log in.
              </Text>
              <div className="flex justify-center">
                <a href="/api/auth/signin" className="group mt-5 rounded-2xl h-12 w-40 bg-slate-900 font-bold text-sm text-white relative overflow-hidden flex items-center justify-center">
                  Get started!
                </a>
              </div>
            </Card>
          </main>
        )
    }

    // get user ID from session
    const userId = session?.user?.id;

    const instagramDetails = await queryBuilder
    .selectFrom('Instagram')
    .select(['userId', 'igusername', 'iguserid', 'igtoken', 'igmediacount', 'igaccounttype', 'tokencreated'])
    .where('userId', 'like', `%${userId}%`)
    .execute();

    console.log('instagramDetails: ', instagramDetails)

    return (
        <div className="flex flex-col justify-center items-center mt-5">

            <IntegrationActions 
              iguserid = {instagramDetails[0]?.iguserid}
              igusertoken = {instagramDetails[0]?.igtoken}
              currentuserid = {session?.user?.id ?? 'not-logged-in'}
            />

            {/* <IntegrationDetails 
                dateconnected = {instagramDetails[0]?.tokencreated.toISOString() ?? '2023-03-12 18:32:14'}
                username = {instagramDetails[0]?.igusername ?? 'john_doe'}
                accounttype= {instagramDetails[0]?.igaccounttype ?? 'personal'}
                mediacount= {instagramDetails[0]?.igmediacount ?? 343}
            /> */}

            <br />

            <InstagramStreamer 
              userIguserId = {instagramDetails[0]?.iguserid}
              userIguserToken = {instagramDetails[0]?.igtoken}
              userCurrentuserId = {session?.user?.id ?? 'not-logged-in'}
            />




        </div>
    );
}