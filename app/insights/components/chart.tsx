'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';


const data = [
  {
    Month: 'Jan 21',
    Sales: 2890,
    Profit: 2400,
  },
  {
    Month: 'Feb 21',
    Sales: 1890,
    Profit: 1398,
  },
  {
    Month: 'Jan 22',
    Sales: 3890,
    Profit: 2980,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart() {
  return (
    <Card>
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>
      <AreaChart
        data={data}
        categories={['Sales', 'Profit']}
        index="Month"
        colors={['indigo', 'fuchsia']}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
