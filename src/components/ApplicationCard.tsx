"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobApplication } from "@/lib/types"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import ApplicationForm from "./ApplicationForm"
import { deleteApplication } from "@/app/dashboard/applications/actions"
import { useQueryClient } from "@tanstack/react-query"

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    await deleteApplication(application.id)

    // invalidate the applications list
    queryClient.invalidateQueries({ queryKey: ["applications"] })
  }
  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle>{application.position}</CardTitle>
          <p className="text-muted-foreground">{application.company}</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ApplicationForm
              initialData={application}
              onSuccess={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <span className="capitalize text-sm font-medium">
          Status: {application.status}
        </span>
        <Button size="sm" variant="destructive" onClick={handleDelete}></Button>
      </CardContent>
    </Card>
  )
}

type ApplicationCardProps = {
  application: JobApplication
}
