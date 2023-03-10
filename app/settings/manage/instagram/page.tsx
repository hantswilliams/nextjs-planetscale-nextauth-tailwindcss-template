import {
    Card,
    Title,
    Metric,
    Text,
    Icon,
    Block,
    ColGrid,
} from '@tremor/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../pages/api/auth/[...nextauth]';
import { queryBuilder } from '../../../../lib/planetscale';
import { json } from 'stream/consumers';

import { CameraIcon, UserCircleIcon, HomeIcon } from '@heroicons/react/24/solid';



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
                <a href="/api/auth/signin"target="_blank" className="group mt-5 rounded-2xl h-12 w-40 bg-purple-500 font-bold text-sm text-white relative overflow-hidden flex items-center justify-center">
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
    .select(['userId', 'igusername', 'igmediacount', 'igaccounttype', 'tokencreated'])
    .where('userId', 'like', `%${userId}%`)
    .execute();

    console.log('instagramDetails: ', instagramDetails)

    return (
        <div className="flex flex-col justify-center items-center mt-5">



            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[90%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                
    
                <div className="mt-2 mb-1 w-full">
                    <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    Instagram Connection Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4 px-2 w-full">
                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Date Connected</p>
                        <p className="text-xs font-medium text-navy-700 dark:text-white">
                            {instagramDetails[0]?.tokencreated.toISOString()}
                        </p>
                    </div>
                </div>
                </div> 



                <ColGrid numColsSm={ 2 } numColsLg={ 3 } gapX="gap-x-6" gapY="gap-y-6">
                    <Card>
                        <Block textAlignment="text-center">
                            <CameraIcon className="h-5 w-5 text-purple-500"/>
                            <Metric textAlignment="text-center" marginTop="mt-2"> {instagramDetails[0]?.igmediacount}</Metric>
                            <Text textAlignment="text-center"> # Instagram Posts </Text>
                        </Block>
                    </Card>
                    <Card>
                        <Block textAlignment="text-center">
                            <UserCircleIcon className="h-5 w-5 text-purple-500"/>
                            <Metric textAlignment="text-center" marginTop="mt-2"> {instagramDetails[0]?.igusername}</Metric>
                            <Text textAlignment="text-center"> IG Username </Text>
                        </Block>
                    </Card>
                    <Card>
                        <Block textAlignment="text-center">
                            <HomeIcon className="h-5 w-5 text-purple-500"/>
                            <Metric textAlignment="text-center" marginTop="mt-2"> {instagramDetails[0]?.igaccounttype}</Metric>
                            <Text textAlignment="text-center"> Account Type </Text>
                        </Block>
                    </Card>
                </ColGrid>





            </div>  

        </div>
    );
}