"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

import { ButtonVariant as ToggleFullVariant, BaseColor as ToggleFullColor, BaseSize as ToggleFullSize } from "@/types/ui";

interface NavOption {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface ToggleFullProps {
  options: NavOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: ToggleFullVariant;
  color?: ToggleFullColor;
  size?: ToggleFullSize;
  className?: string;
}

export const ToggleFull = React.forwardRef<HTMLDivElement, ToggleFullProps>(
  (
    {
      options,
      value,
      onChange,
      variant = "light",
      color = "primary",
      size = "md",
      className = "",
    },
    ref
  ) => {
    // Size mapping (matching Button component)
    const sizeStyles = {
      "2xs": "px-3 py-0.5 text-[0.6rem] radius-sm min-h-[1.25rem]",
      xs: "px-3.5 py-0.5 text-[0.7rem] radius-sm min-h-[1.5rem]",
      sm: "px-4 py-1 text-xs radius-sm min-h-[1.75rem]",
      md: "px-4.5 py-1 text-xs radius-sm min-h-[2rem]",
      lg: "px-5.5 py-2 text-sm radius-sm min-h-[2.5rem]",
    };

    const containerPadding = {
      "2xs": "p-0.5",
      xs: "p-0.5",
      sm: "p-0.5",
      md: "p-0.5",
      lg: "p-1",
    }[size];

    // Color mapping (matching Button component)
    const colorVars = {
      primary: "var(--primary-500)",
      secondary: "var(--secondary-500)",
      accent: "var(--accent-500)",
      neutral: "var(--foreground)",
    }[color];

    const colorLightHover = {
      primary: "var(--primary-200)",
      secondary: "var(--secondary-200)",
      accent: "var(--accent-200)",
      neutral: "var(--neutral-300)",
    }[color];

    // Base container styles
    const containerBase =
      "inline-flex items-center gap-1 bg-background/50 backdrop-blur-sm border stroke-light border-neutral-200 shadow-sm transition-all duration-300";
    const containerRadius = size === "lg" ? "radius-lg" : "radius-md";

    const getActiveStyles = (v: ToggleFullVariant) => {
      switch (v) {
        case "solid":
          return "bg-[color:var(--group-color)] text-background shadow-sm";
        case "outline":
          return "border-2 border-[color:var(--group-color)] text-[color:var(--group-color)] bg-[color:var(--group-color)]/5";
        case "light":
          return "bg-[color:var(--group-bg-active)] text-[color:var(--group-color)] border border-[color:var(--group-color)]/30";
        case "underline":
          return "border-b-2 border-[color:var(--group-color)] text-[color:var(--group-color)] px-1";
        case "ghost":
          return "bg-[color:var(--group-color)]/10 text-[color:var(--group-color)] font-semibold";
        default:
          return "";
      }
    };

    return (
      <div
        ref={ref}
        className={`${containerBase} ${containerRadius} ${containerPadding} ${className}`}
        style={
          {
            "--group-color": colorVars,
            "--group-bg-active": colorLightHover,
          } as React.CSSProperties
        }
      >
        {options.map((option) => {
          const isActive = option.value === value;
          const Icon = option.icon;

          const iconSizes = {
            "2xs": "w-2.5 h-2.5 shrink-0",
            xs: "w-3 h-3 shrink-0",
            sm: "w-3.5 h-3.5 shrink-0",
            md: "w-4 h-4 shrink-0",
            lg: "w-5 h-5 shrink-0",
          };

          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                flex items-center justify-center gap-2 transition-all duration-200 font-medium
                ${sizeStyles[size]}
                ${
                  isActive
                    ? getActiveStyles(variant)
                    : "text-neutral-500 hover:text-[color:var(--group-color)] hover:bg-neutral-100/50"
                }
              `}
            >
              {Icon && <Icon className={iconSizes[size]} />}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

ToggleFull.displayName = "ToggleFull";
