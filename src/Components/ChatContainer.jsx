import React, { useState } from 'react';

const ChatContainer = () => {
    const [userInput,setUserInput]=useState()
    const [message,setMessage]=useState([

    ])
  return (
    <div className="bg-gray-100 min-h-screen p-4 flex flex-col space-y-4">
      <p className="self-end bg-blue-500 text-white rounded-lg p-3 max-w-xs shadow-md">
        Hello
      </p>
      <p className="self-start bg-gray-300 text-gray-800 rounded-lg p-3 max-w-xs shadow-md">
        Nice to meet you
      </p>
      <p className="self-end bg-blue-500 text-white rounded-lg p-3 max-w-xs shadow-md">
        Hello
      </p>
      <p className="self-start bg-gray-300 text-gray-800 rounded-lg p-3 max-w-xs shadow-md">
        Nice to meet you
      </p>
    </div>
  );
};

export default ChatContainer;
