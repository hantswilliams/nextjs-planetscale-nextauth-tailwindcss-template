import { UserDetails } from './types'

export default async function UserDetailsTable ({ userdetails }: { userdetails: UserDetails }) {
    return (
        <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
        <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover" >
            <img src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png' className="absolute flex h-32 w-full justify-center rounded-xl bg-cover" /> 
            <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                <img className="h-full w-full rounded-full" src={userdetails.image} alt="" />
            </div>
        </div> 
        <div className="mt-16 flex flex-col items-center">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            {userdetails.name}
            </h4>
            <p className="text-base font-normal text-gray-600">{userdetails.email}</p>
            <p className="text-base font-normal text-gray-600">{userdetails.userid}</p>
        </div> 
        <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
            <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">9.7k</p>
            <p className="text-sm font-normal text-gray-600">Posts</p>
            </div>
            <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-navy-700 dark:text-white">
                3.2k
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
    )
}