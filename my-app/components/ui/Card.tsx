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
          "rounded-lg p-8 body-md",
          {
            "bg-surface-card text-ink border border-hairline-light": variant === "feature-light",
            "bg-surface-elevated text-on-dark": variant === "feature-dark" || variant === "plan",
            "bg-primary text-on-primary": variant === "plan-featured",
            "glass text-on-dark": variant === "glass"
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
