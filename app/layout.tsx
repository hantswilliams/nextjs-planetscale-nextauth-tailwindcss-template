import './globals.css';
// import '@tremor/react/dist/esm/tremor.css';

import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'Social Comprehend',
  description:
    'Content moderation for social media. Identify and remove inappropriate content from your social media feeds.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        {/* <AnalyticsWrapper /> */}
        <Toast />
      </body>
    </html>
  );
}
