import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, NotebookPen, Bot } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { name: "Journal", path: "/journal", icon: <NotebookPen size={20} /> },
    { name: "Dashboard", path: "/dashboard", icon: <BookOpen size={20} /> },
    { name: "Companion", path: "/chatbot", icon: <Bot size={20} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 shadow-md"
    >
      <div className="max-w-4xl mx-auto flex justify-around items-center py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 
              ${
                isActive
                  ? "bg-pink-400 text-white shadow-lg"
                  : "text-gray-700 hover:bg-pink-100"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
