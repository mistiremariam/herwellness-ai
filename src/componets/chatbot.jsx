import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { getAuth } from "firebase/auth";

// Dummy responses (replace with real AI API later)
const BOT_RESPONSES = [
  "Hi lovely 💖 How are you feeling today?",
  "Remember to take a deep breath 🌸 You’re stronger than you think!",
  "Staying hydrated is self-care too 💧✨",
  "Journaling before bed helps calm the mind 📝💕",
  "Would you like a short mindfulness exercise? 🌿"
];

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey queen 👑 Welcome to HerWellness AI ✨ How can I support you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const auth = getAuth();
  const user = auth.currentUser;

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending user message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse =
        BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      setMessages((prev) => [...prev, { sender: "bot", text: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-pink-50 to-rose-100 rounded-2xl shadow-xl p-6 w-full max-w-lg mx-auto flex flex-col h-[600px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-rose-200">
        <h2 className="text-xl font-bold text-rose-700">
          🌸 HerWellness AI – Chat
        </h2>
        {user && (
          <span className="text-sm text-gray-600">
            Logged in as <b>{user.displayName || user.email}</b>
          </span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-pink-100">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {msg.sender === "bot" && (
              <div className="bg-rose-300 text-white p-3 rounded-2xl rounded-tl-none shadow-md flex items-center gap-2 max-w-xs">
                <FaRobot className="text-white" />
                <span>{msg.text}</span>
              </div>
            )}
            {msg.sender === "user" && (
              <div className="bg-pink-500 text-white p-3 rounded-2xl rounded-tr-none shadow-md flex items-center gap-2 max-w-xs">
                <span>{msg.text}</span>
                <FaUser className="text-white" />
              </div>
            )}
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-rose-500">
            <FaRobot />
            <span className="italic animate-pulse">typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 border-t border-rose-200 pt-3">
        <input
          type="text"
          placeholder="Write your thoughts... 🌷"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleSend}
          className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-xl shadow-lg transition-all"
        >
          <FaPaperPlane />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBot;
