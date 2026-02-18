"use client"
import { useEffect, useState } from "react"
import { useTheme } from "./context/context"

export default function ThemeSwitcher() {

const  { theme, setThemeMode }  = useTheme()
  


  return (
    <div className="flex gap-6 p-4 border rounded-lg w-fit
                    bg-gray-200 dark:bg-gray-800
                    border-stone-950">

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onChange={() => setThemeMode("light")}
        />
        <span className="text-black dark:text-white">Light</span>
      </label>


      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onChange={() => setThemeMode("dark")}
        />
        <span className="text-black dark:text-white">Dark</span>
      </label>
    </div>
  )
}







  // const [theme, setTheme] = useState("light")


  // useEffect(() => {
  //   const root = window.document.documentElement
  //   if (theme === "dark") {
  //     root.classList.add("dark")
  //     localStorage.setItem("theme", "dark")
  //   } else {
  //     root.classList.remove("dark")
  //     localStorage.setItem("theme", "light")
  //   }
  // }, [theme])

  //   useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme")
  //   if (savedTheme) setTheme(savedTheme)
  // }, [])