
export const uploadImage = async (file: File): Promise<{fields: Record<string, string>, url: string}> => {
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
  
    const response = await fetch(data.url, {
      method: 'POST',
      body: formData,
    })
    console.log('Data URL: ', data.url + '/' + filename)
  
    return data;
  };
  
