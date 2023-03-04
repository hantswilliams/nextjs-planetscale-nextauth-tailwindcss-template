'use client';

import React from 'react';
import { CognitionResults } from './dataTypes';

type Props = {
  results: CognitionResults;
}

const DisplayResults2: React.FC<Props> = ({ results }) => {
    return (
    <div className="container mx-auto max-w-md py-1">
    {/* <div key={id} className="shadow max-w-md rounded"> */}
    <div className="shadow max-w-md rounded">

        {/* this is the top level div for the card element */}
        <div className="max-w-md mt-1 mb-3 mx-auto rounded-lg overflow-hidden shadow-xl bg-white">
            
            {/* this div section is the review tag summary right above the image */}
            <div className="flex items-center justify-between mb-2">
                <div className={`${
                    results.analytics.totalConfidence >= 10
                    ? 'bg-red-500 text-white'
                    : results.analytics.totalConfidence >= 3 && results.analytics.totalConfidence <= 9
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-500 text-white'
                } rounded-full px-3 py-1 text-sm`}>
                    {results.analytics.totalConfidence >= 3 ? (
                    <div className="flex items-center">
                        <span className="mr-2 text-sm">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.219 1.688a1.5 1.5 0 0 1 1.94 0l3.567 3.567a1.5 1.5 0 0 1 0 1.94l-9 9a1.5 1.5 0 0 1-1.94 0l-9-9a1.5 1.5 0 0 1 0-1.94l3.567-3.567z" />
                        </svg>
                        </span>
                        REVIEW
                    </div>
                    ) : (
                    <div className="flex items-center">
                        <span className="mr-2 text-sm">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
                        </svg>
                        </span>
                        SAFE
                    </div>
                    )}
                </div>
            </div>

            {/* this first part is for the image and its border color */}
            {/* <img src={imageUrl} className={`${
                results.analytics.totalConfidence >= 10
                ? 'w-full border-solid border-4 border-red-500'
                : results.analytics.totalConfidence >= 3 && results.analytics.totalConfidence <= 9
                ? 'w-full border-solid border-4 border-yellow-500'
                : 'w-full border-solid border-4 border-green-500'
            }`} alt="Image" /> */}

            {/* add in the imageName as small text directly under the image */}
            {/* <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2"> {imageName} </div>
                <div className="text-gray-700 text-base"> {imageTimeStamp} </div>
            </div> */}

            {/* this is the div section that contains the result details */}
            <div className="px-6 py-4">

                {/* this is the div tag for the SLIDER */}
                <div className="bg-gray-300 h-6 rounded-full mt-2">
                    <div
                        className={`${
                            results.analytics.totalConfidence >= 10
                            ? 'bg-red-500'
                            : results.analytics.totalConfidence >= 3 && results.analytics.totalConfidence <= 9
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        } h-full rounded-full`}
                        style={{ width: `${results.analytics.totalConfidence}%` }}
                    />
                </div>

                {/* this is the div tag for the text for the SLIDER */}
                <div className="flex justify-between items-center mb-2">
                    {/* only show the below span is total score <= 30 */}
                    {results.analytics.totalConfidence <= 8 ? (
                    <span className="text-gray-700"> ✅ Good to go </span>
                    ) : (
                    <span className="text-gray-700">  </span>
                    )}

                    {/* only show the below span is total score >= 30 */}
                    {results.analytics.totalConfidence >= 3 ? (
                    <span className="text-gray-700"> Should review ⛔ </span>
                    ) : (
                    <span className="text-gray-700">  </span>
                    )}
                </div>

                {/* div tag for the concern level */}
                <div className="font-bold text-xl mb-2 mt-2">Concern level: {results.analytics.totalConfidence}/100</div>

                {/* div tag for the explicit nudity */}
                <div className="flex flex-col mb-2">
                    <span className="text-gray-700 text-sm">Explicit Nudity: {results?.analytics?.numeric?.['Explicit Nudity'].toString()}</span>
                    <div className="flex items-center">
                    {results?.analytics?.numeric?.['Explicit Nudity'] >= 30 ? (
                        <span className="rounded-full h-4 w-4 bg-red-500"></span>
                    ) : results?.analytics?.numeric?.['Explicit Nudity'] >= 20 && results?.analytics?.numeric?.['Explicit Nudity'] <= 29 ? (
                        <span className="rounded-full h-4 w-4 bg-yellow-500"></span>
                    ) : (
                        <span className="rounded-full h-4 w-4 bg-green-500"></span>
                    )}
                    <span className="ml-2 text-gray-700">{results?.analytics?.numeric?.['Explicit Nudity'] >= 30 ? 'Very Likely' : results?.analytics?.numeric?.['Explicit Nudity'] >= 20 && results?.analytics?.numeric?.['Explicit Nudity'] <= 29 ? 'Likely' : 'Not Likely'}</span>
                    </div>
                </div>

                {/* div tag for the violent or repulsive content */}
                <div className="flex flex-col mb-2">
                    <span className="text-gray-700 text-sm">Suggestive Content: {results?.analytics?.numeric?.Suggestive}%</span>
                    <div className="flex items-center">
                    {results?.analytics?.numeric?.Suggestive >= 30 ? (
                        <span className="rounded-full h-4 w-4 bg-red-500"></span>
                    ) : results?.analytics?.numeric?.Suggestive >= 20 && results?.analytics?.numeric?.Suggestive <= 29 ? (
                        <span className="rounded-full h-4 w-4 bg-yellow-500"></span>
                    ) : (
                        <span className="rounded-full h-4 w-4 bg-green-500"></span>
                    )}
                    <span className="ml-2 text-gray-700">{results?.analytics?.numeric?.Suggestive >= 30 ? 'Very Likely' : results?.analytics?.numeric?.Suggestive >= 20 && results?.analytics?.numeric?.Suggestive <= 29 ? 'Likely' : 'Not Likely'}</span>
                    </div>
                </div>

                {/* div tag for drug content */}
                <div className="flex flex-col mb-2">
                    <span className="text-gray-700 text-sm">Drug Content: {results?.analytics?.numeric?.Drugs}%</span>
                    <div className="flex items-center">
                    {results?.analytics?.numeric?.Drugs >= 30 ? (
                        <span className="rounded-full h-4 w-4 bg-red-500"></span>
                    ) : results?.analytics?.numeric?.Drugs >= 20 && results?.analytics?.numeric?.Drugs <= 29 ? (
                        <span className="rounded-full h-4 w-4 bg-yellow-500"></span>
                    ) : (
                        <span className="rounded-full h-4 w-4 bg-green-500"></span>
                    )}
                    <span className="ml-2 text-gray-700">{results?.analytics?.numeric?.Drugs >= 30 ? 'Very Likely' : results?.analytics?.numeric?.Drugs >= 20 && results?.analytics?.numeric?.Drugs <= 29 ? 'Like' : 'Not Likely'}</span>
                    </div>
                </div>

            </div>

            {/* this is the div tag for the analysis feedback */}
            <div className="px-6 py-4 bg-gray-100">
                <span className="text-gray-700 text-sm mb-2">Overall Accuracy?</span>
                <div className="flex justify-around mt-2">
                    <span className="text-3xl">
                        <button className="bg-white-500 hover:bg-red-200 text-white font-bold py-2 px-4 rounded">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="angry" className="w-5 text-red-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm0-144c-33.6 0-65.2 14.8-86.8 40.6-8.5 10.2-7.1 25.3 3.1 33.8s25.3 7.2 33.8-3c24.8-29.7 75-29.7 99.8 0 8.1 9.7 23.2 11.9 33.8 3 10.2-8.5 11.5-23.6 3.1-33.8-21.6-25.8-53.2-40.6-86.8-40.6zm-48-72c10.3 0 19.9-6.7 23-17.1 3.8-12.7-3.4-26.1-16.1-29.9l-80-24c-12.8-3.9-26.1 3.4-29.9 16.1-3.8 12.7 3.4 26.1 16.1 29.9l28.2 8.5c-3.1 4.9-5.3 10.4-5.3 16.6 0 17.7 14.3 32 32 32s32-14.4 32-32.1zm199-54.9c-3.8-12.7-17.1-19.9-29.9-16.1l-80 24c-12.7 3.8-19.9 17.2-16.1 29.9 3.1 10.4 12.7 17.1 23 17.1 0 17.7 14.3 32 32 32s32-14.3 32-32c0-6.2-2.2-11.7-5.3-16.6l28.2-8.5c12.7-3.7 19.9-17.1 16.1-29.8z"></path>
                            </svg>
                        </button>
                    </span>
                    <span className="text-3xl">
                        <button className="bg-white-500 hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="frown" className="w-5 text-yellow-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"></path>
                            </svg>
                        </button>
                    </span>
                    <span className="text-3xl">
                        <button className="bg-white-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="meh" className="w-5 text-blue-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z"></path>
                            </svg>
                        </button>
                    </span>
                    <span className="text-3xl">
                        <button className="bg-white-500 hover:bg-green-200 text-white font-bold py-2 px-4 rounded">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="smile" className="w-5 text-green-500 mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path>
                            </svg>
                        </button>
                    </span>
                    <span className="text-3xl">
                        <button className="bg-white-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="grin-stars" className="w-5 text-green-700 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm105.6-151.4c-25.9 8.3-64.4 13.1-105.6 13.1s-79.6-4.8-105.6-13.1c-9.8-3.1-19.4 5.3-17.7 15.3 7.9 47.2 71.3 80 123.3 80s115.3-32.9 123.3-80c1.6-9.8-7.7-18.4-17.7-15.3zm-227.9-57.5c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.5 1.9-12.2-4.3-13.2l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6.1 34.9zm259.7-72.7l-34.9-5-15.5-31.6c-2.9-5.8-11-5.8-13.9 0l-15.5 31.6-34.9 5c-6.2.9-8.9 8.6-4.3 13.2l25.4 24.6-6 34.9c-1 6.2 5.4 11 11 7.9l31.3-16.3 31.3 16.3c5.6 3.1 12-1.7 11-7.9l-6-34.9 25.4-24.6c4.5-4.6 1.8-12.2-4.4-13.2z"></path>
                            </svg>
                        </button>
                    </span>
                </div>
            </div>

        </div>

      </div>


    </div>
  );
};

export default DisplayResults2;
