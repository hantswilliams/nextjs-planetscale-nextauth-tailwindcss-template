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

interface StreamChunk {
    progressStep: number;
  }

const IntegrationActions = ({ iguserid, igusertoken, currentuserid }: igUserFields) => {

    const [userIguserId, setUserIguserId] = useState<string>('');
    const [userIguserToken, setUserIguserToken] = useState<string>('');
    const [userCurrentuserId, setUserCurrentuserId] = useState<string>('');

    const [buttonStatusStage1, setButtonStatusStage1] = useState<'idle' | 'loading' | 'success'>('idle');
    const [buttonStatusStage2, setButtonStatusStage2] = useState<'idle' | 'loading' | 'success'>('idle');

    const [igData, setIgData] = useState<any>([]);
    const [igDataLength, setIgDataLength] = useState<number>(0);

    // const [igProgressPercentage, setIgProgressPercentage] = useState<number>();
    const [igProgressPercentage, setIgProgressPercentage] = useState<StreamChunk[]>([]);
    const [cognitionProgressPercentage, setCognitionProgressPercentage] = useState<StreamChunk[]>([]);

    const [stage1, setStage1] = useState<'idle' | 'success'>('idle');
    const [stage1Messages, setStage1Messages] = useState<String>("");
    const [stage2, setStage2] = useState<'idle' | 'success'>('idle');
    const [stage2Messages, setStage2Messages] = useState<String>("");
    const [stage3, setStage3] = useState<'idle' | 'success'>('idle');
    const [stage3Messages, setStage3Messages] = useState<String>("");
    const [stage4, setStage4] = useState<'idle' | 'success'>('idle');
    const [stage4Messages, setStage4Messages] = useState<String>("");

    console.log('from action page: iguserid: ', iguserid)
    console.log('from action page: igusertoken: ', igusertoken)
    console.log('from action page: currentuserid: ', currentuserid)

    useEffect(() => {
        setUserIguserId(iguserid);
        setUserIguserToken(igusertoken);
        setUserCurrentuserId(currentuserid);
    }, [iguserid, igusertoken, currentuserid])

    const handleIgDataPullv2 = async () => {
        console.log('handleIgDataPull clicked')
        console.log('parameters: ', iguserid, igusertoken, currentuserid)

        setButtonStatusStage1('loading'); // set button status to 'loading'
        const response = await fetch('/api/retrieve/instagram/get-streaming/', {
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
            const chunkValue = decoder.decode(value, { stream: !done }); // Add the stream option
            setStage1Messages((prev) => prev + chunkValue);

            // if json value has IGretrievedMedia, set igData to that value
            if (chunkValue.includes('IGretrievedMedia')) {
                const jsonValue = JSON.parse(chunkValue);
                setIgDataLength(jsonValue.IGretrievedMedia);
            }

            // if json value has progress, set setIgProgressPercentage to that value
            if (chunkValue.includes('progressStep')) {
                console.log('chunkValue Progress: ', chunkValue)
                const handleStreamChunkIg = (chunkValue: string) => {
                    try {
                      const jsonData = JSON.parse(chunkValue);
                
                      if (jsonData.progressStep !== undefined) {
                        const progressStep = jsonData.progressStep;
                
                        setIgProgressPercentage((prevProgress) => [
                          ...prevProgress,
                          { progressStep },
                        ]);
                      }
                    } catch (e) {
                      console.error('Invalid JSON received from stream', e);
                    }
                  };
                  handleStreamChunkIg(chunkValue);
            }
        }
        setIgData('completed')
        setButtonStatusStage1('success'); // set button status to 'success'
        setStage1('success'); // set stage 1 to 'success'
    }


    const handleCognitionRequest = async () => {
        console.log('handleCognitionRequest clicked, parameters: ', currentuserid)
        setButtonStatusStage2('loading'); // set button status to 'loading'

        const response = await fetch(`/api/cognitions/instagram/analyze`, {
            method: 'POST',
            body: JSON.stringify({
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
            const chunkValue = decoder.decode(value, { stream: !done }); // Add the stream option
            setStage2Messages((prev) => prev + chunkValue);

            // if json value has progress, set setCognitionProgressPercentage to that value
            if (chunkValue.includes('progressStep')) {
                console.log('chunkValue Progress Cognition: ', chunkValue)
                const handleStreamChunkCognition = (chunkValue: string) => {
                    try {
                      const jsonData = JSON.parse(chunkValue);
                
                      if (jsonData.progressStep !== undefined) {
                        const progressStep = jsonData.progressStep;
                
                        setCognitionProgressPercentage((prevProgress) => [
                          ...prevProgress,
                          { progressStep },
                        ]);
                      }
                    } catch (e) {
                      console.error('Invalid JSON received from stream', e);
                    }
                  };
                  handleStreamChunkCognition(chunkValue);
            }
        }

        // at the end...set things to complete
        console.log('...stage 2 cognition complete at client side')
        setButtonStatusStage2('success'); // set button status to 'success'
        setStage2('success'); // set stage 2 to 'success'

    }

    return  (
        <div className="mt-5 relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
        <div className="mt-2 mb-1 ">
            <h1 className="mb-5 sm:text-xl text-xl max-w-[708px] font-bold text-slate-900">
            Instagram Setup 
            </h1>
            <div className="grid grid-cols-2 gap-4 px-2 w-full">
            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            </div>
        </div>
        </div> 

        <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">  

            {/* STEP 1 STEP 1 STEP 1 STEP 1 STEP 1  */}
            <li className="mb-10 ml-6"> 
                {/* This first part is for the top left icon */}
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
                {/* This part here is for the button action statuses  */}
                <button onClick={handleIgDataPullv2} disabled={buttonStatusStage1 === 'loading' || buttonStatusStage1 === 'success'} className={`mt-2 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${buttonStatusStage1 === 'success' ? 'bg-green-400 cursor-default' : 'bg-slate-600 hover:bg-slate-500'}`}>
                    {buttonStatusStage1 === 'idle' && 'Retrieve'}
                    {buttonStatusStage1 === 'loading' && 
                        <div className="flex items-center"> <ArrowPathIcon className="animate-spin h-5 w-5 mr-2"/> 
                            {/* {igProgressPercentage.map((progress, index) => (
                                <div key={index}>
                                Progress step: {progress.progressStep}
                                </div>
                            ))} */}
                        </div> 
                    }
                    {buttonStatusStage1 === 'success' && `IG posts total: ${igDataLength} (only 5 received for demo)`} 
                </button>

                {stage1Messages && (
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <TextBlock text={stage1Messages} />
                    </div>
                )}
            </li>


            {/* STEP 2 STEP 2 STEP 2 STEP 2 */}
            <li className="mb-10 ml-6">
                {/* This first part is for the top left icon */}
                {stage2 === 'success' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                        <svg aria-hidden="true" className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                {stage2 === 'idle' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                <h3 className="font-medium leading-tight">2. Analyze</h3>
                <p className="text-sm">Click here to begin the processing of your IG content</p>
                {/* This part here is for the button action statuses  */}
                <button
                    onClick={handleCognitionRequest}
                    disabled={
                        buttonStatusStage2 === 'loading' ||
                        buttonStatusStage2 === 'success' ||
                        buttonStatusStage1 === 'idle' ||
                        buttonStatusStage1 === 'loading'
                    }
                    className={`mt-2 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                        buttonStatusStage2 === 'success'
                        ? 'bg-green-400 cursor-default'
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    >
                    {buttonStatusStage1 !== 'success' && 'Available after IG retrieval'}
                    {buttonStatusStage1 === 'success' && buttonStatusStage2 === 'idle' && 'Perform cognition'}
                    {buttonStatusStage2 === 'loading' && 
                        <div className="flex items-center"> <ArrowPathIcon className="animate-spin h-5 w-5 mr-2"/> 
                            {/* {cognitionProgressPercentage.map((progress, index) => (
                                <div key={index}>
                                Progress step: {progress.progressStep}
                                </div>
                            ))} */}
                        </div> 
                    }
                    {buttonStatusStage1 === 'success' && buttonStatusStage2 === 'success' && 'Cognition completed (only 5 analyzed for demo)'}
                </button>
                {stage2Messages && (
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <TextBlock text={stage2Messages} />
                    </div>
                )}
            </li>









            <li className="mb-10 ml-6">
                {/* This first part is for the top left icon */}
                {stage3 === 'success' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                        <svg aria-hidden="true" className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                {stage3 === 'idle' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                <h3 className="font-medium leading-tight">3. Report</h3>
                <p className="text-sm">Click here to generate a summary report of your IG content</p>
            </li>


            <li className="ml-6">
                {/* This first part is for the top left icon */}
                {stage4 === 'success' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                        <svg aria-hidden="true" className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                {stage4 === 'idle' && (
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </span>
                )}
                <h3 className="font-medium leading-tight">4. SMS alerts</h3>
                <p className="text-sm">Setup custom SMS alerts for future flagged content</p>
            </li>




        </ol>
    </div> 
    )

}

export default IntegrationActions;