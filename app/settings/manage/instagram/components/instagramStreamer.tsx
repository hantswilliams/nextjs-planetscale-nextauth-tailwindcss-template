'use client';

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

import { useCallback, useEffect, useRef, useState } from 'react';

interface InstagramStreamerProps {
  userIguserId: string;
  userIguserToken: string;
  userCurrentuserId: string;
}

const InstagramStreamer: React.FC<InstagramStreamerProps> = ({
    userIguserId,
    userIguserToken,
    userCurrentuserId,
  }) => {
    const [progress, setProgress] = useState<number | null>(null);
    const [status, setStatus] = useState<string>('');
    const [streamStarted, setStreamStarted] = useState<boolean>(false);
    const [chunkShort, setChunkShort] = useState<string | null>(null);
    const [newChunk, setNewChunk] = useState<string | null>(null);
    const chunkShortRef = useRef(null); // Add a ref to store the value of chunkShort

    useEffect(() => {
        if (chunkShort !== null && newChunk !== null) {
          const combinedChunk = chunkShort + newChunk;
          console.log('combinedChunk: ', combinedChunk);

        //   const [firstPart, ...rest] = combinedChunk.split(/(.*?}})/);
        //   const candidateChunk = firstPart + '}';
        //   console.log('candidateChunk: ', candidateChunk);

          const match = combinedChunk.match(/{[^}]*}/);
          const candidateChunk = match ? match[0] : 'No match found';
          console.log('candidateChunkv2: ', candidateChunk)

          try {
            const parsedCandidate = JSON.parse(candidateChunk);
            console.log('parsedCandidate: ', parsedCandidate);
            handleParsedChunk(parsedCandidate);
          } catch (error) {
            console.error('Error while parsing combined JSON:', error);
          } finally {
            setChunkShort(newChunk);
            setNewChunk(null);
          }
        }
      }, [chunkShort, newChunk]);    

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
            setProgress(100)
            setStatus('Finished!');
            return;
          }
    
          var chunk = decoder.decode(value);
          console.log('chunk received: ', chunk);
    
          try {
            const parsedChunk = JSON.parse(chunk);
            handleParsedChunk(parsedChunk);
          } catch (error) {
            console.error('Error while parsing JSON:', error);
            if (chunkShortRef.current === null) {
              //@ts-expect-error
              chunkShortRef.current = chunk;
              setChunkShort(chunk);
              console.log('chunkShort set: ', chunk);
            } else {
              setNewChunk(chunk);
              console.log('newChunk set: ', chunk);
            }
          }
    
          return reader.read().then(processText);
        });
      }, [userIguserId, userIguserToken, userCurrentuserId]);

  const handleParsedChunk = (parsedChunk: any) => {
    if (parsedChunk.starting) {
      setStatus('Starting...');
    } else if (parsedChunk.IGretrievedMedia) {
      console.log('parsedChunk.IGretrievedMedia: ', parsedChunk.IGretrievedMedia)
      setStatus(`Retrieved ${parsedChunk.IGretrievedMedia} media from Instagram`);
    } else if (parsedChunk.progressStep) {
      console.log('parsedChunk.progressStep: ', parsedChunk.progressStep)
      setStatus('Uploading to S3 and saving to database...');
      setProgress(parsedChunk.progressStep);
    } else if (parsedChunk.finished) {
      console.log('parsedChunk.finished: ', parsedChunk.finished)
      setStatus('Finished!');
    }
  }

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
