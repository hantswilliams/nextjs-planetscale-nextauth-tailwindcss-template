import React, { useRef, useEffect } from 'react';

type TextBlockProps = {
    text: String;
};

const TextBlock = ({ text }: TextBlockProps) => {

  const textRef = useRef(null);

  useEffect(() => {
    //@ts-expect-error
    textRef.current.scrollTop = textRef.current.scrollHeight;
  }, [text]);

  return (
    <div
      className="overflow-y-scroll bg-gray-100 max-w-prose text-xs leading-tight h-40 min-h-full p-4 rounded-xl shadow-md"
      ref={textRef}
      style={{ wordBreak: "break-all" }}
    >
        <code style={{ whiteSpace: "pre-wrap" }}>{text}</code>
    </div>
  );
};

export default TextBlock;
