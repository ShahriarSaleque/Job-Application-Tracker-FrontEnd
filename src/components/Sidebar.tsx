"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/stats", label: "Stats" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r hidden md:block">
      <nav className="space-y-2">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "block px-3 py-2 rounded hover:bg-gray-200",
              pathname === href ? "bg-gray-300 font-medium" : ""
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
