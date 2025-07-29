import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusFilterEnum } from "@/lib/enum"

export default function SelectComponent({
  statusFilter,
  setStatusFilter,
}: SelectComponentProps) {
  return (
    <div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={StatusFilterEnum.All}>All</SelectItem>
          <SelectItem value={StatusFilterEnum.Applied}>Applied</SelectItem>
          <SelectItem value={StatusFilterEnum.Interviewing}>
            Interviewing
          </SelectItem>
          <SelectItem value={StatusFilterEnum.Offer}>Offer</SelectItem>
          <SelectItem value={StatusFilterEnum.Rejected}>Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

type SelectComponentProps = {
  statusFilter: StatusFilterEnum
  setStatusFilter: (filter: StatusFilterEnum) => void
}
