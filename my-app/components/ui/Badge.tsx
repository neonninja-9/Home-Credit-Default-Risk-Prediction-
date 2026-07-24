import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "tag" | "feature"
}

function Badge({ className, variant = "tag", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 caption",
        {
          "bg-surface-soft text-ink": variant === "tag",
          "bg-primary text-on-primary": variant === "feature",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
