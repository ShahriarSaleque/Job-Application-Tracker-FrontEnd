import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm p-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold">
        📋 Job Tracker
      </Link>
      <Button variant="outline">Settings</Button>
    </header>
  )
}
