'use client';

// pages/admin.tsx
import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { fetchCognitionResults } from '../cognition';
import { uploadImage } from '../s3';
import { CognitionResults } from '../typesAmazon';

type FormValues = {
  image: FileList;
}

type Props = {
    onResults: (data: CognitionResults, url: string) => void;
};

export const ImageUpload: React.FC<Props> = ({ onResults }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [url, setUrl] = useState<string>('');
  const [cognitionResults, setCognitionResults] = useState<CognitionResults | null>(null);

  // Upload photo function
  const clearData = () => {
    setUrl('');
    setCognitionResults(null);
    console.log('data cleared')
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('User has requested to see results', data)
    if (!url) {
      console.error('No URL found')
      return;
    }

    try {
      const results = await fetchCognitionResults(url);
      setCognitionResults(results);
      onResults(results, url); // pass the results back to parent component
    } catch (error) {
      console.error(error);
    }
  }

  // Upload photo function
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return;
    console.log('uploadedPhoto: ', e.target.files[0]);
    const file = e.target.files[0];

    try {
      const data = await uploadImage(file);
      setUrl(data.url + '/' + encodeURIComponent(file.name));
    } catch (error) {
      console.error(error);
    }


    
  }

  return (
    <div className="container mx-auto max-w-md py-1">
      <Toaster />
      <form className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-medium my-5">Select a single image</h1>
        <label className="block">
          <span className="text-gray-700">Upload a .png or .jpg image (max 1MB).</span>
          <input
            {...register('image', { required: true })}
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
            name="image"
          />
        </label>

        {/* {url && <p>Image URL: {url}</p>} */}

        {/* if image has not been selected, disable button */}
        {errors.image && <span className="text-red-500">Image is required</span>}
        <button
          type="submit"
          className={`my-4 capitalize bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-900 animate-pulse`}
        >
            <span>Get your results!</span>
        </button>

        {/* {cognitionResults && (
          <>
            <h2>Cognition Results:</h2>
            <pre>{JSON.stringify(cognitionResults, null, 2)}</pre>
            <button
              type="button"
              className={`my-4 capitalize bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-900 animate-pulse`}
              onClick={clearData}
            >
              Clear Data
            </button>
          </>
        )} */}

      </form>
    </div>
  )
}

export default ImageUpload

