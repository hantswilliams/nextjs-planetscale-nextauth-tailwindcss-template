import { Title, Text } from "@tremor/react"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export default async function SettingsPage() {

    const session = await getServerSession(authOptions);

    return(
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title> Settings </Title>
            <Text>
                This is the settings page.
            </Text>
            <Text marginTop='mt-4'>
                {JSON.stringify(session)}
            </Text>
        </main>
    )
}
