import {
    Card,
    Metric,
    Text,
    Block,
    ColGrid,
} from '@tremor/react';

import { CameraIcon, UserCircleIcon, HomeIcon } from '@heroicons/react/24/solid';

type CategoryProps = {
    username: string;
    mediacount: number;
    dateconnected: string;
    accounttype: string;
};

const IntegrationDetails = ({ username, mediacount, dateconnected, accounttype }: CategoryProps) => {
  return (
    <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[90%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
    
        <div className="mt-2 mb-1 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white mb-2">
            Integration Details
            </h4>
        </div> 

        <ColGrid numColsSm={ 2 } numColsLg={ 2 } gapX="gap-x-6" gapY="gap-y-6">
            <Card>
                <Block textAlignment="text-center">
                        <CameraIcon className="h-6 w-6 mx-auto text-blue-700" />
                        <Text textAlignment="text-center"> Posts </Text>
                        <Metric textAlignment="text-center" marginTop="mt-2">{mediacount}</Metric>
                </Block>
            </Card>
            <Card>
                <Block textAlignment="text-center">
                    <UserCircleIcon className="h-6 w-6 mx-auto text-blue-700"/>
                    <Text textAlignment="text-center"> IG Username </Text>
                    <Metric textAlignment="text-center" marginTop="mt-2"> {username} </Metric>
                </Block>
            </Card>
            <Card>
                <Block textAlignment="text-center">
                    <HomeIcon className="h-6 w-6 mx-auto text-blue-700"/>
                    <Text textAlignment="text-center"> Account Type </Text>
                    <Metric textAlignment="text-center" marginTop="mt-2"> {accounttype}</Metric>
                </Block>
            </Card>
            <Card>
                <Block textAlignment="text-center">
                    <HomeIcon className="h-6 w-6 mx-auto text-blue-700"/>
                    <Text textAlignment="text-center"> Date Connected </Text>
                    <Metric textAlignment="text-center" marginTop="mt-2"> {dateconnected} </Metric>
                </Block>
            </Card>
        </ColGrid>
        
    </div>  
  );
};

export default IntegrationDetails;