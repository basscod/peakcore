"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";

type DropdownVariant = "standard" | "outline" | "ghost" | "industrial";
type DropdownSize = "sm" | "md" | "lg";
type DropdownColor = "primary" | "secondary" | "accent" | "neutral";

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ElementType;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: DropdownVariant;
  size?: DropdownSize;
  color?: DropdownColor;
  icon?: React.ElementType;
  className?: string;
  expanding?: boolean; // Custom behavior requested for table toolbar
}

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  variant = "standard",
  size = "md",
  color = "neutral",
  icon: Icon,
  className = "",
  expanding = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const colorVars = {
    primary: "var(--primary-500)",
    secondary: "var(--secondary-500)",
    accent: "var(--accent-500)",
    neutral: "var(--neutral-400)",
  }[color];

  const sizeStyles = {
    sm: "h-8 px-3 text-[0.7rem]",
    md: "h-9 px-4.5 text-sm",
    lg: "h-11 px-6 text-base",
  }[size];

  const variantStyles = {
    standard: "bg-neutral-100 border-transparent hover:bg-neutral-200 text-neutral-800",
    outline: "bg-transparent border-2 border-neutral-200 hover:border-[color:var(--dropdown-color)] text-neutral-700",
    ghost: "bg-transparent border-transparent hover:bg-neutral-100 text-neutral-600",
    industrial: "bg-neutral-100/50 border-2 border-neutral-200 border-l-[6px] border-l-[color:var(--dropdown-color)] text-neutral-800 font-mono uppercase tracking-wider",
  }[variant];

  const customStyles = {
    "--dropdown-color": colorVars,
  } as React.CSSProperties;

  return (
    <div 
      ref={containerRef} 
      className={`relative inline-block ${expanding ? "" : "w-full"} ${className}`}
      style={customStyles}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 radius-md transition-all duration-300 outline-none overflow-hidden
          ${sizeStyles} ${variantStyles}
          ${expanding ? (isOpen || value ? "w-48 justify-between" : "w-10 px-0 justify-center") : "w-full justify-between"}
          ${(isOpen || value) && variant === "outline" ? "border-[color:var(--dropdown-color)]" : ""}
          ${value ? "bg-[color:var(--dropdown-color)]/10" : ""}
        `}
      >
        <div className={`flex items-center gap-2 ${expanding && !(isOpen || value) ? "justify-center" : ""}`}>
          {Icon && <Icon className={`shrink-0 ${size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} ${isOpen || value ? "text-[color:var(--dropdown-color)]" : "text-neutral-500"}`} />}
          <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${expanding && !(isOpen || value) ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        
        {(!expanding || isOpen || value) && (
          <ChevronDown 
            className={`
              shrink-0 transition-all duration-300
              ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}
              ${isOpen ? "rotate-180 text-[color:var(--dropdown-color)]" : (value ? "text-[color:var(--dropdown-color)]" : "text-neutral-400")}
            `} 
          />
        )}
      </button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-2 w-max min-w-full bg-background border-2 border-neutral-200 shadow-xl radius-md py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-64 overflow-auto px-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between gap-4 px-3 py-2 text-left text-[0.75rem] uppercase font-mono tracking-tighter radius-sm transition-colors
                  ${value === option.value ? "bg-[color:var(--dropdown-color)]/10 text-[color:var(--dropdown-color)]" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"}
                `}
              >
                <div className="flex items-center gap-2">
                  {option.icon && <option.icon className="w-3.5 h-3.5" />}
                  {option.label}
                </div>
                {value === option.value && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-4 py-3 text-xs text-neutral-400 italic font-mono uppercase">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
