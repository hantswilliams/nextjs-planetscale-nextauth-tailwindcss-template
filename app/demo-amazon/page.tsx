'use client';


import {
    Text,
    ColGrid,
    Title,
  } from '@tremor/react';

import React, { useState } from 'react';
import Instructions from './(components)/instructions';
import ImageUpload from './(components)/uploader';
import DisplayResults from './(components)/results';
import { CognitionResults } from './typesAmazon';

export default function DemoPage() {

  const [results, setResults] = useState<CognitionResults | null>(null);
  const [url, setUrl] = useState<string>('');

  const handleResults = async (data: CognitionResults, url: string) => {
    console.log('Captured Results: ', JSON.stringify(data))
    console.log('URL is: ', url)
    setResults(data);
    setUrl(url);
  };

  const clearResults = () => {
    setResults(null);
  };

    return(
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Demo of Single Image Upload Content Moderation</Title>
        <Text>  
          This is a basic MVP version of only uploading a single image for content moderation.
        </Text>


        <div className="flex flex-row mt-5">
          {/* First Column */}
          <div className="flex-1 bg-gray-200 p-4">
            <h2 className="text-lg font-bold">1. Instructions</h2>
            <Instructions />
          </div>

          {/* Second Column */}
          <div className="flex-1 bg-gray-100 p-4">
            <div className="mb-8">
              <h2 className="text-lg font-bold">2. Upload</h2>
              <ImageUpload onResults={handleResults} />
            </div>
            <div>
              <h2 className="text-lg font-bold">3. Results</h2>
                {results && <DisplayResults results={results} url={url} />}
                {results && 
                  <button
                    type="button"
                    className={`my-4 capitalize bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-900 animate-pulse`}
                    onClick={clearResults}
                  >
                  Clear Data
                </button>
                }
            </div>
          </div>
        </div>
      </main>
    )
}
