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
  const [uuid, setUuid] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const handleResults = async (data: CognitionResults, url: string, uuid: string) => {
    console.log('Captured Results (page): ', JSON.stringify(data))
    console.log('URL is (page): ', url)
    console.log('UUID is (page): ', uuid)
    setResults(data);
    setUrl(url);
    setUuid(uuid);
  };

  const clearResults = () => {
    setResults(null);
    // reload the component ImageUpload to clear the file input
    
  };

    return(
        <main className="p-4 md:p-10 mx-auto">
        {/* <Title>Demo of Single Image Upload Content Moderation</Title>
        <Text>  
          This is a basic MVP version of only uploading a single image for content moderation.
        </Text> */}

        <div className="flex flex-col md:flex-row justify-center">
          
          {/* First Column */}
          <div className="bg-white-100 p-4">
            {/* <h2 className="text-lg font-bold">1. Instructions</h2> */}
            
          </div>

          {/* Second Column */}
          <div className="bg-grey-100 p-4">
            {/* <div className="mb-8"> */}
              {/* <h2 className="text-lg font-bold">2. Upload</h2> */}
              <div>
                <Instructions />
              </div>
              <div className="mt-5">
                <ImageUpload onResults={handleResults} />
              </div>
            {/* </div> */}
            <div>
              {/* <h2 className="text-lg font-bold">3. Results</h2> */}
                {results && <DisplayResults results={results} url={url} uuid={uuid} />}
                {results && 
                  <button
                    type="button"
                    className={`my-4 capitalize bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-900 animate-pulse`}
                    onClick={clearResults}
                  >
                  Clear Output
                </button>
                }
            </div>
          </div>

          
        </div>
      </main>
    )
}
