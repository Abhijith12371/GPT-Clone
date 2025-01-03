import React, { useState, useEffect } from "react";
import SideBar from "./Components/SideBar";
import ChatContainer from "./Components/ChatContainer";
import Search from "./Components/Search";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  // Function to format the AI response
  const formatResponse = (text) => {
    if (!text) return "";

    // Format bold text
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong>$1</strong>");
    // Format italic text
    text = text.replace(/\*\*(.*?)\*\*/g, "<em>$1</em>");
    // Format code blocks
    text = text.replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");
    // Format inline code
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Format bullet points
    text = text.replace(/- (.*?)(\n|$)/g, "<li>$1</li>");
    // Wrap bullet points in <ul> tags
    text = text.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    // Format headings
    text = text.replace(/# (.*?)(\n|$)/g, "<h1>$1</h1>");

    return text;
  };

  // State variables
  const [userInput, setUserInput] = useState("");
  const [res, setRes] = useState(""); // Initialize response as an empty string
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (userInput && res) {
      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", parts: [{ text: userInput }] },
        { role: "model", parts: [{ text: res }] },
      ]);
    }
  }, [userInput, res]);

  // Google Generative AI setup
  const apiKey = "AIzaSyA0Z8_IFftejH30bAcA2m4-fmfP3ro3rf4"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  // Function to process user input and fetch AI response
  const run = async (input) => {
    if (!input.trim()) {
      console.error("Error: User input is empty");
      return;
    }

    try {
      console.log("History before API call:", JSON.stringify(history, null, 2));
      const chatSession = model.startChat({
        generationConfig,
        history,
      });

      const result = await chatSession.sendMessage(input);
      const formattedResponse = formatResponse(result.response.text());
      setRes(formattedResponse);
    } catch (error) {
      console.error("Error fetching from API:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* Sidebar Component */}
      <SideBar />

      {/* Chat Container Component */}
      <ChatContainer userInput={userInput} res={res} />

      {/* Search Component */}
      <Search setUserInput={setUserInput} run={run} userInput={userInput} />
    </div>
  );
}
