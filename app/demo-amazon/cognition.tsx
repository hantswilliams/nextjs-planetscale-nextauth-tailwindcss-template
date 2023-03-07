import { CognitionResults } from './typesAmazon';
import toast, { Toaster } from 'react-hot-toast'
import { queryBuilder } from '../../lib/planetscale';

export const fetchCognitionResults = async (url: string, uuid: string): Promise<CognitionResults> => {
    console.log('fetchCognitionResults parameters: ', url, uuid)
    console.log('process.env.DEV_BACKEND_COGNITION: ', process.env.NEXT_PUBLIC_DEV_BACKEND_COGNITION)
    const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_BACKEND_COGNITION}/amazon/moderation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url }),
    })
    const result = await response.json()
    console.log('Cognition Result: ', result)

    // Save the cognition metadata results to the database
    const cognitionMetaData = {
      cognitionResults: result,
      url: url,
      uuid: uuid
    }

    toast.promise(
      fetch(`/api/images/upload-cognition-metadata`, {
        method: 'POST',
        body: JSON.stringify(cognitionMetaData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        loading: 'Now about to load cognition meta data...',
        success: 'Image cognition meta data has finsihed uploading!🎉',
        error: `Something happened with that cognition metadata 😥 Please try again`,
      },
    )  

    return result;
  };
  