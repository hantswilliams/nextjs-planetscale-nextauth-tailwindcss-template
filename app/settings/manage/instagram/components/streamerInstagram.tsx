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
    const [status, setStatus] = useState<string | null>(null);
    const [streamStarted, setStreamStarted] = useState<boolean>(false);
    const [chunkShort, setChunkShort] = useState<string | null>(null);
    const [newChunk, setNewChunk] = useState<string | null>(null);
    const chunkShortRef = useRef(null); // Add a ref to store the value of chunkShort

    useEffect(() => {

        if (chunkShort !== null && newChunk !== null) {
          const combinedChunk = chunkShort + newChunk;
          console.log('combinedChunk: ', combinedChunk);

          const match = combinedChunk.match(/{[^}]*}/);
          const candidateChunk = match ? match[0] : 'No match found';
          console.log('candidateChunkv2: ', candidateChunk)

          if (candidateChunk !== null && candidateChunk.includes('finished')) {
            setStatus('...completed');
            setProgress(null);
            setStreamStarted(false);
            return;
          }

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
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setStatus('...completed');
            setProgress(null);
            setStreamStarted(false);
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
      setStatus('Transfering to social comprehend...');
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
    <div className="flex flex-col items-start">
      <button 
        onClick={() => setStreamStarted(true)}
        className={'bg-slate-600 hover:bg-slate-500 mt-2 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'}>
            Retrieve
      </button>
      <p className="text-sm text-slate-400"> {status}</p>
        {progress !== null && (
        <>
          <p className="text-sm"> Progress: {progress.toFixed(2)}%</p>
          <div className="relative w-full h-3 bg-gray-300 rounded">
            <div
                className="absolute left-0 h-3 bg-green-500 rounded"
                style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default InstagramStreamer;
