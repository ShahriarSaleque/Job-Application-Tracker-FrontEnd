import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobApplication } from "@/lib/types"

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{application.position}</CardTitle>
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
  application: JobApplication
}
