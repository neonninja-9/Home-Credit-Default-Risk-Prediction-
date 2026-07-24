"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const HighlightContext = React.createContext<{
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  highlightClassName?: string
  highlightStyle?: React.CSSProperties
} | null>(null)

export function Highlight({ children, className, containerClassName, style }: any) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  
  return (
    <HighlightContext.Provider value={{ hoveredId, setHoveredId, highlightClassName: className, highlightStyle: style }}>
      <div 
        className={cn("relative", containerClassName)} 
        onMouseLeave={() => setHoveredId(null)}
      >
        {children}
      </div>
    </HighlightContext.Provider>
  )
}

export const HighlightItem = React.forwardRef<HTMLElement, any>(
  ({ children, asChild, className, ...props }, ref) => {
    const context = React.useContext(HighlightContext)
    const id = React.useId()
    
    const isHovered = context?.hoveredId === id

    // Extract children content depending on asChild
    const content = React.isValidElement(children) ? (children.props as any).children : children

    const inner = (
      <>
        {content}
        {isHovered && context && (
          <motion.div
            layoutId="highlight-bg"
            className={cn("absolute inset-0 z-[-1]", context.highlightClassName)}
            style={context.highlightStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
          />
        )}
      </>
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ref,
        onMouseEnter: (e: any) => {
          context?.setHoveredId(id)
          children.props.onMouseEnter?.(e)
        },
        className: cn("relative z-10", children.props.className),
        children: inner
      } as any)
    }

    return (
      <span 
        ref={ref} 
        className={cn("relative z-10 inline-block", className)}
        onMouseEnter={() => context?.setHoveredId(id)}
        {...props}
      >
        {inner}
      </span>
    )
  }
)
HighlightItem.displayName = "HighlightItem"
