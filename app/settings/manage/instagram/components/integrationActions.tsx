'use client';

import InstagramStreamer from './streamerInstagram';
import CognitionStreamer from './streamerCognition';

type igUserFields = {
    iguserid: string;
    igusertoken: string;
    currentuserid: string;
};

interface StreamChunk {
    progressStep: number;
  }

const IntegrationActions = ({ iguserid, igusertoken, currentuserid }: igUserFields) => {

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

            <li className="mb-10 ml-6"> 
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <svg aria-hidden="true" className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="font-medium leading-tight">1. Retrieve</h3>
                <p className="text-sm">Get your your IG posts...</p>
                <InstagramStreamer 
                    userIguserId = {iguserid}
                    userIguserToken = {igusertoken}
                    userCurrentuserId = {currentuserid}
                />
            </li>

            <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="font-medium leading-tight">2. Analyze</h3>
                <p className="text-sm">Click here to begin the processing of your IG content</p>
                <CognitionStreamer
                userCurrentuserId = {currentuserid}
                />
                                
            </li>

            <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                    <svg aria-hidden="true" className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="font-medium leading-tight">3. Report</h3>
                <p className="text-sm">Click here to generate a summary report of your IG content</p>
            </li>

            <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="font-medium leading-tight">4. SMS alerts</h3>
                <p className="text-sm">Setup custom SMS alerts for future flagged content</p>
            </li>




        </ol>
    </div> 
    )

}

export default IntegrationActions;