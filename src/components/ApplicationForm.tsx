"use client"

import { StatusFilterEnum } from "@/lib/enum"
import { Input } from "./ui/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select"
import { Button } from "./ui/button"
import {
  createApplication,
  updateApplication,
} from "@/app/dashboard/applications/actions"
import { useTransition } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { JobApplication } from "@/lib/types"
import { toast } from "sonner"

export default function ApplicationForm({
  initialData,
  onSuccess,
}: ApplicationFormProps) {
  const [isPending, startTransition] = useTransition()

  const queryClient = useQueryClient()

  const handleSubmit = async (formData: FormData) => {
    startTransition(() => {
      const response = initialData
        ? updateApplication(initialData.id, formData)
        : createApplication(formData)
      response
        .then(() => {
          toast("Application saved successfully", {
            description: initialData
              ? "Your application has been updated."
              : "Your application has been created.",
          })
          onSuccess?.()
          // revalidate the applications list
          queryClient.invalidateQueries({ queryKey: ["applications"] })
        })
        .catch((error) => {
          // Handle error
          console.error("Failed to create application:", error)
        })
    })
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="company"
        placeholder="Enter Company Name"
        defaultValue={initialData?.company}
      />
      <Input
        type="text"
        name="position"
        placeholder="Enter Job Title"
        defaultValue={initialData?.position}
      />

      <Select name="status" defaultValue={initialData?.status}>
        <SelectTrigger>
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={StatusFilterEnum.Applied}>Applied</SelectItem>
          <SelectItem value={StatusFilterEnum.Interviewing}>
            Interviewing
          </SelectItem>
          <SelectItem value={StatusFilterEnum.Offer}>Offer</SelectItem>
          <SelectItem value={StatusFilterEnum.Rejected}>Rejected</SelectItem>
          <SelectItem value={StatusFilterEnum.Processed}>Processed</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending
          ? "Creating..."
          : initialData
          ? "Update Application"
          : "Create Application"}
      </Button>
    </form>
  )
}

type ApplicationFormProps = {
  initialData?: JobApplication
  onSuccess?: () => void
}
