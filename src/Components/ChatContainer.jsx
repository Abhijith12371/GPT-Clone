import React, { useEffect, useState } from 'react';

const ChatContainer = ({ userInput, res }) => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  // Add user input message
  useEffect(() => {
    if (userInput) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', text: userInput },
      ]);
    }
  }, [userInput]);

  // Add AI response message
  useEffect(() => {
    if (res) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: res },
      ]);
    }
  }, [res]);

  // Add to history once both userInput and response are available


  return (
    <div className="bg-gray-100 h-[80vh] mb-20 mt-4 overflow-y-auto p-4 flex flex-col space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-3 max-w-xs shadow-md rounded-lg ${
            message.type === 'user'
              ? 'self-end bg-blue-500 text-white'
              : 'self-start bg-gray-300 text-gray-800 min-w-[100%]'
          }`}
        >
          {message.type === 'bot' ? (
            <div
              dangerouslySetInnerHTML={{ __html: message.text }}
              className="whitespace-pre-wrap"
            ></div>
          ) : (
            message.text
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
