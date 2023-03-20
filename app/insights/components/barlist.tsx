'use client';

import { Card, BarList } from '@tremor/react';


const valueFormatter = (number: number) => {
    return Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(number).toString();
    };

type dataInput = {
        name: string;
        value: number;
};


export default function Bar({ intputData }: { intputData: dataInput[] }) {
  return (
    <Card className="max-w-xs mx-auto" decoration="top" decorationColor="neutral" >
        <BarList
            data={intputData}
            valueFormatter={valueFormatter}
        />
    </Card>
  );
}
