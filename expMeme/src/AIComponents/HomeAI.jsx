import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import TextInputSec from "./TextInputSec";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 15 } },
};

const mainVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { delay: 0.2, type: "spring", stiffness: 60 } },
};

const cardContainer = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const HomeAI = () => {
  const [inputText, setInputText] = useState("");
  const [memeType, setMemeType] = useState("text");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputText && result) {
      setChatHistory((prev) => [...prev, { input: inputText, output: result, memeType }]);
    }
  }, [result]);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/generate-meme", {
        inputText,
        memeType,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error Generating Response", error);
      setResult("❌ Failed to generate meme. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#a020f046] text-white overflow-y-auto">
      {/* Sidebar */}
      <motion.div
        className="w-full md:w-[260px] bg-[#18002c] flex flex-col justify-between py-4 md:h-full"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <div className="flex justify-between items-center px-4">
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#40414f" }}
            className="w-[90%] bg-[#343541] text-white border border-white/20 py-2 px-3 rounded-md text-left hover:bg-[#40414f]"
          >
            + New chat
          </motion.button>

          {/* Toggle Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {(showMenu || window.innerWidth >= 768) && (
          <div className="flex flex-col px-4 text-sm space-y-3 mt-6 md:mt-0">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className="text-sm bg-[#343541] hover:bg-[#40414f] p-2 rounded cursor-pointer truncate"
                title={chat.input}
                onClick={() => {
                  setInputText(chat.input);
                  setResult(chat.output);
                  setMemeType(chat.memeType);
                }}
              >
                {chat.input}
              </div>
            ))}

            {["OpenAI Discord", "Updates & FAQ", "Log out"].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.08, color: "#fff", backgroundColor: "#343541" }}
                className="hover:underline text-left px-2 py-1 rounded"
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => {
                  if (item === "Log out") {
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    localStorage.clear();
                    sessionStorage.clear();
                    navigate("/login");
                  } else {
                    console.log(`${item} clicked`);
                  }
                }}
              >
                {item}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 flex flex-col justify-start md:justify-center items-center px-6 py-8 text-center"
        initial="hidden"
        animate="visible"
        variants={mainVariants}
      >
        <motion.h1
          className="text-3xl md:text-4xl mt-5 mb-6 font-semibold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 60 }}
        >
          XPD AI
          <h4 className="text-xs mt-3 font-bold">For Creating Memes With Inputs</h4>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-6 max-w-5xl w-full"
          variants={cardContainer}
          initial="hidden"
          animate="visible"
        ></motion.div>

        {/* Input */}
        <div className="w-full flex justify-center mt-auto">
          <TextInputSec inputText={inputText} setInputText={setInputText} />
        </div>

        {/* Meme Type Radio Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-4 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="memeType"
              value="text"
              checked={memeType === "text"}
              onChange={(e) => setMemeType(e.target.value)}
            />
            <span>Text Meme</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="memeType"
              value="image"
              checked={memeType === "image"}
              onChange={(e) => setMemeType(e.target.value)}
            />
            <span>Image Meme</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!inputText || !memeType || loading}
          className="mt-4 bg-purple-600 px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Meme"}
        </button>

        {/* Result Output */}
        {result && (
          <div className="mt-6 bg-[#1e1f25] p-4 rounded-md max-w-2xl w-full text-left overflow-x-auto">
            {memeType === "text" ? (
              <p>{result}</p>
            ) : (
              result.startsWith("http") ? (
                <img src={result} alt="Generated Meme" />
              ) : (
                <p>{result}</p>
              )
            )}
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-12 w-12 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <span className="text-white text-lg font-semibold">Generating your meme...</span>
            </div>
          </div>
        )}

        {/* Footer Text */}
        <motion.p
          className="text-xs mt-6 text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          XPD is in early preview. Built with AI to understand your humor and turn it into memes in seconds. Help us improve with your feedback!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HomeAI;
