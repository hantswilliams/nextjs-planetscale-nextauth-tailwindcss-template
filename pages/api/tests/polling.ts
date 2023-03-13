// import { NextApiRequest, NextApiResponse } from "next";

// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// const simulateLongRunningProcess = async (progressCallback: (progress: number) => void) => {
//     const totalSteps = 25;
//     for (let i = 1; i <= totalSteps; i++) {
//       const progress = i / totalSteps * 100;
//       progressCallback(progress);
//       await wait(200); // Add a delay of 500ms between progress updates
//     }
//   };
  

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   const sendEvent = (event: string, data: any) => {
//     res.write(`event: ${event}\n`);
//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   };

//   await simulateLongRunningProcess(progress => {
//     console.log('server progress: ', progress)
//     sendEvent("progress", { progress });
//   });

//   sendEvent("complete", { success: true });

//   res.end();
// }












// import { NextApiRequest, NextApiResponse } from "next";

// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// const simulateLongRunningProcess = async (progressCallback: (progress: number) => void) => {
//   const totalSteps = 25;
//   for (let i = 1; i <= totalSteps; i++) {
//     const progress = i / totalSteps * 100;
//     progressCallback(progress);
//     await wait(200); // Add a delay of 200ms between progress updates
//   }
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");
//   res.setHeader("Transfer-Encoding", "chunked");
//   res.setHeader("Content-Encoding", "none");

//   const sendEvent = (event: string, data: any) => {
//     res.write(`event: ${event}\n`);
//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   };

//   await simulateLongRunningProcess(progress => {
//     console.log('server progress: ', progress)
//     sendEvent("progress", { progress });
//   });

//   sendEvent("complete", { success: true });

//   res.end();
// }




// import { NextApiRequest, NextApiResponse } from "next";

// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// const simulateLongRunningProcess = async (sendEvent: (event: string, data: any) => void) => {
//   const totalSteps = 25;
//   for (let i = 1; i <= totalSteps; i++) {
//     // console log the current step 
//     console.log('current step: ', i)
//     const progress = i / totalSteps * 100;
//     console.log('server progress: ', progress)
//     sendEvent("progress", { progress });
//     await wait(200); // Add a delay of 200ms between progress updates
//     await new Promise(resolve => setTimeout(resolve, 10)); // Add a small delay between each event
//   }
// };

  // await simulateLongRunningProcess(sendEvent);

  // // create a new function that runs, and creates 25 events
  // for (let i = 1; i <= 10; i++) {
  //   const progress = i / 10 * 100;
  //   console.log('server progress: ', progress)
  //   // await wait(1000);
  //   sendEvent("progress", { progress });
  //   // await wait(200); // Add a delay of 500ms between progress updates
  // }

// import { NextApiRequest, NextApiResponse } from "next";


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//   console.log('handler function executed');

//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");


//   const sendEvent = (event: string, data: any) => {
//     res.write(`event: ${event}\n`);
//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   };

//   const handleUpdateEvent = () => {
//     console.log('client has requested an update event...')
//     const latestProgress = progress;
//     sendEvent("progress", { progress: latestProgress });
//   };

//   let progress = 0;

//   const handleProgressEvent = (event: any) => {
//     console.log('client has requested an progress update...')
//     progress = event.data.progress;
//     sendEvent("progress", { progress })
//   };

//   const handleCompleteEvent = () => {
//     console.log('finsihed with request')
//     res.end();
//   };

//   req.socket.setTimeout(Number.MAX_SAFE_INTEGER);

//   // Handle the "update" event type
//   req.socket.on("update", handleUpdateEvent);

//   // Handle the "progress" event type
//   req.socket.on("progress", handleProgressEvent);

//   // Handle the "complete" event type
//   req.socket.on("complete", handleCompleteEvent);

//   const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//   sendEvent("progress", { success: 'this should be immediate' });

//   console.log('after wait 1')
//   await wait (100)

//   sendEvent("progress", { success: 'this should then be a few seconds after' });

//   console.log('after wait 2')
//   await wait (100)

//   console.log('complete event sent')
//   await wait (100)
//   sendEvent("complete", { success: true });

//   res.end();
// }








// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   console.log('handler function executed')

//   const sendEvent = (event: string, data: any) => {
//     res.write(`event: ${event}\n`);
//     res.write(`data: ${JSON.stringify(data)}\n\n`);
//   };

//   const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//   // Send initial message to client
//   sendEvent("message", { data: "message 1..." });
//   console.log('message 1 sent')
//   await wait(1500);

//   sendEvent("message", { data: "message 2... " });
//   console.log('message 2 sent')
//   await wait(1500);

//   sendEvent("complete", { data: "finished" });
//   console.log('finished event sent')
//   await wait(1500);

//   // // End the response
//   res.end();
// }




import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('request body: ', req.body)

  const param1 = req.body.param1
  const param2 = req.body.param2

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Content-Encoding", "none");


  console.log('handler function executed')

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  sendEvent("progress", { data: {param1: param1, param2: param2} });

  // Send initial message to client
  sendEvent("progress", { data: "progress 1...yes" });
  console.log('message 1 sent')
  await wait(1500);

  sendEvent("progress", { data: `progress 2...it,` });
  console.log('progress 2 sent')
  await wait(1500);

  sendEvent("progress", { data: "progress 3...is" });
  console.log('progress 3 sent')
  await wait(1500);

  sendEvent("progress", { data: "progress 4...now working!!!!!" });
  console.log('progress 4 sent')
  await wait(1500);

  sendEvent("complete", { data: `finished with parameters: ${param1} and ${param2}` });
  console.log(`finished with request`)
  await wait(1500);

  // End the response
  res.write("event: close\n\n");
  res.end();
}
