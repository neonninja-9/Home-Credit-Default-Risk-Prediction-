import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "soft" | "outline-light" | "outline-dark" | "pill-sm"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-canvas-light text-canvas-dark rounded-full px-7 h-12 button-md hover:bg-faint": variant === "primary",
            "bg-canvas-dark text-on-dark rounded-full px-7 h-12 button-md hover:bg-surface-elevated": variant === "dark",
            "bg-surface-soft text-ink rounded-full px-7 h-12 button-md hover:bg-faint": variant === "soft",
            "bg-canvas-light text-ink border border-hairline-strong rounded-full px-[27px] h-12 button-md hover:bg-surface-soft": variant === "outline-light",
            "bg-canvas-dark text-on-dark border border-on-dark rounded-full px-[27px] h-12 button-md hover:bg-surface-elevated": variant === "outline-dark",
            "bg-surface-soft text-ink rounded-full px-4 h-9 button-sm hover:bg-faint": variant === "pill-sm",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
