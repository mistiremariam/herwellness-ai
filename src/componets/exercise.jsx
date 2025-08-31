// src/components/Exercise.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Leaf, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const workouts = [
  {
    id: 1,
    title: "Yoga Flow",
    desc: "Gentle stretches & mindfulness to relax your body and mind.",
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    calories: "100–150 kcal",
    duration: "20 mins",
    color: "from-green-200 to-green-400",
  },
  {
    id: 2,
    title: "Cardio Blast",
    desc: "Light jogging, dance cardio or skipping for heart health.",
    icon: <HeartPulse className="w-8 h-8 text-pink-500" />,
    calories: "200–300 kcal",
    duration: "30 mins",
    color: "from-pink-200 to-pink-400",
  },
  {
    id: 3,
    title: "Strength Basics",
    desc: "Bodyweight or light dumbbell exercises for muscle tone.",
    icon: <Dumbbell className="w-8 h-8 text-purple-500" />,
    calories: "150–250 kcal",
    duration: "25 mins",
    color: "from-purple-200 to-purple-400",
  },
  {
    id: 4,
    title: "Fat Burn HIIT",
    desc: "Quick bursts of movement with short rests to burn fat.",
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    calories: "250–400 kcal",
    duration: "15 mins",
    color: "from-orange-200 to-orange-400",
  },
];

export default function Exercise() {
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState([]);

  const handleStart = (workout) => {
    setSelected(workout);
  };

  const handleComplete = () => {
    if (selected) {
      setCompleted([...completed, selected.id]);
      setSelected(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        ✨ Exercise & Move
      </h2>

      {/* Workout Options */}
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((w) => (
            <motion.div
              key={w.id}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
              onClick={() => handleStart(w)}
            >
              <Card className="rounded-2xl shadow-md bg-gradient-to-br p-1 ${w.color}">
                <CardContent className="bg-white rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {w.icon}
                    <h3 className="text-lg font-semibold text-gray-800">{w.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{w.desc}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>⏱ {w.duration}</span>
                    <span>🔥 {w.calories}</span>
                  </div>
                  {completed.includes(w.id) && (
                    <span className="text-xs text-green-500 font-medium mt-2">
                      ✅ Completed
                    </span>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Selected Workout */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 max-w-md mx-auto"
        >
          <Card className="rounded-2xl shadow-lg bg-white p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600">{selected.title}</h3>
            <p className="text-gray-600 mt-2">{selected.desc}</p>
            <p className="mt-3 text-sm text-gray-500">⏱ {selected.duration} | 🔥 {selected.calories}</p>
            
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                className="rounded-full px-6 py-2 border-pink-400 text-pink-500 hover:bg-pink-100"
                onClick={() => setSelected(null)}
              >
                Back
              </Button>
              <Button
                className="rounded-full px-6 py-2 bg-pink-500 text-white hover:bg-pink-600"
                onClick={handleComplete}
              >
                Mark as Done ✨
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
