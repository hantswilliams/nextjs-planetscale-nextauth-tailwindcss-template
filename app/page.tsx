import { Card, Title, Text } from '@tremor/react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {

  return (
    <main className="p-10 md:p-10 mx-auto max-w-2xl">
      <Card>
        <Title >Social Comprehend is a...</Title>
        <Text>
          sophisticated content moderation for social media. Identify and remove inappropriate content from your social media feeds.
        </Text>
        <div className="flex justify-center">
          <Link legacyBehavior href="/demo-amazon">
            <button className="group mt-5 rounded-2xl h-12 w-40 bg-purple-500 font-bold text-sm text-white relative overflow-hidden">
              Get started!
            </button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
