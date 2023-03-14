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
            const queue3 = encoder.encode(
            JSON.stringify({ userprovidedPromt: promptUser }) + "\n"
            );
            controller.enqueue(queue3);
            await new Promise(resolve => setTimeout(resolve, 1500)); // add delay
            const queue = encoder.encode(
            JSON.stringify({ foo: "bar", james: "cameron" }) + "\n"
            );
            controller.enqueue(queue);
            await new Promise(resolve => setTimeout(resolve, 1500)); // add delay
            const queue2 = encoder.encode(
            JSON.stringify({ foo: "22bar", james: "22cameron" }) + "\n"
            );
            controller.enqueue(queue2);
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