import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "outline-dark" | "outline-light" | "dark" | "soft" | "pill-sm"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dusk-violet disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-snow-white text-void-canvas rounded-buttons px-6 h-10 text-sm font-semibold hover:opacity-90": variant === "primary",
            "bg-transparent text-bone border border-hairline rounded-buttons px-[27px] h-10 text-body hover:bg-frosted-glass": variant === "outline" || variant === "outline-dark" || variant === "outline-light",
            "bg-transparent text-bone/85 border border-hairline rounded-buttons px-4 h-9 text-caption hover:bg-frosted-glass": variant === "ghost" || variant === "pill-sm",
            "bg-graphite text-bone rounded-buttons px-7 h-12 text-body hover:bg-frosted-glass": variant === "dark" || variant === "soft",
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
