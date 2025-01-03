import React, { useState } from "react";
import NavBar from "./Components/NavBar"; // Assuming this is the menu bar
import ChatContainer from "./Components/ChatContainer";
import Search from "./Components/Search";
import ChatSidebar from "./Components/ChatSideBar";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [res, setRes] = useState("");
  const [history, setHistory] = useState([]); // Chat history for the current chat

  // Format the AI response
  const formatResponse = (text) => {
    if (!text) return "";

    text = text.replace(/\*\*\*(.*?)\*\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*\*(.*?)\*\*/g, "<em>$1</em>");
    text = text.replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/- (.*?)(\n|$)/g, "<li>$1</li>");
    text = text.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    text = text.replace(/# (.*?)(\n|$)/g, "<h1>$1</h1>");

    return text;
  };

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

  // Process user input and fetch AI response
  const run = async (input) => {
    if (!input.trim()) {
      console.error("Error: User input is empty");
      return;
    }

    try {
      const chatSession = model.startChat({
        generationConfig,
        history,
      });

      const result = await chatSession.sendMessage(input);
      const aiResponse = formatResponse(result.response.text());

      // Update history with the new user input and AI response
      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", parts: [{ text: input }] },
        { role: "model", parts: [{ text: aiResponse }] },
      ]);

      // Update the response and clear the user input
      setRes(aiResponse);
      setUserInput("");
    } catch (error) {
      console.error("Error fetching from API:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Chat Sidebar Component */}
      <ChatSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Menu Bar Component */}
        <NavBar history={history} setHistory={setHistory} />

        {/* Chat Container Component */}
        <ChatContainer userInput={userInput} res={res} />

        {/* Search Component */}
        <Search setUserInput={setUserInput} run={run} userInput={userInput} />
      </div>
    </div>
  );
}
