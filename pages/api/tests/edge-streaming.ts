if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {


  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }
  
  const encoder = new TextEncoder();

  let counter = 0;
  
  const resultStream = new ReadableStream(
    {
      async pull(controller) {
        if (counter < 10) {
          const queue = encoder.encode(
            JSON.stringify({ foo: "bar", james: "cameron" }) + "\n"
          );
          controller.enqueue(queue);
          await new Promise(resolve => setTimeout(resolve, 5000)); // add delay
          const queue2 = encoder.encode(
            JSON.stringify({ foo: "22bar", james: "22cameron" }) + "\n"
          );
          controller.enqueue(queue2);
          await new Promise(resolve => setTimeout(resolve, 5000)); // add delay
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