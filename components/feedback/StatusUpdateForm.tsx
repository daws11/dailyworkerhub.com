"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { useUpdateFeedbackStatus } from "@/lib/feedback/mutation-hooks"
import { toast } from "sonner"

interface StatusOption {
  value: string
  label: string
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: "under_review", label: "Under Review" },
  { value: "planned", label: "Planned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "declined", label: "Declined" },
]

interface StatusUpdateFormProps {
  feedbackId: string
  currentStatus: string
  isAdmin: boolean
  onStatusChange?: (newStatus: string) => void
}

export function StatusUpdateForm({
  feedbackId,
  currentStatus,
  isAdmin,
  onStatusChange,
}: StatusUpdateFormProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateStatusMutation = useUpdateFeedbackStatus()

  const handleStatusChange = async (newStatus: string) => {
    if (!isAdmin) {
      toast.error("Only admins can update status")
      return
    }

    setIsUpdating(true)
    setSelectedStatus(newStatus)

    updateStatusMutation.mutate(
      { id: feedbackId, status: newStatus as "under_review" | "planned" | "in_progress" | "completed" | "declined" },
      {
        onSuccess: () => {
          toast.success("Status updated successfully")
          onStatusChange?.(newStatus)
          setIsUpdating(false)
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update status")
          setSelectedStatus(currentStatus) // Revert on error
          setIsUpdating(false)
        },
      }
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Status:</span>
      <Select value={selectedStatus} onValueChange={handleStatusChange} disabled={isUpdating}>
        <SelectTrigger className="w-[140px] h-7 text-xs">
          {isUpdating ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <SelectValue />
          )}
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {selectedStatus === option.value && (
                  <Check className="h-3 w-3 text-emerald-500" />
                )}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}