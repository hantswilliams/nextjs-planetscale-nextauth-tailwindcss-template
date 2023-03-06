import { Title, Text, Card } from "@tremor/react"

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export default async function GalleryPage({ user }: { user: any }) {

    const session = await getServerSession(authOptions);
    console.log('session: ', session)
    // const userId = JSON.stringify(session?.user?.id).replace(/['"]+/g, '')
    // console.log('userId: ', userId)

    const userId = 'cleq5z8980004g7ns4zxj6ss4'
    // const userId = 'clew8vjz40000g7mnuz3apnbt'
    const res = await fetch('http://localhost:3000/api/images/user/' + userId)
    
    console.log('res: ', res)
    const userData = await res.json()
    console.log('userData: ', userData)
    const userData2 = userData[0]
    console.log('userData2: ', userData2)

    // console.log('userData: ', userData)
    // console.log('data JSON: ', JSON.stringify(userData[0][0]))
    // const dataJson = JSON.stringify(userData[0])

    type ImageFields = {
        id: string,
        userId: string,
        media_uid: string,
        media_type: string,
        origin: string,
        medial_url: string,
        s3bucket_key: string,
        permalink: string,
        title: string,
        content: string,
        timestamp: string,
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex flex-col justify-center items-center">
                <Title> Gallery </Title>
                <Text> A list of images uploaded by the user. </Text>
                <div className="flex flex-col justify-center items-center">
                    <section className="overflow-hidden text-neutral-700">
                        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                            <div className="-m-1 flex flex-wrap md:-m-2">
                                {userData2.map((item: ImageFields) => (
                                    <div key={item.id} className="flex w-1/3 flex-wrap">
                                        <div className="w-full p-1 md:p-2">
                                        <img
                                            alt="gallery"
                                            className="block h-full w-full rounded-lg object-cover object-center"
                                            src={item.medial_url} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}


