// src/components/Nutrition.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Salad, Coffee, Apple, Flame } from "lucide-react";

const Nutrition = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const nutritionTips = {
    energy: [
      "Start your day with protein-rich breakfasts like eggs or Greek yogurt.",
      "Keep healthy snacks like nuts and fruit handy.",
      "Stay hydrated — water boosts energy levels.",
    ],
    balance: [
      "Aim for colorful meals: fruits, veggies, proteins, and whole grains.",
      "Practice mindful eating — slow down and enjoy your food.",
      "Limit processed sugar for steady energy and mood balance.",
    ],
    wellness: [
      "Incorporate herbal teas like chamomile or green tea.",
      "Journaling your meals helps track nutrition and emotions.",
      "Include iron-rich foods like spinach, beans, or lentils.",
    ],
  };

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        🌸 Nutrition & Meal Guidance
      </h2>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Food is fuel — and the right nutrition can balance energy, mood, and
        overall well-being. Choose a focus below and get quick, gentle tips
        crafted for women’s wellness.
      </p>

      {/* Goal Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
        <Card
          className={`cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition p-4 ${
            selectedGoal === "energy" ? "border-2 border-pink-400" : ""
          }`}
          onClick={() => setSelectedGoal("energy")}
        >
          <CardContent className="flex flex-col items-center text-center space-y-2">
            <Flame className="h-10 w-10 text-orange-500" />
            <h3 className="text-lg font-semibold">Boost Energy</h3>
            <p className="text-sm text-gray-500">
              Foods to stay active and vibrant.
            </p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition p-4 ${
            selectedGoal === "balance" ? "border-2 border-pink-400" : ""
          }`}
          onClick={() => setSelectedGoal("balance")}
        >
          <CardContent className="flex flex-col items-center text-center space-y-2">
            <Salad className="h-10 w-10 text-green-500" />
            <h3 className="text-lg font-semibold">Balanced Meals</h3>
            <p className="text-sm text-gray-500">
              Healthy and colorful plate ideas.
            </p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer rounded-2xl shadow-md hover:shadow-lg transition p-4 ${
            selectedGoal === "wellness" ? "border-2 border-pink-400" : ""
          }`}
          onClick={() => setSelectedGoal("wellness")}
        >
          <CardContent className="flex flex-col items-center text-center space-y-2">
            <Apple className="h-10 w-10 text-red-500" />
            <h3 className="text-lg font-semibold">Wellness Support</h3>
            <p className="text-sm text-gray-500">
              Foods for mood and self-care.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tips Display */}
      {selectedGoal && (
        <motion.div
          key={selectedGoal}
          className="max-w-2xl mx-auto bg-pink-50 p-6 rounded-2xl shadow-inner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">
            ✨ Tips for {selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {nutritionTips[selectedGoal].map((tip, index) => (
              <li key={index} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setSelectedGoal(null)}
              className="rounded-full px-6 bg-pink-500 hover:bg-pink-600 text-white shadow"
            >
              Choose Another Goal
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Nutrition;
