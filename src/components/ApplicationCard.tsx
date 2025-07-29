import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusFilterEnum } from "@/lib/enum"

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{application.jobTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{application.company}</p>
        <span className="inline-block mt-2 text-sm font-medium capitalize">
          Status: {application.status}
        </span>
      </CardContent>
    </Card>
  )
}

type ApplicationCardProps = {
  application: {
    id: string
    company: string
    jobTitle: string
    status: StatusFilterEnum
  }
}
