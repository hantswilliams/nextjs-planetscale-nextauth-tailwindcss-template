// this is for edge streaming, this API will be on the edge
export const config = {
    runtime: "edge",
  };

const handler = async (req: Request) => {

    // this part here is for streaming
    const encoder = new TextEncoder();

    const { userCurrentuserId } = (await req.json()) as {
        userCurrentuserId?: string;
      };

    console.log("from IG GET API:  userID: ", userCurrentuserId)

    
    if (!userCurrentuserId) {
        return new Response("No userCurrentuserId in the request", { status: 400 });
    }


    const igLoadingStream = new ReadableStream(
        {
          async pull(controller) {
  
            ///// STARTING 
            const startMessage = encoder.encode(JSON.stringify({ starting: true }));
            controller.enqueue(startMessage);
            await new Promise(resolve => setTimeout(resolve, 1500)); // add delay

            //// STEP 1: Get their IG photo IDs and URLs from the database
            const media = await fetch(`${process.env.NEXTAUTH_URL}/api/images/user/instagram/${userCurrentuserId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            var mediaJson = await media.json()
            const flattenedArray = JSON.parse(mediaJson).flat();

            /// DEVELOPEMENT: for right now, just keep the first 5 items from the json array
            const mediaJsonSlice = flattenedArray.slice(0, 5)
            console.log("mediaJsonSlice: ", mediaJsonSlice)
            
            /// STEP 1B:  Send the length of the array to the client
            const igLengthAnalyze = encoder.encode(JSON.stringify({ IgLength: mediaJsonSlice.length }));
            controller.enqueue(igLengthAnalyze);

            ///// STEP 2: Loop through the API to perform cognition on each of them
            for (let i = 0; i < mediaJsonSlice.length; i++) {

                console.log('process.env.DEV_BACKEND_COGNITION: ', process.env.NEXT_PUBLIC_DEV_BACKEND_COGNITION)
                console.log("mediaJsonSlice[i].medial_url: ", mediaJsonSlice[i].medial_url)

                const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_BACKEND_COGNITION}/amazon/moderation`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: mediaJsonSlice[i].medial_url })
                  })
                const result = await response.json()
                console.log('Cognition Result: ', result)

                // Save the cognition metadata results to the database
                const cognitionMetaData = {
                    cognitionResults: result,
                    url: mediaJsonSlice[i].medial_url,
                    uuid: mediaJsonSlice[i].media_uid,
                }
                console.log("cognitionMetaDataToSave: ", cognitionMetaData)

                // ///// Step 3 Send the results to the client
                // const igAnalyze = encoder.encode(JSON.stringify({ IgAnalyze: cognitionMetaData }));
                // controller.enqueue(igAnalyze);

                const cognition = await fetch(`${process.env.NEXTAUTH_URL}/api/images/upload-cognition-metadata`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cognitionMetaData)
                })
                const cognitionJson = await cognition.json()
                console.log("cognitionJson: ", cognitionJson)

                ///// Step 4 Send the progress to the client
                const progressValue = ((i + 1) / mediaJsonSlice.length)*100;
                const progressUpdates = encoder.encode(JSON.stringify({ progressStep: progressValue }));
                controller.enqueue(progressUpdates);

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
