'use client';

// pages/admin.tsx
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'


type FormValues = {
  image: FileList;
}

type CognitionResults = {
  binary: BinaryCogResults;
  category:CategoryCogResults;
  numeric: NumericCogResults;
}

type BinaryCogResults = {
  binary: String
}

type CategoryCogResults = {
  Alcohol: Boolean;
  Drugs: Boolean;
  ExplicitNudity: Boolean;
  Gambling: Boolean;
  HateSymbols: Boolean;
  RudeGestures: Boolean;
  Suggestive: Boolean;
  Tabacco: Boolean;
  Violence: Boolean;
  VisuallyDisturbing: Boolean;
}

type NumericCogResults = {
  Alcohol: Number;
  Drugs: Number;
  ExplicitNudity: Number;
  Gambling: Number;
  HateSymbols: Number;
  RudeGestures: Number;
  Suggestive: Number;
  Tabacco: Number;
  Violence: Number;
  VisuallyDisturbing: Number;
}


const Image = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  // Upload photo function
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return
    console.log('uploadedPhoto: ', e.target.files[0])
    const file = e.target.files[0]
    const filename = encodeURIComponent(file.name)
    const res = await fetch(`/api/upload-image?file=${filename}`)
    const data = await res.json()
    const formData = new FormData()

    // @ts-ignore
    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value)
    })
    console.log(data)

    toast.promise(
      fetch(data.url, {
        method: 'POST',
        body: formData,
      }),
      {
        loading: 'Checking image...',
        success: 'Image is ready for processing!🎉',
        error: `Something happened with that image 😥 Please try again`,
      },
    )
    console.log(data)
    console.log('Data URL: ', data.url + '/' + filename)

    const response = await fetch('http://localhost:5005/cognition/amazon/moderation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: data.url + '/' + filename }),
    })
    const result = await response.json()
    console.log('Cognition Result: ', result)    
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('User has requested to see results', data)
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

        {/* if image has not been selected, disable button */}
        {errors.image && <span className="text-red-500">Image is required</span>}
        <button
          type="submit"
          className={`my-4 capitalize bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-900 animate-pulse`}
        >
            <span>Get your results!</span>
        </button>

      </form>
    </div>
  )
}

export default Image

