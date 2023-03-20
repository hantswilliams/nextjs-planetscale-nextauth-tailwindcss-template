'use client';

import { Card, DonutChart, Title, Text } from '@tremor/react';


const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Donut() {
  return (
    <Card>
      <Title>Performance</Title>
      <Text>Comparison between Sales and Profit</Text>
      <DonutChart
        data={cities}
        category="sales"
        index="Month"
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
