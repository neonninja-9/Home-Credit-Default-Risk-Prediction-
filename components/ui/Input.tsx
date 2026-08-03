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
          <label htmlFor={id} className="text-sm font-medium text-bone">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            "flex w-full rounded-ui border border-hairline bg-void-canvas px-4 py-3.5 h-12 text-bone text-body file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-smoke focus-visible:outline-none focus-visible:border-dusk-violet focus-visible:ring-1 focus-visible:ring-dusk-violet transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
