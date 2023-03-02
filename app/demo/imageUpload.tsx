'use client';

// pages/admin.tsx
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'


type FormValues = {
  image: FileList;
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

  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('Button clicked: ', data)
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

        <button
          type="submit"
          className={`my-4 capitalize bg-purple-600 text-white font-medium py-2 px-4 rounded-md hover:bg-purple-900 animate-pulse`}
        >
            <span>Analyze</span>
        </button>
      </form>
    </div>
  )
}

export default Image

