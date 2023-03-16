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
  const [chunksAccumulated, setChunksAccumulated] = useState('');


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
    
      const chunk = decoder.decode(value, { stream: true });
      console.log('chunk received: ', chunk);
    
      // Accumulate received chunks
      setChunksAccumulated(chunksAccumulated + chunk);
    
      // Keep looping until no more valid JSON objects can be extracted
      while (true) {
        const openBracketIndex = chunksAccumulated.indexOf('{');
        const closeBracketIndex = chunksAccumulated.indexOf('}', openBracketIndex);
    
        // If both opening and closing brackets are found, extract JSON string
        if (openBracketIndex !== -1 && closeBracketIndex !== -1) {
          const jsonString = chunksAccumulated.slice(openBracketIndex, closeBracketIndex + 1);
    
          try {
            // Attempt to parse a JSON object from the jsonString
            const parsedChunk = JSON.parse(jsonString);
    
            // If parsing is successful, process the parsed JSON object
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
    
            // Remove the processed JSON string from chunksAccumulated
            setChunksAccumulated(chunksAccumulated.slice(0, openBracketIndex) + chunksAccumulated.slice(closeBracketIndex + 1));
    
          } catch (error) {
            // If jsonString contains an incomplete JSON object, break the loop
            // and wait for the next chunk
            break;
          }
        } else {
          // If no complete JSON string is found, break the loop and wait for the next chunk
          break;
        }
      }
    
      return reader.read().then(processText);
    });
          
  }, [userIguserId, userIguserToken, userCurrentuserId]);

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
