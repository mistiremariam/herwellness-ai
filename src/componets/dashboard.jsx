// src/components/Dashboard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Journal from "../src/components/Journal";
import Exercise from "../src/componets/Exercise";
import Nutrition from "../src/components/Nutrition";
import ChatBot from "../src/components/ChatBot";
import { FaJournal, FaDumbbell, FaAppleAlt, FaRobot } from "react-icons/fa";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("journal");

  const tabs = [
    { id: "journal", label: "Journal", icon: <FaJournal /> },
    { id: "exercise", label: "Exercise", icon: <FaDumbbell /> },
    { id: "nutrition", label: "Nutrition", icon: <FaAppleAlt /> },
    { id: "chatbot", label: "Chat AI", icon: <FaRobot /> },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "journal":
        return <Journal />;
      case "exercise":
        return <Exercise />;
      case "nutrition":
        return <Nutrition />;
      case "chatbot":
        return <ChatBot />;
      default:
        return <Journal />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="p-6 flex justify-center shadow-md bg-pink-100 rounded-b-3xl mb-6">
        <h1 className="text-3xl font-bold text-pink-600">
          🌸 HerWellness AI Dashboard
        </h1>
      </header>

      {/* Tab Navigation */}
      <motion.nav
        className="flex justify-center gap-4 mb-6 flex-wrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === tab.id
                ? "bg-pink-500 text-white shadow-lg"
                : "bg-white text-pink-500 hover:bg-pink-100"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </motion.nav>

      {/* Active Tab Content */}
      <motion.main
        className="px-6 pb-10"
        key={activeTab}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {renderActiveTab()}
      </motion.main>
    </div>
  );
}
