
import { Title, Text, Card } from "@tremor/react"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { queryBuilder } from '../../lib/planetscale';
import UsersMediaTable from './tableGallery';

export default async function GalleryPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <Text>
                    You are not logged in.
                </Text>
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

    if (!userImages) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <Text>
                    No images found.
                </Text>
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
                    <UsersMediaTable users={userImages} />
            </div>
        </main>
    )
}


