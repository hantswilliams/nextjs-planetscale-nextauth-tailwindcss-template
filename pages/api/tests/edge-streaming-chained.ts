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
    
    const resultStream = new ReadableStream(
      {
        async pull(controller) {
          if (counter < 1) {


            // EVENT #1 
            const queueStarting = encoder.encode(
            JSON.stringify({ message: 'Starting...', yourMessage: promptUser }) + "\n"
            );
            controller.enqueue(queueStarting);
            await new Promise(resolve => setTimeout(resolve, 1500)); // add delay



            // EVENT #2
            const queueEvent1Fetch= await fetch('https://dummyjson.com/products/1', 
            {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    });
            const queueEvent1FetchResponse = await queueEvent1Fetch.json();
            const queueEvent1ToSend = encoder.encode(JSON.stringify(queueEvent1FetchResponse));
            controller.enqueue(queueEvent1ToSend);
            await new Promise(resolve => setTimeout(resolve, 1500)); // add delay


            // EVENT #3
            const queueEvent2Fetch= await fetch('https://dummyjson.com/products/1', 
            {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    });
            const queueEvent2FetchResponse = await queueEvent2Fetch.json();
            const queueEvent2ToSend = encoder.encode(JSON.stringify(queueEvent2FetchResponse));
            controller.enqueue(queueEvent2ToSend);
            await new Promise(resolve => setTimeout(resolve, 3000)); // add delay



            // EVENT #4
            await new Promise(resolve => setTimeout(resolve, 1500)); // add delayy
            counter++;
            } else {
                controller.close();
            }
        },
      }
    );
    
    return new Response(resultStream);
  
  };
  
  export default handler;