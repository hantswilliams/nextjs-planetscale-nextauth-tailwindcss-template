import ig_me_media from './get_retrieve';

// this is for edge streaming, this API will be on the edge
export const config = {
    runtime: "edge",
  };

const handler = async (req: Request) => {

    // this part here is for streaming
    const encoder = new TextEncoder();

    const { userIguserId, userIguserToken, userCurrentuserId } = (await req.json()) as {
        userIguserId?: string;
        userIguserToken?: string;
        userCurrentuserId?: string;
      };

    console.log("from IG GET API: received IG id, IG token, and userID: ", userIguserId, userIguserToken, userCurrentuserId)

    
    if (!userIguserId || !userIguserToken || !userCurrentuserId) {
        return new Response("No iuserIguserIdg_userID, userIguserToken, or userCurrentuserId in the request", { status: 400 });
    }


    const igLoadingStream = new ReadableStream(
        {
          async pull(controller) {
  
            ///// STARTING 
            const startMessage = encoder.encode(JSON.stringify({ starting: true }));
            controller.enqueue(startMessage);
            await new Promise(resolve => setTimeout(resolve, 1500)); // add delay


            /// Step 1 - Retrieve the data from Instagram
            var ig_media = await ig_me_media(userIguserToken, userIguserId);

            ///Send client side update that the first part has completed
            const ig_media_length = ig_media.length;
            const igContentRetrieved = encoder.encode(JSON.stringify({ IGretrievedMedia: ig_media_length }));
            controller.enqueue(igContentRetrieved);

            /// For testing purpsoses, just keep the first 5 items
            ig_media = ig_media.slice(0, 5);


            /// Step 2 - Loop through the data and save each item to S3 bucket and the database
            for (let i = 0; i < ig_media.length; i++) {

                const response = await fetch(`${process.env.NEXTAUTH_URL}/api/images/upload-image-s3-from-instagram`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user_id: userCurrentuserId,
                        ig_url: ig_media[i].media_url,
                        ig_caption: ig_media[i].caption,
                        ig_mediatype: ig_media[i].media_type,
                        ig_timestamp: ig_media[i].timestamp,
                        ig_permalink: ig_media[i].permalink,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data?.error || 'Failed to upload file');
                }
                console.log('finished with: ', ig_media[i].media_url)

                // EXPERIMETNAL: this part here is also experimental
                console.log(`${i + 1}/${ig_media.length}\n\n`)
                const progressValue = ((i + 1) / ig_media.length)*100;
                const progressUpdates = encoder.encode(JSON.stringify({ progressStep: progressValue }));
                controller.enqueue(progressUpdates);

                ///Send client side update that one of the X images has uploaded succesfully
                const progressDetailed = encoder.encode(JSON.stringify({ status: 'completed a upload!', progress: ig_media[i].media_url }));
                controller.enqueue(progressDetailed);

            }
  
            //// FINISHING
            const finishedMessage = encoder.encode(JSON.stringify({ finished: true }));
            controller.enqueue(finishedMessage);
            controller.close();
  
          }
        }
    );


    return new Response(igLoadingStream);


}

export default handler;
