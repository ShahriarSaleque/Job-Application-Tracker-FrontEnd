"use client"
import ApplicationCard from "@/components/ApplicationCard"
import ApplicationForm from "@/components/ApplicationForm"
import SelectComponent from "@/components/SelectComponent"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusFilterEnum } from "@/lib/enum"

import { useApplicationFilterStore } from "@/lib/zustandStore"

// Mock data - will be removed later
const mockData = [
  {
    id: "1",
    company: "Google",
    jobTitle: "Frontend Engineer",
    status: StatusFilterEnum.Applied,
  },
  {
    id: "2",
    company: "Amazon",
    jobTitle: "UI Developer",
    status: StatusFilterEnum.Interviewing,
  },
  {
    id: "3",
    company: "Netflix",
    jobTitle: "React Dev",
    status: StatusFilterEnum.Offer,
  },
]

export default function ApplicationsPage() {
  const { statusFilter, setStatusFilter } = useApplicationFilterStore()

  const filtered =
    statusFilter === StatusFilterEnum.All
      ? mockData
      : mockData.filter((a) => a.status === statusFilter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Job Application</h2>
      </div>
      <SelectComponent
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length !== 0 ? (
          filtered.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))
        ) : (
          <span className="text-neutral-700">No applications found</span>
        )}
      </div>

      {/* show application form */}
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Application</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create a new application</DialogTitle>
            <ApplicationForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
