"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
  { name: "Account Settings", path: "/setting/account" },
  { name: "Security", path: "/setting/security" },
  { name: "Theme", path: "/setting/theme" },
]

export default function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-gray-700 h-full rounded-xl p-4">
      {menu.map((item) => (
        <Link key={item.path} href={item.path}>
          <div
            className={` text-white p-3 rounded-lg mb-2 cursor-pointer
            ${pathname === item.path ? "bg-slate-600 shadow font-semibold" : "hover:bg-gray-400"}`}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  )
}
