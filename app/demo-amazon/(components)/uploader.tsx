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
    onResults: (data: CognitionResults, url: string, uuid: string) => void;
};

export const ImageUpload: React.FC<Props> = ({ onResults }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [url, setUrl] = useState<string>('');
  const [uuid, setUuid] = useState<string>('');
  const [cognitionResults, setCognitionResults] = useState<CognitionResults | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('User has requested to see results', data)
    if (!url) {
      console.error('No URL found')
      return;
    }

    try {
      const results = await fetchCognitionResults(url, uuid);
      setCognitionResults(results);
      onResults(results, url, uuid); // pass the results back to parent component
    } catch (error) {
      console.error(error);
    }
  }

  // clear the file input
  const clearFileInput = () => {
    window.location.reload();
  }

  // Upload photo function
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return;
    console.log('uploadedPhoto: ', e.target.files[0]);
    const file = e.target.files[0];

    try {
      const data = await uploadImage(file);
      console.log('Data UUID returned from uploadImage: ', data?.fields?.media_uid_frontend);
      setUuid(data?.fields?.media_uid_frontend);
      setUrl(data.url + '/' + encodeURIComponent(file.name));
      setUploadedFile(file);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container mx-auto max-w-md py-1 bg-zinc-100 rounded-xl">
      <Toaster />
      <form className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg place-items-center content-center" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-medium my-5">Select a image</h1>
        <label className="block content-center flex justify-center items-center ml-20">
          {!uploadedFile && (
              <input
                {...register('image', { required: true })}
                onChange={uploadPhoto}
                type="file"
                accept="image/png, image/jpeg"
                name="image"
              />
              
          )}   
        </label>


        {errors.image && <span className="text-red-500">Image is required</span>}

        {url && (
          <button
            type="submit"
            className={`my-1 capitalize bg-slate-900 text-white font-medium py-2 px-4 rounded-md hover:bg-slate-600 animate-pulse`}
          >
              <span>Get your results!</span>
          </button>
        )}

        {uploadedFile && (
          <button
            className="my-1 capitalize bg-gray-500 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-700"
            onClick={() => {
              clearFileInput();
            }}
          >
            Clear Uploaded File
          </button>
        )}

      </form>
    </div>
  )
}

export default ImageUpload

