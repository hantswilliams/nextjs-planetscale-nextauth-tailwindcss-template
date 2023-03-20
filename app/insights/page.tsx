import { Card, Title, Text, Divider } from '@tremor/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Link from 'next/link';

import Bar from './components/barlist';

export default async function ResultsPage() {
  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return (
        <main className="p-10 md:p-10 mx-auto max-w-2xl">
          <Card>
            <Title>You are not logged in</Title>
            <Text>Please log in.</Text>
            <div className="flex justify-center">
              <Link
                href="/api/auth/signin"
                className="group mt-5 rounded-2xl h-12 w-40 bg-slate-900 font-bold text-sm text-white relative overflow-hidden flex items-center justify-center"
              >
                Login
              </Link>
            </div>
          </Card>
        </main>
      );
    }

    console.log('session: gallery page ', session);
    const userId = JSON.stringify(session?.user?.id).replace(/['"]+/g, '');
    console.log('userId: ', userId);

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/report/all/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      // handle error response from the API
      throw new Error(`Failed to fetch data from the API: ${response.statusText}`);
    }

    const jsonData = await response.json();
    console.log('jsonData: ', jsonData);

    if (!jsonData) {
      // handle empty or missing data
      return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
          <Title>Your insights:</Title>
          <Text>Across all of your posts and synced content...</Text>
          <Text>There is no data to display.</Text>
        </main>
      );
    }

    const dataCategorical = Object.keys(jsonData.summaryCategoricalSums).map(
      (key) => ({
        name: key,
        value: jsonData.summaryCategoricalSums[key],
      })
    );

    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Your insights:</Title>
        <Text>Across all of your posts and synced content...</Text>
        <Divider />
        <Bar intputData={dataCategorical} />
        <Divider />
      </main>
    );
  } catch (error) {
    // handle any unexpected errors
    console.error(error);
    return (
      <main className="p-10 md:p-10 mx-auto max-w-2xl">
        <Card>
          <Title>Oops! Something went wrong.</Title>
          <Text>Please try again later.</Text>
        </Card>
      </main>
    );
  }
}
