import { Card, Title, Text } from '@tremor/react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {

  const session = await getServerSession(authOptions);

  return (

    <main className="p-10 md:p-10 mx-auto max-w-2xl" >
      <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="mb-5 sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Social Comprehend 
        </h1>
    </div>
      <Card>
        <Text>
          What is it? Its a sophisticated content moderation tool for social media. Identify existing content from your social media feeds that may not be professionally appropriate to share, and receive SMS alerts for future content that should be reviewed.
        </Text>
        <div className="flex justify-center">
          <Link legacyBehavior href="/demo-amazon">
            <button className="group mt-5 rounded-2xl h-12 w-40 bg-slate-900 font-bold text-sm text-white relative overflow-hidden">
              Get started!
            </button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
