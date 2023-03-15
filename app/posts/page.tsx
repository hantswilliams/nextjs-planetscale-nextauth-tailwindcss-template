import { Title, Text, Card } from "@tremor/react"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { queryBuilder } from '../../lib/planetscale';
import UsersMediaTable from './tableGallery';
import Link from 'next/link';

export default async function GalleryPage() {


    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="p-10 md:p-10 mx-auto max-w-2xl">
            <Card>
              <Title >You are not logged in</Title>
              <Text>
                To see your posts, please log in.
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

    console.log('session: gallery page ', session)
    const userId = JSON.stringify(session?.user?.id).replace(/['"]+/g, '')
    console.log('userId: ', userId)

    const userImages = await queryBuilder
        .selectFrom('Media')
        .select(['media_uid', 'medial_url'])
        .where('userId', 'like', `%${userId}%`)
        .where('viewable', 'like', 1)
        .orderBy('timestampMedia', 'desc')
        .execute();

    console.log('userImages from PlanetDB: ', userImages);
    console.log('userImages length: ', userImages.length);

    // if userImages length is 0, return no images found
    if (userImages.length === 0) {
        return (
            <main className="p-10 md:p-10 mx-auto max-w-2xl">
                <Card>
                    <div className="flex flex-col justify-center items-center"> 
                        <Title> No Images Found </Title>
                        <Text>
                            Please upload images manually or connect to Instagram.
                        </Text>
                            <button className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-5 mt-5">
                                <Link href="/settings/"> Connect to Instagram </Link>
                            </button>
                            <button className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                                <Link href="/demo-amazon"> Upload Images Manually </Link>
                            </button>
                    </div>
                    </Card>
            </main>
        )
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex flex-col justify-center items-center">
                <Title> Gallery </Title>
                <Text> A list of images uploaded by the user. </Text>
                    <Text> Gallery for: {userId} </Text>
                    {/* @ts-expect-error Server Component */}
                    <UsersMediaTable users={userImages} limit={10} />
            </div>
        </main>
    )
}


