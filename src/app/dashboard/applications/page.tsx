"use client"
import ApplicationCard from "@/components/ApplicationCard"
import ApplicationForm from "@/components/ApplicationForm"
import LoadingSpinner from "@/components/LoadingSpinner"
import SelectComponent from "@/components/SelectComponent"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatusFilterEnum } from "@/lib/enum"
import { useApplications } from "@/lib/hooks/useApplication"

import { useApplicationFilterStore } from "@/lib/zustandStore"
import { useState } from "react"

export default function ApplicationsPage() {
  const { statusFilter, setStatusFilter } = useApplicationFilterStore()
  const [open, setOpen] = useState(false)

  const { data: application = [], isLoading, error } = useApplications()

  const filtered =
    statusFilter === StatusFilterEnum.All
      ? application
      : application.filter((a) => a.status === statusFilter)

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
        {filtered.length !== 0
          ? filtered.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))
          : !isLoading && (
              <span className="text-neutral-700">No applications found</span>
            )}
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <p>Error fetching data</p>}

      {/* show application form */}
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Create Application</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Create a new application</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new job application.
            </DialogDescription>
            <ApplicationForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
