'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';


type igUserFields = {
    iguserid: string;
    igusertoken: string;
    currentuserid: string;
};

const IntegrationActions = ({ iguserid, igusertoken, currentuserid }: igUserFields) => {

    const [buttonStatus, setButtonStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [percentComplete, setPercentComplete] = useState<number>(0);
    const [igData, setIgData] = useState<any>([]);
    const [stage1, setStage1] = useState<'idle' | 'success'>('idle');
    const [stage2, setStage2] = useState<'idle' | 'success'>('idle');
    const [stage3, setStage3] = useState<'idle' | 'success'>('idle');
    const [stage4, setStage4] = useState<'idle' | 'success'>('idle');

    console.log('from action page: iguserid: ', iguserid)
    console.log('from action page: igusertoken: ', igusertoken)
    console.log('from action page: currentuserid: ', currentuserid)

    const handleIgDataPull = () => {
        console.log('handleIgDataPull clicked')
        setButtonStatus('loading'); // set button status to 'loading'

        fetch('/api/retrieve/instagram/get', {
            method: 'POST',
            body: JSON.stringify({
                iguserId: iguserid,
                iguserToken: igusertoken,
                currentuserid: currentuserid
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setIgData(data?.ig_media)
            setButtonStatus('success'); // set button status to 'success'
            setStage1('success'); // set stage 1 to 'success'
        })
    }

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

        <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
            <li className="mb-10 ml-6"> 

                {stage1 === 'success' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                        <svg aria-hidden="true" className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                {stage1 === 'idle' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                
                <h3 className="font-medium leading-tight">1. Retrieve</h3>
                <p className="text-sm">Get your your IG posts...</p>
                <button onClick={handleIgDataPull} disabled={buttonStatus === 'loading' || buttonStatus === 'success'} className={`mt-2 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${buttonStatus === 'success' ? 'bg-green-500 cursor-default' : 'bg-blue-600 hover:bg-blue-500'}`}>
                    {buttonStatus === 'idle' && 'Retrieve'}
                    {buttonStatus === 'loading' && <ArrowPathIcon className="animate-spin h-5 w-5 mr-2"/>}
                    {buttonStatus === 'success' && `Completed: retrieved ${igData?.length} posts`} 
                </button>           
            </li>
            <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="font-medium leading-tight">2. Analyze</h3>
                <p className="text-sm">Click here to begin the processing of your IG content</p>
            </li>
            <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="font-medium leading-tight">3. Report</h3>
                <p className="text-sm">Click here to generate a summary report of your IG content</p>
            </li>
            <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="font-medium leading-tight">4. SMS alerts</h3>
                <p className="text-sm">Setup custom SMS alerts for future flagged content</p>
            </li>
        </ol>



    
        {/* <ColGrid numColsSm={ 2 } numColsLg={ 3 } gapX="gap-x-6" gapY="gap-y-6">
            <Card>
                <Block textAlignment="text-center">
                        <button 
                            onClick={ handleIgDataPull }
                            className="bg-white-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
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
        </ColGrid> */}


    </div> 


    )

}

export default IntegrationActions;