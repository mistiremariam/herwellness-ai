import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "🌸 Hi lovely! I’m your wellness companion. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();

      const botMessage = {
        role: "bot",
        text: data.answer || "✨ I'm here for you! Try a deep breath and a glass of water 💧",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Sorry, I couldn’t connect right now. Try again later!" },
      ]);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-6 rounded-3xl shadow-lg bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex flex-col h-[70vh]"
    >
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
        🤖 Wellness ChatBot
      </h2>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-3 rounded-2xl bg-white shadow-inner">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.role === "user" ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              m.role === "user"
                ? "bg-pink-300 text-white self-end ml-auto"
                : "bg-purple-100 text-gray-800 self-start"
            }`}
          >
            {m.text}
          </motion.div>
        ))}
        {loading && (
          <p className="text-sm text-gray-400 italic">Bot is thinking… ✨</p>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border-2 border-pink-200 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-2xl shadow-md hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </motion.div>
  );
}
