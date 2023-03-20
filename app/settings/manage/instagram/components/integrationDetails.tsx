import {
    Card,
    Metric,
    Text,
    Flex,
    Grid,
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

        <Grid numColsSm={ 2 } numColsLg={ 2 } className="gap-2">
            <Card>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >                        
                        <CameraIcon className="h-6 w-6 mx-auto text-blue-700" />
                        <Text> Posts </Text>
                        <Metric>{mediacount}</Metric>
                </Flex>
            </Card>
            <Card>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >                     
                    <UserCircleIcon className="h-6 w-6 mx-auto text-blue-700"/>
                    <Text> IG Username </Text>
                    <Metric> {username} </Metric>
                </Flex>
            </Card>
            <Card>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >                         
                    <HomeIcon className="h-6 w-6 mx-auto text-blue-700"/>
                    <Text> Account Type </Text>
                    <Metric> {accounttype}</Metric>
                </Flex>
            </Card>
            <Card>
                <Flex
                    justifyContent="start"
                    alignItems="baseline"
                    className="truncate space-x-3"
                >                     
                    <HomeIcon className="h-6 w-6 mx-auto text-blue-700"/>
                    <Text> Date Connected </Text>
                    <Metric> {dateconnected} </Metric>
                </Flex>
            </Card>
        </Grid>
        
    </div>  
  );
};

export default IntegrationDetails;