'use client';

import { Json } from "aws-sdk/clients/robomaker";
import toast, { Toaster } from 'react-hot-toast'
import { useState } from 'react';
import ResultsCategory from './resultsCategoryOld';
import ResultsCategoryComponent from './resultsCategory';
import { useRouter } from 'next/router';

interface UserMedia {
    users: User[];
    cognitions: Cognition[];
  }

interface User {
    media_uid: string;
    medial_url: string;
    viewable: boolean;
}

interface Cognition {
    model: string;
    modelsubtype: string;
    output: Json;
    outputcleaned: UseroutputCleaned;
    mediaId: string; 
}

interface UseroutputCleaned {
    binary: {
        binary: string;
    };
    category: {
        Alcohol: Boolean;
        Drugs: Boolean;
        'Explicit Nudity': Boolean;
        Gambling: Boolean;
        'Hate Symbols': Boolean;
        'Rude Gestures': Boolean;
        Suggestive: Boolean;
        Tabacco: Boolean;
        Violence: Boolean;
        'Visually Disturbing': Boolean;
    };
    numeric: {
        Alcohol: number;
        Drugs: number;
        'Explicit Nudity': number;
        Gambling: number;
        'Hate Symbols': number;
        'Rude Gestures': number;
        Suggestive: number;
        Tabacco: number;
        Violence: number;
        'Visually Disturbing': number;
    };        
}



export default function ImageDetailsTable(users: UserMedia) {

    // console.log('users from client side: ', users);
    // console.log('cognitions from client side: ', users.cognitions[0]);
    
    const softdeleteImage = async (media_uid: string) => {
        const bodySend = {
            image_uid: media_uid
        }
        console.log('Soft Delete Image: ', media_uid);
        toast.promise(
            fetch(`/api/images/view-off`, {
              method: 'POST',
              body: JSON.stringify(bodySend),
              headers: {
                'Content-Type': 'application/json',
              },
            }),
            {
              loading: 'Checking image...',
              success: 'Image is ready for processing!🎉',
              error: `Something happened with that image 😥 Please try again`,
            },
          )
    }

return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                {/* <h3 className="text-base font-semibold leading-6 text-gray-900">Post Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Content details and meta data.</p> */}
                {/* center image */}
                <div className="flex justify-center">
                    <img 
                        src={users?.users[0]?.medial_url} 
                        className='w-100 h-80 rounded-tl-3xl object-cover border-solid border-4 border-grey-500' 
                        alt="Image" 
                    />
                </div>
                <div className="mt-5 mb-5"> 
                    <ResultsCategoryComponent 
                            modelmetadata={JSON.stringify(users?.cognitions[0]?.output)}
                            modelcleandata={JSON.stringify(users?.cognitions[0]?.outputcleaned)}
                            modelversion={users?.cognitions[0]?.model}
                            modelsubtype={users?.cognitions[0]?.modelsubtype}
                            imageuid={users?.users[0]?.media_uid}
                            categoryName1="Explicit Nudity" 
                            categoryScore1={users?.cognitions[0]?.outputcleaned?.numeric?.['Explicit Nudity']} 
                            categoryName2="Drug Content" 
                            categoryScore2={users?.cognitions[0]?.outputcleaned?.numeric?.['Drugs']} 
                            categoryName3="Violence"
                            categoryScore3={users?.cognitions[0]?.outputcleaned?.numeric?.['Violence']}
                            categoryName4="Visually Disturbing"
                            categoryScore4={users?.cognitions[0]?.outputcleaned?.numeric?.['Visually Disturbing']}
                            categoryName5="Hate Symbols"
                            categoryScore5={users?.cognitions[0]?.outputcleaned?.numeric?.['Hate Symbols']}
                            categoryName6="Suggestive Content"
                            categoryScore6={users?.cognitions[0]?.outputcleaned?.numeric?.['Suggestive']}
                            categoryName7="Tabacco"
                            categoryScore7={users?.cognitions[0]?.outputcleaned?.numeric?.['Tabacco']}
                            categoryName8="Alcohol Content"
                            categoryScore8={users?.cognitions[0]?.outputcleaned?.numeric?.['Alcohol']}
                            categoryName9="Gambling"
                            categoryScore9={users?.cognitions[0]?.outputcleaned?.numeric?.['Gambling']}
                            categoryName10="Rude Gestures"
                            categoryScore10={users?.cognitions[0]?.outputcleaned?.numeric?.['Rude Gestures']}
                        />
                </div>

            </div>






            {/* <div className="border-t border-gray-200">
                <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Contains NSFW content?</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{users?.cognitions[0]?.outputcleaned.binary.binary}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Viewable on dashboard?</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {users.users[0]?.viewable === true ? (
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1">
                                Yes
                            </span>
                        ) : (
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
                                No
                            </span>
                        )}
                    </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Image UID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{users?.users[0]?.media_uid}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Media URL</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {users?.users[0]?.medial_url}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Model Version</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> 
                        {users?.cognitions[0]?.model && (
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 uppercase last:mr-0 mr-1">
                                {users?.cognitions[0]?.model}   
                            </span>
                        )}
                    </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Model Output</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> 
                        {users?.cognitions[0]?.modelsubtype && (
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1">
                                {users?.cognitions[0]?.modelsubtype}
                            </span>
                        )}
                    </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Model Meta Data</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {JSON.stringify(users?.cognitions[0]?.output)} </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Model Meta Data Clean</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {JSON.stringify(users?.cognitions[0]?.outputcleaned)} </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <ResultsCategory categoryName="Explicit Nudity" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Explicit Nudity']} />
                        <ResultsCategory categoryName="Drug Content" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Drugs']} />
                        <ResultsCategory categoryName="Violence" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Violence']} />
                        <ResultsCategory categoryName="Visually Disturbing" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Visually Disturbing']} />
                        <ResultsCategory categoryName="Hate Symbols" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Hate Symbols']} />
                        <ResultsCategory categoryName="Suggestive Content" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Suggestive']} />
                        <ResultsCategory categoryName="Tabacco" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Tabacco']} />
                        <ResultsCategory categoryName="Alcohol Content" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Alcohol']} />
                        <ResultsCategory categoryName="Gambling" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Gambling']} />
                        <ResultsCategory categoryName="Rude Gestures" categoryScore={users?.cognitions[0]?.outputcleaned?.numeric?.['Rude Gestures']} />
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Take a Action</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                            <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 w-0 flex-1 truncate">If you want to remove the image...</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <button 
                                onClick={() => softdeleteImage(users?.users[0]?.media_uid)}
                                className="font-medium text-indigo-600 hover:text-indigo-500" 
                                >
                                    DELETE
                            </button>
                        </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                            <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 w-0 flex-1 truncate">If you want to re-run the content moderation...</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">RE-RUN ANALYSIS</a>
                        </div>
                        </li>
                    </ul>
                    </dd>
                </div>
                </dl>
            </div> */}




            
        </div>
    </main>

)
}