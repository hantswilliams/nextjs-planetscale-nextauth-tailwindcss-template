// import { useState, useEffect } from "react";

// const MyPageComponent = () => {
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [isStarted, setIsStarted] = useState(false);


// //   const resetState = () => {
// //     setProgress(0);
// //     setLoading(false);
// //     };

//   const handleClick = async () => {
//     try {
//     //   resetState();
//       setLoading(true);
//       const response = await fetch("/api/tests/poll");
//       setLoading(false);
//       if (response.ok) {
//         console.log("Long-running process complete!");
//       } else {
//         console.error(`Error: ${response.status} - ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//     };

//   useEffect(() => {
//     const source = new EventSource("/api/tests/poll");
  
//     source.addEventListener("progress", (event: any) => {
//       const data = JSON.parse(event.data);
//       console.log("Received progress update:", data.progress);
//       setTimeout(() => {
//         setProgress(data.progress);
//       }, 100); // Add a delay of 500ms before updating the UI
//     });
  
//     source.addEventListener("complete", () => {
//       setProgress(100);
//       source.close();
//     });
  
//     return () => {
//       source.close();
//     };
//   }, []);

  

//   return (
//     <div>
//       <button onClick={handleClick} disabled={loading}>
//         {loading ? "Loading..." : "Start Long-Running Process"}
//       </button>
//       <div>{loading ? "Loading..." : `Progress: ${progress}%`}</div>
//       <div> {progress} </div>
//     </div>
//   );
// };

// export default MyPageComponent;











// import { useState, useEffect } from "react";

// const MyPageComponent = () => {
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [isStarted, setIsStarted] = useState(false);

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       setIsStarted(true);
//       const response = await fetch("/api/tests/poll");
//       setLoading(false);
//       if (response.ok) {
//         console.log("Long-running process started...");
//       } else {
//         console.error(`Error: ${response.status} - ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let source: EventSource | null = null;

//     if (isStarted) {
//       source = new EventSource("/api/tests/poll");

//       source.addEventListener("progress", (event: any) => {
//         const data = JSON.parse(event.data);
//         console.log("Received progress update:", data.progress);
//         setProgress(data.progress);
//       });

//       source.addEventListener("complete", () => {
//         setProgress(100);
//         if (source) {
//           source.close();
//         }
//       });
//     }

//     return () => {
//       if (source) {
//         source.close();
//       }
//     };
//   }, [isStarted]);




//   return (
//     <div>
//       <button onClick={handleClick} disabled={loading}>
//         {loading ? "Loading..." : "Start Long-Running Process"}
//       </button>
//       {isStarted && (
//         <div>
//           <div>{loading ? "Loading..." : `Progress: ${progress.toFixed(2)}%`}</div>
//         </div>
//         )}
//     </div>

//     );
// };

// export default MyPageComponent;








// import { useState, useEffect } from "react";

// const MyPageComponent = () => {

//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [isStarted, setIsStarted] = useState(false);

//   const clearState = () => {
//     setProgress(0);
//     setLoading(false);
//     setIsStarted(false);
//     };

//   const handleClick = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/tests/poll");
//       setLoading(false);
//       if (response.ok) {
//         console.log("Long-running process has started...");
//       } else {
//         console.error(`Error: ${response.status} - ${response.statusText}`);
//       }
//       setIsStarted(true);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let source: EventSource | null = null;
  
//     if (isStarted) {
//       source = new EventSource("/api/tests/poll");
//       console.log('SOURCE STARTED: ', source)
    
//       // listen for the "error" event
//       source.addEventListener("error", (event: any) => {
//         if (event.eventPhase === EventSource.CLOSED) {
//           console.log("EventSource connection closed.");
//         } else {
//           console.log("EventSource error:", event);
//         }
//       }
//       );

//       // listen for the "progress" event
//       source.addEventListener("progress", (event: any) => {
//         console.log("EventSource progress:", event)
//         // const data = JSON.parse(event.data);
//         // console.log("Received progress update:", data.progress);
//         // setProgress(data.progress);
//       }
//       );

//       source.addEventListener("complete", (event: any) => {
//         console.log('EventSource complete')
//         console.log('Progress: ', event)
//         setProgress(100);
//         if (source) {
//           source.close();
//         }
//       });

//       return () => {
//         if (source) {
//           source.close();
//         }
//       };
//     }
//   }, [isStarted]);
  
  





  
//   return (
//     <div>
//       <button onClick={handleClick} disabled={loading}>
//         {loading ? "Loading..." : "Start Long-Running Process"}
//       </button>
//       {isStarted && (
//         <div>
//           <div>{loading ? "Loading..." : `Progress: ${progress.toFixed(2)}%`}</div>
//         </div>
//       )}
//       <br />
//       <button onClick={clearState} disabled={loading}>
//         {loading ? "Loading..." : "Clear State"}
//         </button>
//         <br />
//     </div>
//   );
// };

// export default MyPageComponent;








// 'use client';


// import { useEffect, useState } from "react";

// function MyPageComponent() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const source = new EventSource("/api/tests/poll");

//     source.addEventListener("message", (event) => {
//       const message = JSON.parse(event.data);
//       console.log('EventSource progress: ', message)
//       //@ts-expect-error
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     source.addEventListener("complete", (event) => {
//       console.log('EventSource complete: ', event)
//       source.close();
//     });

//     return () => {
//       source.close();
//     };
//   }, []);

//   return (
//     <div>
//       My Component

//       {messages.map((message, index) => (
//         //@ts-expect-error
//         <div key={index}>{message.data}</div>
//       ))}
//     </div>
//   );
// }

// export default MyPageComponent;

















// import { useEffect, useState } from "react";

// function MyPageComponent() {
//   const [messages, setMessages] = useState([]);
//   const [buttonClicked, setButtonClicked] = useState(false);

//   useEffect(() => {
//     if (buttonClicked) {
//       const source = new EventSource("/api/tests/polling");

//       source.addEventListener("progress", (event) => {
//         const message = JSON.parse(event.data);
//         console.log("EventSource progress: ", message);
//         //@ts-expect-error
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });

//       source.addEventListener("complete", (event) => {
//         console.log("EventSource complete: ", event);
//         source.close();
//       });

//       return () => {
//         source.close();
//       };
//     }
//   }, [buttonClicked]);

//   const handleClick = () => {
//     setButtonClicked(true);
//   };

//   const handleReset = () => {
//     setButtonClicked(false);
//     setMessages([]);
//   };

//   return (
//     <div>
//       My Component
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
//         Click me
//       </button>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>
//         Reset
//       </button>
//       {messages.map((message, index) => (
//         //@ts-expect-error
//         <div key={index}>{message.data}</div>
//       ))}
//     </div>
//   );
// }

// export default MyPageComponent;







// import { useEffect, useState } from "react";

// function MyPageComponent() {
//   const [messages, setMessages] = useState([]);
//   const [buttonClicked, setButtonClicked] = useState(false);

//   useEffect(() => {
//     if (buttonClicked) {
//       const source = new EventSource("/api/tests/polling");

//       source.addEventListener("progress", (event) => {
//         const message = JSON.parse(event.data);
//         console.log("EventSource progress: ", message);
//         //@ts-expect-error
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });

//       source.addEventListener("complete", (event) => {
//         console.log("EventSource complete: ", event);
//         source.close();
//       });

//       const fetchData = async () => {
//         try {
//           const res = await fetch("/api/tests/polling", {
//             method: "POST",
//             body: JSON.stringify({ param1: "test value1", param2: "test value2" }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           console.log("Fetch response: ", res);
//         } catch (err) {
//           console.log(err);
//         }
//       };

//       fetchData();

//       return () => {
//         source.close();
//       };
//     }
//   }, [buttonClicked]);

//   const handleClick = () => {
//     setButtonClicked(true);
//   };

//   const handleReset = () => {
//     setButtonClicked(false);
//     setMessages([]);
//     console.log("Reset")
//   };

//   return (
//     <div>
//       My Component
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
//         Click me
//       </button>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleReset}>
//         Reset
//       </button>
//       {messages.map((message, index) => (
//         //@ts-expect-error
//         <div key={index}>{message.data}</div>
//       ))}
//     </div>
//   );
// }

// export default MyPageComponent;









import { useState, useEffect } from "react";

const MyPageComponent = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let source: EventSource | null = null;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tests/polling", {
          method: "POST",
          body: JSON.stringify({ param1: "test value1", param2: "test value2" }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoading(false);
        if (response.ok) {
          setIsStarted(true);
          console.log("Long-running process started...");
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };


    if (isStarted) {
      source = new EventSource("/api/tests/polling");

      source.addEventListener("progress", (event: any) => {
        console.log("EventSource progress: ", event);
      });

      source.addEventListener("complete", () => {
        setProgress(100);
        if (source) {
          source.close();
        }
      });
    }

    return () => {
      if (source) {
        source.close();
      }
    };
  }, [isStarted]);

  const handleClick = () => {
    if (!isStarted) {
      setIsStarted(true);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading || isStarted}>
        {loading ? "Loading..." : "Start Long-Running Process"}
      </button>
      {isStarted && (
        <div>
          <div>{loading ? "Loading..." : `Progress: ${progress.toFixed(2)}%`}</div>
        </div>
      )}
    </div>
  );
};

export default MyPageComponent;





