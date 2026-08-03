import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "feature-light" | "feature-dark" | "plan" | "plan-featured" | "glass"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "feature-dark", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-cards p-[28px] text-body",
          {
            "bg-graphite text-bone": variant === "feature-light" || variant === "feature-dark" || variant === "plan",
            "bg-snow-white text-void-canvas": variant === "plan-featured",
            "bg-frosted-glass backdrop-blur-sm text-bone border border-hairline": variant === "glass"
          },
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card }
