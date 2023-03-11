import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

import {
  Card,
  Metric,
  Text,
  Flex,
  ColGrid,
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
              To see dashboard, please log in.
            </Text>
            <div className="flex justify-center">
              <a href="/api/auth/signin"target="_blank" className="group mt-5 rounded-2xl h-12 w-40 bg-blue-500 font-bold text-sm text-white relative overflow-hidden flex items-center justify-center">
                 Get started! 
              </a>
            </div>
          </Card>
        </main>
      )
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Social Comprehend: Moderation Statistics</Title>
      <ColGrid marginTop='mt-5' numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="items-start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex
              justifyContent="justify-start"
              alignItems="items-baseline"
              spaceX="space-x-3"
              truncate={true}
            >
              <Metric>{item.metric}</Metric>
              <Text truncate={true}>from {item.metricPrev}</Text>
            </Flex>
          </Card>
        ))}
      </ColGrid>
      <ColGrid
        numColsSm={2}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
        marginTop="mt-8"
      >
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="justify-start"
              alignItems="items-baseline"
              spaceX="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex marginTop="mt-6">
              <Text>Pages</Text>
              <Text textAlignment="text-right">Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={dataFormatter}
              marginTop="mt-2"
            />
          </Card>
        ))}
      </ColGrid>
      <Chart />
    </main>
  );
}
