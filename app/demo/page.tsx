'use client';


import {
    Text,
    ColGrid,
    Title,
  } from '@tremor/react';

import React, { useState } from 'react';
import Instructions from './instructions';
// import Image from './imageUploadCard';
// import { Analysis } from './analysisCard';
// import { DummyData } from './dummyData';
import Image2 from './imageUploadCard2';
import Display from './displayCard';
import { CognitionResults } from './apiAmazon';


export default function DemoPage() {

  const [results, setResults] = useState<CognitionResults | null>(null);

  const handleResults = async (data: CognitionResults) => {
    setResults(data);
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
              {/* <Image /> */}
              {/* <Image2 onResults={handleResults}/> */}
              <Image2 onResults={handleResults} />
              {/* {!results && <Image2 onResults={handleResults} />} */}
              {/* {!results && <Image2 onResults={handleResults} />} */}
            </div>
            <div>
              <h2 className="text-lg font-bold">3. Results</h2>
                {results && <Display results={results} />}
            </div>
          </div>
        </div>
      </main>
    )
}
