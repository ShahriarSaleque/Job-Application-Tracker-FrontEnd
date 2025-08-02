"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobApplication } from "@/lib/types"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import ApplicationForm from "./ApplicationForm"
import { deleteApplication } from "@/app/dashboard/applications/actions"
import { useQueryClient } from "@tanstack/react-query"
import { DialogTitle } from "@radix-ui/react-dialog"

import AlertDialogComponent from "./AlertDialogComponent"
import { toast } from "sonner"

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    await deleteApplication(application.id)

    toast("Application Deleted", {
      description: "Your application has been updated.",
    })

    // invalidate the applications list
    queryClient.invalidateQueries({ queryKey: ["applications"] })
  }
  return (
    <Card>
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle>{application.position}</CardTitle>
          <p className="text-muted-foreground mt-2">{application.company}</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Application</DialogTitle>
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

        {/* Alert dialog for delete */}
        <AlertDialogComponent
          alertDialogTitle="Are you sure?"
          alertDialogDescription="This action cannot be undone. The application will be permanently deleted."
          alertDialogActionText="Delete"
          onClick={handleDelete}
        />

        {application.resume && <span>Resume Uploaded</span>}
      </CardContent>
    </Card>
  )
}

type ApplicationCardProps = {
  application: JobApplication
}
