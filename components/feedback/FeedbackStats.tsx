"use client";

import { cn } from "@/lib/utils";

export interface FeedbackStatsProps {
  totalFeedback: number;
  underReview: number;
  planned: number;
  inProgress: number;
  completed: number;
  declined?: number;
  className?: string;
}

export interface FeedbackStatItem {
  label: string;
  value: number;
  accentColor?: boolean;
}

export function FeedbackStats({
  totalFeedback,
  underReview,
  planned,
  inProgress,
  completed,
  declined = 0,
  className,
}: FeedbackStatsProps) {
  const stats: FeedbackStatItem[] = [
    { label: "Total Feedback", value: totalFeedback, accentColor: true },
    { label: "Under Review", value: underReview },
    { label: "Planned", value: planned },
    { label: "In Progress", value: inProgress },
    { label: "Completed", value: completed },
    { label: "Declined", value: declined },
  ];

  return (
    <div className={cn("flex flex-wrap gap-6 p-4 bg-slate-900 border border-slate-800 rounded-xl", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="text-center min-w-[80px]">
          <div className={cn("text-2xl font-bold", stat.accentColor ? "text-emerald-400" : "text-slate-200")}>
            {stat.value}
          </div>
          <div className="text-xs text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
