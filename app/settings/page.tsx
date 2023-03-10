import { Title, Text } from "@tremor/react"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { UserDetails } from './types';
import UserDetailsTable from './userDetails';
import UserSocialAccounts from './socialaccounts';

// export default async function SettingsPage({ user }: { user: any }) {
export default async function SettingsPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div className="flex flex-col justify-center items-center">
                    <Title> Settings </Title>
                    <Text> You are not logged in. </Text>
                </div>
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
        <main className="p-1 md:p-12 mx-auto max-w-7xl">
            { session && (
                    <div className="flex flex-row">
                        {/* Second Column */}
                            <div className="flex-1 p-4">
                                <div className="mb-8">
                                {/* <h2 className="text-lg font-bold">Element 1</h2>
                                    <p className="mt-2">User Details</p> */}
                                    {/* @ts-expect-error Server Component */}
                                    <UserDetailsTable userdetails={userDetails} />
                                </div>
                                <div>
                                    {/* <h2 className="text-lg font-bold">Element 2</h2>
                                    <p className="mt-2">Account Type and Payment.</p> */}
                                    <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                                        <div className="relative flex w-full justify-center rounded-xl bg-cover" >
                                            <button
                                                type="button"
                                                className={`my-4 capitalize bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-900`}
                                            >
                                                Change membership type
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                                        {/* @ts-expect-error Server Component */}
                                        <UserSocialAccounts/>
                                    </div>
                                </div>
                            </div>
                    </div>
            )} 
        </main>
    )
}
