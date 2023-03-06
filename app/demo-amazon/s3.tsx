import toast, { Toaster } from 'react-hot-toast'

export const uploadImage = async (file: File): Promise<{fields: Record<string, string>, url: string}> => {
    
    const filename = encodeURIComponent(file.name)

    // create a unique id for the image (UUID v4)
    const uuid = () => {
      let dt = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
      return uuid;
    }

    const media_uid_frontend = uuid()
    console.log('frontend_media_uid: ', media_uid_frontend)
    
    // #1 Uploading to S3 bucket 
    const res = await fetch(`/api/images/upload-image-s3?file=${filename}`)
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

    console.log('Data URL: ', data.url + '/' + filename)

    // #2 Uploading metadata to database
    const metaData = {
        media_uid: media_uid_frontend,
        media_type: 'image',
        origin: 'manual upload',
        medial_url: data.url + '/' + filename,
        s3bucket_key: data.s3bucket_key,
        permalink: data.url + '/' + filename,
        title: null,
        content: null,
        timestampMedia: new Date()
    }

    console.log('metaData JSON: ', metaData)

    toast.promise(
      fetch(`/api/images/upload-image-metadata`, {
        method: 'POST',
        body: JSON.stringify(metaData),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        loading: 'Now about to load meta data...',
        success: 'Image meta data has finsihed uploading!🎉',
        error: `Something happened with that image 😥 Please try again`,
      },
    )  

    return data;
  };
  
