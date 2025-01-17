import { Card, Title, Text } from '@tremor/react';
import { queryBuilder } from '../../lib/planetscale';
import Search from './search';
import UsersTable from './table';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Link from 'next/link';


export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {

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


  const search = searchParams.q ?? '';
  const users = await queryBuilder
    .selectFrom('User')
    .select(['id', 'name', 'username', 'email'])
    .where('name', 'like', `%${search}%`)
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of demo/pilot users on Social Comprehend.
      </Text>
      <Search />
      <Card>
        {/* @ts-expect-error Server Component */}
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
