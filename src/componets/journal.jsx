import { useState } from "react";
import { db } from "../firebase"; // <-- your firebase config
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion"; // for smooth animations

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("😊");
  const [loading, setLoading] = useState(false);

  const saveEntry = async () => {
    if (!entry.trim()) return alert("Please write something 🌸");

    setLoading(true);
    await addDoc(collection(db, "journalEntries"), {
      text: entry,
      mood: mood,
      date: new Date().toISOString(),
    });
    setEntry("");
    setMood("😊");
    setLoading(false);
    alert("Journal saved successfully ✨");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-6 rounded-3xl shadow-lg bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"
    >
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
        🌸 Daily Journal
      </h2>

      {/* Mood Selector */}
      <div className="flex justify-center space-x-3 mb-4">
        {["😊", "😟", "💪", "😴", "🤍"].map((emoji) => (
          <button
            key={emoji}
            onClick={() => setMood(emoji)}
            className={`text-2xl p-2 rounded-full transition ${
              mood === emoji
                ? "bg-pink-300 shadow-md"
                : "hover:bg-pink-200"
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Text Area */}
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts here… ✍️"
        className="w-full h-40 p-4 border-2 border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
      />

      {/* Save Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={saveEntry}
        disabled={loading}
        className="w-full mt-4 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-pink-400 to-purple-400 shadow-md hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-60"
      >
        {loading ? "Saving..." : "✨ Save Entry"}
      </motion.button>
    </motion.div>
  );
}
