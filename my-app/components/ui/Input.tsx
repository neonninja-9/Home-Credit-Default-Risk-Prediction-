import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const id = React.useId()
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-ink dark:text-on-dark">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            "flex w-full rounded-md border border-hairline-light bg-canvas-light px-4 py-3.5 h-14 text-ink body-md file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-mute focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-accent-danger focus-visible:ring-accent-danger",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-accent-danger">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
