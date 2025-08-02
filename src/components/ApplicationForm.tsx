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
import { JobApplication, PayloadType } from "@/lib/types"
import { toast } from "sonner"

export default function ApplicationForm({
  initialData,
  onSuccess,
}: ApplicationFormProps) {
  const [isPending, startTransition] = useTransition()

  const queryClient = useQueryClient()

  const API_BASE = process.env.NEXT_PUBLIC_API_URL

  const handleSubmit = async (formData: FormData) => {
    const resumeFile = formData.get("resume") as File

    const payload: PayloadType = {
      company: formData.get("company"),
      position: formData.get("position"),
      status: formData.get("status"),
    }

    // if a resume file is provided
    // call the api to generate a presigned url
    // to upload to the s3 bucket
    // and attach the returned url to the payload
    if (resumeFile) {
      // Get the presigned URL from the server
      const preSignedUrl = await fetch(`${API_BASE}/generate-pre-signed-url`, {
        method: "POST",
        body: JSON.stringify({
          fileName: resumeFile.name,
          contentType: resumeFile.type,
        }),
      })

      if (!preSignedUrl.ok) {
        console.log("Error fetching pre-signed URL:", preSignedUrl)
        throw new Error("Failed to get pre-signed URL")
      }

      const { signedUrl, fileUrl } = await preSignedUrl.json()

      console.log("Received signed URL:", signedUrl)
      console.log("Received file URL:", fileUrl)

      // Upload the file to S3 using the pre-signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": resumeFile.type,
        },
        body: resumeFile,
      })

      if (!uploadResponse.ok) {
        console.log("Error uploading file to S3:", uploadResponse)
        throw new Error("Failed to upload file to S3")
      }

      // Attach the file URL to the payload
      payload.resume = fileUrl
    }

    startTransition(() => {
      const response = initialData
        ? updateApplication(initialData.id, payload)
        : createApplication(payload)
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

      <Input type="file" name="resume" accept=".pdf" />

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
