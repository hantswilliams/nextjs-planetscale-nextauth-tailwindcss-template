import {
    Card,
    Block,
    ColGrid,
} from '@tremor/react';

import { FolderArrowDownIcon, BoltIcon, ChartBarSquareIcon } from '@heroicons/react/24/solid';

const IntegrationActions = () => {
    return  (
        <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[90%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
        <div className="mt-2 mb-1 w-full">
            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
            Instagram Actions
            </h4>
            <div className="grid grid-cols-2 gap-4 px-2 w-full">
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            </div>
        </div>
        </div> 
    
        <ColGrid numColsSm={ 2 } numColsLg={ 3 } gapX="gap-x-6" gapY="gap-y-6">
            <Card>
                <Block textAlignment="text-center">
                        <button className="bg-white-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <FolderArrowDownIcon className="h-10 w-10 text-blue-700 mr-1" />
                            <span>Get Content from IG</span>
                        </button>
                </Block>
            </Card>
            <Card>
            <Block textAlignment="text-center">
                        <button className="bg-white-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <BoltIcon className="h-10 w-10 text-blue-700 mr-1" />
                            <span>Analyze for NSFW</span>
                        </button>
                </Block>
            </Card>
            <Card>
            <Block textAlignment="text-center">
                        <button className="bg-white-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            <ChartBarSquareIcon className="h-10 w-10 text-blue-700 mr-1" />
                            <span>Generate your report</span>
                        </button>
                </Block>
            </Card>
        </ColGrid>
    </div> 


    )

}

export default IntegrationActions;