export const config = {
    runtime: "edge",
  };
  
const handler = async (req: Request): Promise<Response> => {


  const { prompt, promptUser } = (await req.json()) as {
    prompt?: string;
    promptUser?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }
  
  const encoder = new TextEncoder();

  let counter = 0;

  console.log('Complete Prompt: ', prompt)
  console.log('User provided: ', promptUser)


  type EventFields = {
      user_id: string;
      ig_url: string;
      ig_caption: string;
      ig_mediatype: string;
      ig_timestamp: Date;
      ig_permalink: string;
  }

  // create an array with 2 or 3 events
  const testEvents: EventFields[] = [
      {
          user_id: 'test-1123456789',
          ig_url: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/file-types/image/raster/jpeg-file/OG-1200x800-jpeg.jpg',
          ig_caption: 'This is a test caption',
          ig_mediatype: 'IMAGE',
          ig_timestamp: new Date(),
          ig_permalink: 'https://www.instagram.com/p/123456789/',
      },
      {
          user_id: 'test-2123456789',
          ig_url: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/file-types/image/raster/jpeg-file/OG-1200x800-jpeg.jpg',
          ig_caption: 'test-2-This is a test caption',
          ig_mediatype: 'IMAGE',
          ig_timestamp: new Date(),
          ig_permalink: 'test-2-https://www.instagram.com/p/123456789/',
      },
      {
          user_id: 'test-3-123456789',
          ig_url: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/file-types/image/raster/jpeg-file/OG-1200x800-jpeg.jpg',
          ig_caption: 'test-3-This is a test caption',
          ig_mediatype: 'IMAGE',
          ig_timestamp: new Date(),
          ig_permalink: 'test-3-https://www.instagram.com/p/123456789/',
      },
  ]

  const resultStream2 = new ReadableStream(
      {
        async pull(controller) {

          const startMessage = encoder.encode(JSON.stringify({ starting: true, userValues: promptUser }));
          controller.enqueue(startMessage);
          await new Promise(resolve => setTimeout(resolve, 1500)); // add delay

          for (let i = 0; i < testEvents.length; i++) {
              const progressMessage = encoder.encode(JSON.stringify(testEvents[i]));
              controller.enqueue(progressMessage);
              await new Promise(resolve => setTimeout(resolve, 1500)); // add delay
          }

          const finishedMessage = encoder.encode(JSON.stringify({ finished: true }));
          controller.enqueue(finishedMessage);
          controller.close();

        }
      }
  );
      
  return new Response(resultStream2);

};

export default handler;