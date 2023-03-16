// 'use client';

// import { useCallback, useEffect, useState } from 'react';

// interface InstagramStreamerProps {
//   userIguserId: string;
//   userIguserToken: string;
//   userCurrentuserId: string;
// }

// const InstagramStreamer: React.FC<InstagramStreamerProps> = ({ userIguserId, userIguserToken, userCurrentuserId }) => {
//   const [progress, setProgress] = useState<number | null>(null);
//   const [status, setStatus] = useState<string>('');
//   const [streamStarted, setStreamStarted] = useState<boolean>(false);

//   const fetchData = useCallback(async () => {
//     const response = await fetch('/api/retrieve/instagram/get-streaming/', {
//       method: 'POST',
//       body: JSON.stringify({
//         userIguserId,
//         userIguserToken,
//         userCurrentuserId,
//       }),
//     });

//     const reader = response.body!.getReader();
//     const decoder = new TextDecoder();

//     //@ts-expect-error
//     reader.read().then(async function processText({ done, value }) {
//       if (done) {
//         console.log('Stream complete.');
//         return;
//       }

//       const chunk = decoder.decode(value);
//       console.log('chunk received: ', chunk)

//       try {
//         const parsedChunk = JSON.parse(chunk);
//         if (parsedChunk.starting) {
//           setStatus('Starting...');
//         } else if (parsedChunk.IGretrievedMedia) {
//           setStatus(`Retrieved ${parsedChunk.IGretrievedMedia} media from Instagram`);
//         } else if (parsedChunk.progressStep) {
//           setStatus('Uploading to S3 and saving to database...');
//           setProgress(parsedChunk.progressStep);
//         } else if (parsedChunk.finished) {
//           setStatus('Finished!');
//         }
//       } catch (error) {
//         console.error('Error while parsing JSON:', error);
//       }

//       return reader.read().then(processText);
//     });
//   }, [userIguserId, userIguserToken, userCurrentuserId]);

//   useEffect(() => {
//     if (streamStarted) {
//       fetchData();
//     }
//   }, [streamStarted, fetchData]);

//   return (
//     <div>
//       <h2>Instagram Streaming Status</h2>
//       <button onClick={() => setStreamStarted(true)}>Start Streaming</button>
//       <p>{status}</p>
//       {progress !== null && (
//         <>
//           <p>Progress: {progress.toFixed(2)}%</p>
//           <progress value={progress} max="100" />
//         </>
//       )}
//     </div>
//   );
// };

// export default InstagramStreamer;



'use client';

import { useCallback, useEffect, useState } from 'react';

interface InstagramStreamerProps {
  userIguserId: string;
  userIguserToken: string;
  userCurrentuserId: string;
}

const InstagramStreamer: React.FC<InstagramStreamerProps> = ({ userIguserId, userIguserToken, userCurrentuserId }) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');
  const [streamStarted, setStreamStarted] = useState<boolean>(false);
  const [previousChunk, setPreviousChunk] = useState<string>('');

  const fetchData = useCallback(async () => {
    const response = await fetch('/api/retrieve/instagram/get-streaming/', {
      method: 'POST',
      body: JSON.stringify({
        userIguserId,
        userIguserToken,
        userCurrentuserId,
      }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    //@ts-expect-error
    reader.read().then(async function processText({ done, value }) {
      if (done) {
        console.log('Stream complete.');
        return;
      }

      const chunk = decoder.decode(value);
      console.log('chunk received: ', chunk)

      const tryParseJSON = (input: string) => {
        try {
          return JSON.parse(input);
        } catch (error) {
          return null;
        }
      };

      let parsedChunk = tryParseJSON(chunk);

      if (!parsedChunk && previousChunk) {
        const combinedChunk = previousChunk + chunk;
        const bracketIndex = combinedChunk.indexOf('}');
        const validJson = combinedChunk.slice(0, bracketIndex + 1);
        parsedChunk = tryParseJSON(validJson);

        if (parsedChunk) {
          setPreviousChunk(combinedChunk.slice(bracketIndex + 1));
        } else {
          console.error('Error while parsing JSON: Could not combine chunks');
          setPreviousChunk(combinedChunk);
          return reader.read().then(processText);
        }
      } else if (!parsedChunk) {
        console.error('Error while parsing JSON: Chunk is not valid JSON');
        setPreviousChunk(chunk);
        return reader.read().then(processText);
      }

      if (parsedChunk.starting) {
        setStatus('Starting...');
      } else if (parsedChunk.IGretrievedMedia) {
        setStatus(`Retrieved ${parsedChunk.IGretrievedMedia} media from Instagram`);
      } else if (parsedChunk.progressStep) {
        setStatus('Uploading to S3 and saving to database...');
        setProgress(parsedChunk.progressStep);
      } else if (parsedChunk.finished) {
        setStatus('Finished!');
      }

      return reader.read().then(processText);
    });
  }, [userIguserId, userIguserToken, userCurrentuserId, previousChunk]);

  useEffect(() => {
    if (streamStarted) {
      fetchData();
    }
  }, [streamStarted, fetchData]);

  return (
    <div>
      <h2>Instagram Streaming Status</h2>
      <button onClick={() => setStreamStarted(true)}>Start Streaming</button>
      <p>{status}</p>
      {progress !== null && (
        <>
          <p>Progress: {progress.toFixed(2)}%</p>
          <progress value={progress} max="100" />
        </>
      )}
    </div>
  );
};

export default InstagramStreamer;
