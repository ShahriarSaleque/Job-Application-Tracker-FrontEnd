import "@/app/globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Job Application Tracker",
  description: "Track and manage your job applications",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-background font-sans", inter.className)}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
