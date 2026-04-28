"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type FeedbackStatus = "all" | "under_review" | "planned" | "in_progress" | "completed" | "declined";
export type FeedbackSortBy = "votes" | "newest" | "oldest";

export interface FeedbackFiltersProps {
  selectedStatus: FeedbackStatus;
  onStatusChange: (status: FeedbackStatus) => void;
  sortBy: FeedbackSortBy;
  onSortChange: (sortBy: FeedbackSortBy) => void;
  className?: string;
}

const statusTabs: { value: FeedbackStatus; label: string }[] = [
  { value: "all", label: "Semua" },
  { value: "under_review", label: "Under Review" },
  { value: "planned", label: "Planned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "declined", label: "Declined" },
];

const sortOptions: { value: FeedbackSortBy; label: string }[] = [
  { value: "votes", label: "Most Votes" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export function FeedbackFilters({
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  className,
}: FeedbackFiltersProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 items-start sm:items-center", className)}>
      <Tabs
        value={selectedStatus}
        onValueChange={(value) => onStatusChange(value as FeedbackStatus)}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid grid-cols-3 sm:flex sm:flex-row gap-1 sm:gap-0 h-auto sm:h-9 bg-transparent p-0">
          {statusTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-3 py-1.5 text-xs sm:text-sm rounded-md data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground capitalize"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-muted-foreground hidden sm:block">Sort:</span>
        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as FeedbackSortBy)}
        >
          <SelectTrigger className="w-full sm:w-[140px] bg-card border-border text-foreground/80">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-foreground/80 focus:bg-muted focus:text-foreground"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
