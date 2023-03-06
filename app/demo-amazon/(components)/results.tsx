'use client';

import React from 'react';
import { CognitionResults } from '../typesAmazon';
import ResultsCategory from './resultsCategory';
import AccuracyCapture from './resultsAccuracy';

type Props = {
  results: CognitionResults;
  url: string;
}

const DisplayResults: React.FC<Props> = ({ results, url }) => {
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
            <img src={url} className={`${
                results.analytics.totalConfidence >= 10
                ? 'w-full border-solid border-4 border-red-500'
                : results.analytics.totalConfidence >= 3 && results.analytics?.totalConfidence <= 9
                ? 'w-full border-solid border-4 border-yellow-500'
                : 'w-full border-solid border-4 border-green-500'
            }`} alt="Image" />

            {/* add in the imageName as small text directly under the image */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2"> {results.analytics?.dateProcessed} </div>
                <div className="text-gray-700 text-base"> ID for troubleshooting: {results.analytics?.imageUUID} </div>
            </div>

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
                        style={{ width: `${results.analytics.totalConfidence * 100}%` }}
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
                <div className="font-bold text-xl mb-2 mt-2">Concern level: {results.analytics.totalConfidence / 100} </div>


            
                {/* display highest resposnes first */}
                {/* {results?.analytics?.numeric?.['Explicit Nudity'] > results?.analytics?.numeric?.['Drugs'] && (
                    <ResultsCategory categoryName="Explicit Nudity" categoryScore={results?.analytics?.numeric?.['Explicit Nudity']} />
                )}
                {results?.analytics?.numeric?.['Drugs'] > results?.analytics?.numeric?.['Violence'] && (
                    <ResultsCategory categoryName="Drug Content" categoryScore={results?.analytics?.numeric?.['Drugs']} />
                )}
                {results?.analytics?.numeric?.['Violence'] > results?.analytics?.numeric?.['Visually Disturbing'] && (
                    <ResultsCategory categoryName="Violence" categoryScore={results?.analytics?.numeric?.['Violence']} />
                )}
                {results?.analytics?.numeric?.['Visually Disturbing'] > results?.analytics?.numeric?.['Hate Symbols'] && (
                    <ResultsCategory categoryName="Visually Disturbing" categoryScore={results?.analytics?.numeric?.['Visually Disturbing']} />
                )}
                {results?.analytics?.numeric?.['Hate Symbols'] > results?.analytics?.numeric?.['Suggestive'] && (
                    <ResultsCategory categoryName="Hate Symbols" categoryScore={results?.analytics?.numeric?.['Hate Symbols']} />
                )}
                {results?.analytics?.numeric?.['Suggestive'] > results?.analytics?.numeric?.['Tabacco'] && (
                    <ResultsCategory categoryName="Suggestive Content" categoryScore={results?.analytics?.numeric?.['Suggestive']} />
                )}
                {results?.analytics?.numeric?.['Tabacco'] > results?.analytics?.numeric?.['Alcohol'] && (
                    <ResultsCategory categoryName="Tabacco" categoryScore={results?.analytics?.numeric?.['Tabacco']} />
                )}
                {results?.analytics?.numeric?.['Alcohol'] > results?.analytics?.numeric?.['Gambling'] && (
                    <ResultsCategory categoryName="Alcohol Content" categoryScore={results?.analytics?.numeric?.['Alcohol']} />
                )}
                {results?.analytics?.numeric?.['Gambling'] > results?.analytics?.numeric?.['Explicit Nudity'] && (
                    <ResultsCategory categoryName="Gambling" categoryScore={results?.analytics?.numeric?.['Gambling']} />
                )}
                {results?.analytics?.numeric?.['Rude Gestures'] > results?.analytics?.numeric?.['Explicit Nudity'] && (
                    <ResultsCategory categoryName="Rude Gestures" categoryScore={results?.analytics?.numeric?.['Rude Gestures']} />
                )} */}
                    
                
                <ResultsCategory categoryName="Explicit Nudity" categoryScore={results?.analytics?.numeric?.['Explicit Nudity']} />
                <ResultsCategory categoryName="Drug Content" categoryScore={results?.analytics?.numeric?.['Drugs']} />
                <ResultsCategory categoryName="Violence" categoryScore={results?.analytics?.numeric?.['Violence']} />
                <ResultsCategory categoryName="Visually Disturbing" categoryScore={results?.analytics?.numeric?.['Visually Disturbing']} />
                <ResultsCategory categoryName="Hate Symbols" categoryScore={results?.analytics?.numeric?.['Hate Symbols']} />
                <ResultsCategory categoryName="Suggestive Content" categoryScore={results?.analytics?.numeric?.['Suggestive']} />
                <ResultsCategory categoryName="Tabacco" categoryScore={results?.analytics?.numeric?.['Tabacco']} />
                <ResultsCategory categoryName="Alcohol Content" categoryScore={results?.analytics?.numeric?.['Alcohol']} />
                <ResultsCategory categoryName="Gambling" categoryScore={results?.analytics?.numeric?.['Gambling']} />
                <ResultsCategory categoryName="Rude Gestures" categoryScore={results?.analytics?.numeric?.['Rude Gestures']} />

            </div>

            {/* this is the div tag for the analysis feedback */}
            <AccuracyCapture />


        </div>

      </div>


    </div>
  );
};

export default DisplayResults;
