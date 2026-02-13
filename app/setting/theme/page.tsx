"use client"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light")

  // apply theme to html
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [theme])

  // load saved theme on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) setTheme(savedTheme)
  }, [])

  return (
    <div className="flex gap-6 p-4 border rounded-lg w-fit
                    bg-gray-200 dark:bg-gray-800
                    border-stone-950">

      {/* Light Radio */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={() => setTheme("light")}
        />
        <span className="text-black dark:text-white">Light</span>
      </label>

      {/* Dark Radio */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={() => setTheme("dark")}
        />
        <span className="text-black dark:text-white">Dark</span>
      </label>
    </div>
  )
}
