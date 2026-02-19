"use client"
import { useTheme } from "@/app/setting/theme/context/context"
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

export default function ThemeSwitch() {
  const themeContext = useTheme()
  if (!themeContext) return null

  const { theme, toggleTheme } = themeContext

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center
                 bg-gray-200 dark:bg-gray-800
                 text-2xl transition-all duration-300
                 hover:scale-110 mb-2"
    >
      {theme === "light" ? <FaSun/> : <FaMoon/>}
    </button>
  )
}
