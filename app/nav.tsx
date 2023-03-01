import { authOptions } from '../pages/api/auth/[...nextauth]';
import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(
    'session',
    session?.user?.name,
    session?.user?.email,
  )
  return <Navbar user={session?.user} />;
}
