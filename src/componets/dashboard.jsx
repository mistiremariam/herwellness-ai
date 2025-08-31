import { useEffect, useState } from "react";
import { db } from "../firebase"; // <-- your firebase config
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const q = query(collection(db, "journalEntries"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      setEntries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchEntries();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        📖 My Journal Timeline
      </h2>

      {entries.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No entries yet... Start journaling today 🌸
        </p>
      ) : (
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start space-x-4"
            >
              {/* Timeline Dot */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center text-white shadow-md">
                  {entry.mood || "🤍"}
                </div>
                <div className="w-1 h-full bg-pink-200 mt-1"></div>
              </div>

              {/* Journal Card */}
              <div className="flex-1 p-5 rounded-3xl bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100 shadow-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
                <p className="mt-3 text-sm text-gray-500 text-right">
                  {new Date(entry.date).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
