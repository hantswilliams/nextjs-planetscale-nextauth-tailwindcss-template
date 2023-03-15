'use client';

import { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import TextBlock from './actionUpdates';
import { Toaster, toast } from "react-hot-toast";


type igUserFields = {
    iguserid: string;
    igusertoken: string;
    currentuserid: string;
};

const IntegrationActions = ({ iguserid, igusertoken, currentuserid }: igUserFields) => {

    const [userIguserId, setUserIguserId] = useState<string>('');
    const [userIguserToken, setUserIguserToken] = useState<string>('');
    const [userCurrentuserId, setUserCurrentuserId] = useState<string>('');

    const [buttonStatus, setButtonStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [igData, setIgData] = useState<any>([]);
    const [igDataLength, setIgDataLength] = useState<number>(0);
    const [igProgressPercentage, setIgProgressPercentage] = useState<number>(0);

    const [stage1, setStage1] = useState<'idle' | 'success'>('idle');
    const [stage1Messages, setStage1Messages] = useState<String>("");
    const [stage2, setStage2] = useState<'idle' | 'success'>('idle');
    const [stage3, setStage3] = useState<'idle' | 'success'>('idle');
    const [stage4, setStage4] = useState<'idle' | 'success'>('idle');

    console.log('from action page: iguserid: ', iguserid)
    console.log('from action page: igusertoken: ', igusertoken)
    console.log('from action page: currentuserid: ', currentuserid)

    useEffect(() => {
        setUserIguserId(iguserid);
        setUserIguserToken(igusertoken);
        setUserCurrentuserId(currentuserid);
    }, [iguserid, igusertoken, currentuserid])

    // // This below version is depcreated for the new streaming version
    // const handleIgDataPull = () => {
    //     console.log('handleIgDataPull clicked')
    //     setButtonStatus('loading'); // set button status to 'loading'

    //     fetch('/api/retrieve/instagram/get-streaming', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             iguserId: iguserid,
    //             iguserToken: igusertoken,
    //             currentuserid: currentuserid
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         setIgData(data?.ig_media)
    //         setButtonStatus('success'); // set button status to 'success'
    //         setStage1('success'); // set stage 1 to 'success'
    //     })
    // }

    const handleIgDataPullv2 = async () => {
        console.log('handleIgDataPull clicked')
        console.log('parameters: ', iguserid, igusertoken, currentuserid)
        setButtonStatus('loading'); // set button status to 'loading'
        const response = await fetch('/api/retrieve/instagram/get-streaming', {
            method: 'POST',
            body: JSON.stringify({
                userIguserId,
                userIguserToken,
                userCurrentuserId
            }),
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
        return;
        }

        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setStage1Messages((prev) => prev + chunkValue);

            // if json value has IGretrievedMedia, set igData to that value
            if (chunkValue.includes('IGretrievedMedia')) {
                const jsonValue = JSON.parse(chunkValue);
                setIgDataLength(jsonValue.IGretrievedMedia);
            }

            // // if json value has progress, set setIgProgressPercentage to that value
            // if (chunkValue.includes('progressStep')) {
            //     const jsonValue = JSON.parse(chunkValue);
            //     setIgProgressPercentage(jsonValue.progressStep);
            // }

        }
        setIgData('completed')
        setButtonStatus('success'); // set button status to 'success'
        setStage1('success'); // set stage 1 to 'success'
    }



    return  (
        <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
        <div className="mt-2 mb-1 ">
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
                                
                <button onClick={handleIgDataPullv2} disabled={buttonStatus === 'loading' || buttonStatus === 'success'} className={`mt-2 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${buttonStatus === 'success' ? 'bg-green-400 cursor-default' : 'bg-slate-600 hover:bg-slate-500'}`}>
                    {buttonStatus === 'idle' && 'Retrieve'}
                    {buttonStatus === 'loading' && <ArrowPathIcon className="animate-spin h-5 w-5 mr-2"> {igProgressPercentage} </ArrowPathIcon> }
                    {buttonStatus === 'success' && `IG posts total: ${igDataLength}`} 
                </button>

                {stage1Messages && (
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <TextBlock text={stage1Messages} />
                    </div>
                )}





















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
    </div> 
    )

}

export default IntegrationActions;