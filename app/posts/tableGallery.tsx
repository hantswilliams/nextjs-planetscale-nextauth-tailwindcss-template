import Link from 'next/link';

interface UserMedia {
    media_uid: number;
    medial_url: string;
  }

export default async function UsersMediaTable({ users }: { users: UserMedia[] }) {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <section className="overflow-hidden text-neutral-700">
                            <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
                                <div className="-m-1 flex flex-wrap md:-m-2">
                                    {users.map((item: UserMedia) => (
                                        <div key={item.media_uid} className="flex w-1/3 flex-wrap">
                                            <div className="w-full p-1 md:p-2">
                                                 <Link href={`/image/${item.media_uid}`}>
                                                    <img
                                                        alt="gallery"
                                                        className="block h-full w-full rounded-lg object-cover object-center"
                                                        src={item.medial_url} />
                                                 </Link>
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