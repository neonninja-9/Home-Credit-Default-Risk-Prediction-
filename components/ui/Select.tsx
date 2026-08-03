"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: any) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  label?: string;
  theme?: "violet" | "teal";
}

export function CustomSelect({
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className,
  label,
  theme = "violet",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  const isViolet = theme === "violet";

  return (
    <div className="w-full flex flex-col gap-1.5 relative" ref={containerRef}>
      {label && (
        <label className="text-xs font-medium text-white/70">
          {label}
        </label>
      )}

      {/* Select Trigger Box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-3.5 rounded-xl bg-void-canvas text-bone text-sm flex items-center justify-between transition-all duration-200 cursor-pointer h-11",
          isViolet 
            ? "border border-dusk-violet/50 hover:border-dusk-violet hover:shadow-[0_0_12px_rgba(107,98,242,0.25)]"
            : "border border-accent-teal/40 hover:border-accent-teal hover:shadow-[0_0_12px_rgba(45,212,191,0.25)]",
          isOpen && isViolet && "border-dusk-violet ring-1 ring-dusk-violet shadow-[0_0_15px_rgba(107,98,242,0.3)]",
          isOpen && !isViolet && "border-accent-teal ring-1 ring-accent-teal shadow-[0_0_15px_rgba(45,212,191,0.3)]",
          className
        )}
      >
        <span className="truncate font-sans text-sm">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-2",
            isViolet ? "text-dusk-violet" : "text-accent-teal",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute top-full left-0 right-0 z-50 overflow-hidden rounded-xl bg-graphite border p-1.5 backdrop-blur-xl max-h-60 overflow-y-auto shadow-[0_12px_36px_rgba(0,0,0,0.8)]",
              isViolet ? "border-dusk-violet/70 shadow-[0_0_20px_rgba(107,98,242,0.25)]" : "border-accent-teal/60 shadow-[0_0_20px_rgba(45,212,191,0.20)]"
            )}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full px-3 py-2.5 rounded-lg text-sm flex items-center justify-between text-left transition-colors cursor-pointer",
                    isSelected && isViolet && "bg-dusk-violet/25 text-white font-semibold border border-dusk-violet/40",
                    isSelected && !isViolet && "bg-accent-teal/20 text-white font-semibold border border-accent-teal/30",
                    !isSelected && "text-white/80 hover:text-white",
                    !isSelected && isViolet && "hover:bg-dusk-violet/15",
                    !isSelected && !isViolet && "hover:bg-accent-teal/15"
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check className={cn("w-4 h-4 flex-shrink-0 ml-2", isViolet ? "text-dusk-violet" : "text-accent-teal")} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
