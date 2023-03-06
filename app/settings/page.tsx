import { Title, Text } from "@tremor/react"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';


export default async function SettingsPage({ user }: { user: any }) {

    const session = await getServerSession(authOptions);


    return(
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            {/* <Text>
                This is the settings page.
            </Text>
            <Text>
            </Text>
            <Text marginTop='mt-4'>
                {JSON.stringify(session)}
            </Text> */}
            {/* <Text marginTop='mt-4'>
                Session ID: {JSON.stringify(session?.user?.id).replace(/['"]+/g, '')}
                Image ID: {JSON.stringify(session?.user?.image).replace(/['"]+/g, '')}
            </Text> */}
            { session && (
                <div className="flex flex-col justify-center items-center">
                    <Title> Settings </Title>
                    <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
                            <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" /> 
                            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                                <img className="h-full w-full rounded-full" src={JSON.stringify(session?.user?.image).replace(/['"]+/g, '')} alt="" />
                            </div>
                        </div> 
                        <div className="mt-16 flex flex-col items-center">
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                            {JSON.stringify(session?.user?.name).replace(/['"]+/g, '')}
                            </h4>
                            <p className="text-base font-normal text-gray-600">{JSON.stringify(session?.user?.email).replace(/['"]+/g, '')}</p>
                            <p className="text-base font-normal text-gray-600">{JSON.stringify(session?.user?.id).replace(/['"]+/g, '')}</p>
                        </div> 
                        <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                            <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">9.7k</p>
                            <p className="text-sm font-normal text-gray-600">Posts</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                3
                            </p>
                            <p className="text-sm font-normal text-gray-600">Accounts</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                                1.3k
                            </p>
                            <p className="text-sm font-normal text-gray-600">Flagged</p>
                            </div>
                        </div>
                    </div>  
                </div>
            )} 
                
            
        </main>
    )
}
