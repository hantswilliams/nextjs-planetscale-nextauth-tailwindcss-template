'use client';

import { fetchCognitionResults } from '../../../demo-amazon/cognition';
import { useState } from 'react';

type ImageProps = {
    imageuid: string;
    medial_url: string;
};

const ResultsNoCognition = ({ imageuid, medial_url }: ImageProps) => {

    const [Loading, setLoading] = useState<boolean>(false);

    const performCognition = async (imageuid: string, medial_url: string) => {
        setLoading(true);
        console.log('performing cognition for: ', imageuid);
        console.log('medial_url: ', medial_url);
        try {
            const results = await new Promise((resolve, reject) => {
              fetchCognitionResults(medial_url, imageuid)
                .then((data) => resolve(data))
                .catch((error) => reject(error));
            });
            console.log('results: ', results);
          } catch (error) {
            console.error(error);
          } 
        window.location.reload();
    }

    return(
        
        // if loading, show loading spinner
        Loading ? (
            <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center">
                    <p> Performing Cognition for: </p>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 uppercase last:mr-0 mr-1 mt-1">
                            {imageuid}
                    </span>
                    <button disabled type="button" className="mt-5 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                        </svg>
                        Performing...
                    </button>
                        
                </div>
            </div>
        ) : (

        <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center">
                <p> No cognition performed for: </p>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 uppercase last:mr-0 mr-1 mt-1">
                        {imageuid}
                </span>
                <button 
                    className="bg-slate-900 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => performCognition(imageuid, medial_url)}
                >
                    Perform Cognition
                </button>
            </div>
        </div>
        )

    )
}

export default ResultsNoCognition;