import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">📋 Job Tracker</h1>
      <Button variant="outline">Settings</Button>
    </header>
  )
}
