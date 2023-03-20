import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Link from 'next/link';

import {
  Card,
  Metric,
  Text,
  Flex,
  Title,
  BarList
} from '@tremor/react';
import Chart from './chart';

const suggestiveContent = [
  { name: '/instagram', value: 1230 },
  { name: '/twitter', value: 751 },
  { name: '/tiktok', value: 471 },
  { name: '/facebook', value: 280 },
  { name: '/linkedin', value: 78 }
];

const drugsAlcohol = [
  { name: '/instagram', value: 453 },
  { name: '/tiktok', value: 351 },
  { name: '/facebook', value: 271 },
  { name: '/linkedin', value: 191 }
];

const rudeGestures = [
  { name: '/instagram', value: 789 },
  { name: '/twitter', value: 676 },
  { name: '/tiktok', value: 564 },
  { name: '/facebook', value: 234 },
  { name: '/linkedin', value: 191 }
];

const data = [
  {
    category: 'Suggestive Content',
    stat: '2,456',
    data: suggestiveContent
  },
  {
    category: 'Drugs and Alcohol',
    stat: '3,456',
    data: drugsAlcohol
  },
  {
    category: 'Rude Gestures',
    stat: '2,543',
    data: rudeGestures
  }
];

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: 'Users',
    metric: '3,456',
    metricPrev: '1,234'
  },
  {
    title: 'Images Moderated',
    metric: '34,567',
    metricPrev: '23,456'
  },
  {
    title: 'Identified NSFW posts',
    metric: '7,678',
    metricPrev: '3,456'
  }
];

export default async function DashboardPage() {

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

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Social Comprehend: Moderation Statistics</Title>
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.metric}</Metric>
              <Text>from {item.metricPrev}</Text>
            </Flex>
          </Card>
        ))}
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex>
              <Text>Pages</Text>
              <Text>Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={dataFormatter}
            />
          </Card>
        ))}
      <Chart />
    </main>
  );
}
