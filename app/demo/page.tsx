import {
    Text,
    ColGrid,
    Title,
  } from '@tremor/react';

import Instructions from './instructions';
import Image from './imageUpload';
import { Analysis } from './analysis';
import { DummyData } from './dummyData';

export default function DemoPage() {
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
              <Image />
            </div>
            <div>
              <h2 className="text-lg font-bold">3. Results</h2>
                <Analysis 
                  id={DummyData[0].id}
                  imageUrl={DummyData[0].imageUrl}
                  imageName="Test File"
                  imageTimeStamp="2021-08-01T00:00:00.000Z"
                  totalScore={DummyData[0].totalScore}
                  subscoreDrugs={DummyData[0].subscoreDrugs}
                  subscoreNudity={DummyData[0].subscoreNudity}
                  subscoreRacy={DummyData[0].subscoreRacy}
                  />            
            </div>
          </div>
        </div>



        



        {/* <ColGrid numColsSm={2} numColsLg={2} gapX="gap-x-6" gapY="gap-y-6" marginTop='mt-8'>
        </ColGrid> */}
      </main>
    )
}
