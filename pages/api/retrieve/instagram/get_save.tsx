export const igUploadS3 = async (fileUrl: string) => {

    const filename = fileUrl
    console.log('filename received: ', filename)

    async function uploadToS3(url: string) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/images/upload-image-s3-url`, {
          method: 'POST',
          body: JSON.stringify({ url }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || 'Failed to upload file');
        }
        console.log('File uploaded successfully');
      }

    const data = await uploadToS3(filename);
    return data;

  };
  
