'use client';


import {
    Text,
    ColGrid,
    Title,
  } from '@tremor/react';

import React, { useState } from 'react';
import Instructions from './componentInstructions';
import ImageUpload from './componentUploader';
import DisplayResults2 from './componentsResults2';
import { CognitionResults } from './dataTypes';


export default function DemoPage() {

  const [results, setResults] = useState<CognitionResults | null>(null);

  const handleResults = async (data: CognitionResults) => {
    console.log('Captured results: ', JSON.stringify(data))
    setResults(data);
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
                {results && <DisplayResults2 results={results} />}
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
