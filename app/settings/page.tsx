import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { UserDetails } from './types';
import UserDetailsTable from './userDetails';
import UserSocialAccounts from './socialaccounts';
import Link from 'next/link';
import {Card, Title, Text} from '@tremor/react';

// export default async function SettingsPage({ user }: { user: any }) {
export default async function SettingsPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
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
            </main>
        )
    }

    // create object/array of user settings: image, name, email, and id
    const userDetails: UserDetails = {
        image: JSON.stringify(session?.user?.image).replace(/['"]+/g, ''),
        name: JSON.stringify(session?.user?.name).replace(/['"]+/g, ''),
        email: JSON.stringify(session?.user?.email).replace(/['"]+/g, ''),
        userid: JSON.stringify(session?.user?.id).replace(/['"]+/g, ''),
    }

    console.log('userDetails: ', userDetails)

    return(
        <main className="p-0 md:p-12 mx-auto max-w-7xl overflow-x-hidden">
            { session && (
                    <div className="flex flex-row">
                            <div className="flex-1 p-0">
                                <div className="mb-1">
                                    {/* @ts-expect-error Server Component */}
                                    <UserDetailsTable userdetails={userDetails} />
                                </div>
                                <div>
                                    <div className="mt-2 relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                                        {/* @ts-expect-error Server Component */}
                                        <UserSocialAccounts/>
                                    </div>
                                </div>
                                <div>
                                    {/* <div className="mt-2 relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                                        <div className="relative flex w-full justify-center rounded-xl bg-cover" >
                                            <button
                                                type="button"
                                                className={`my-4 capitalize bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-900`}
                                            >
                                                Change membership type
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                    </div>
            )} 
        </main>
    )
}
