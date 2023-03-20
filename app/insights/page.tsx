import { Card, Title, Text, BarList, ProgressBar, Divider} from '@tremor/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Link from 'next/link';

import Chart from './components/chart';
import Donut from './components/donut';
import Bar from './components/barlist';

export default async function ResultsPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <main className="p-10 md:p-10 mx-auto max-w-2xl">
              <Card>
                <Title >You are not logged in</Title>
                <Text>
                  Please log in.
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

    // first perform API for cognitions to see if any exist, if they dont, return a message saying there is no data to display

    const response = await fetch(`https://localhost:3000/api/report/all/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const jsonData = await response.json();
    console.log('jsonData from insights: ', jsonData)


    // if jsonData = {cognitions: false}, return a message saying there is no data to display
    if (jsonData.cognitions === false || jsonData === null || jsonData === undefined) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Your insights:</Title>
            <Text>Across all of your posts and synced content...</Text>
            <Text>There is no data to display.</Text>
            </main>
        )
    }


               
    const dataNumeric = Object.keys(jsonData.summaryNumericSums).map((key) => ({
    name: key,
    'value': jsonData.summaryNumericSums[key],
    }));

    const dataCategorical = Object.keys(jsonData.summaryCategoricalSums).map((key) => ({
    name: key,
    'value': jsonData.summaryCategoricalSums[key],
    }));

    const valueFormatter = (number: number) => {
    return Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number).toString();
    };

    console.log('dataNumeric CLIENT', dataNumeric)
    console.log('dataCategorical CLIENT', dataCategorical)

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Your insights:</Title>
        <Text>Across all of your posts and synced content...</Text>
        <Divider />
        <Bar intputData={dataCategorical} />
        <Divider />
        {/* <Bar intputData={dataNumeric} />
        <Chart />
        <Donut /> */}






    </main>

    );



}

