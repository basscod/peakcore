"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

type ToggleVariant = "solid" | "outline" | "light" | "underline" | "ghost";
type ToggleColor = "primary" | "secondary" | "accent" | "neutral";
type ToggleSize = "2xs" | "xs" | "sm" | "md" | "lg";

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  color?: ToggleColor;
  size?: ToggleSize;
  icon?: LucideIcon;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed,
      onPressedChange,
      variant = "light",
      color = "primary",
      size = "md",
      icon: Icon,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    // Size mapping
    const sizeStyles = {
      "2xs": "px-1 py-0.5 text-[0.6rem] radius-sm min-h-[1.25rem]",
      xs: "px-1.5 py-0.5 text-[0.7rem] radius-sm min-h-[1.5rem]",
      sm: "px-2 py-1 text-xs radius-sm min-h-[1.75rem]",
      md: "px-3 py-1.5 text-sm radius-sm min-h-[2.25rem]",
      lg: "px-4 py-2 text-base radius-md min-h-[2.75rem]",
    };

    // Color mapping (matching Button)
    const colorVars = {
      primary: "var(--primary-500)",
      secondary: "var(--secondary-500)",
      accent: "var(--accent-500)",
      neutral: "var(--foreground)",
    }[color];

    const colorLightBg = {
      primary: "var(--primary-100)",
      secondary: "var(--secondary-100)",
      accent: "var(--accent-100)",
      neutral: "var(--neutral-200)",
    }[color];

    const colorLightHover = {
      primary: "var(--primary-200)",
      secondary: "var(--secondary-200)",
      accent: "var(--accent-200)",
      neutral: "var(--neutral-300)",
    }[color];

    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    // Border radius for icon-only
    const isIconOnly = !children;
    const iconOnlyStyles = isIconOnly
      ? {
          "2xs": "p-0.5 w-5 h-5",
          xs: "p-0.5 w-6 h-6",
          sm: "p-1 w-7 h-7",
          md: "p-1.5 w-9 h-9",
          lg: "p-2 w-11 h-11",
        }[size]
      : "";

    // Unified Variant Logic (Reverted to previous interactive model)
    const getVariantClasses = () => {
      if (pressed) {
        return {
          solid: "bg-[color:var(--toggle-color)] text-background shadow-sm",
          outline: "border-2 border-[color:var(--toggle-color)] text-[color:var(--toggle-color)] bg-[color:var(--toggle-color)]/5",
          light: "bg-[color:var(--toggle-bg-light)] text-[color:var(--toggle-color)] border border-[color:var(--toggle-color)]/30",
          underline: "border-b-2 border-[color:var(--toggle-color)] text-[color:var(--toggle-color)] px-1",
          ghost: "bg-[color:var(--toggle-color)]/10 text-[color:var(--toggle-color)] font-semibold",
        }[variant];
      }

      return {
        solid: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 shadow-sm",
        outline: "border-2 border-neutral-200 text-neutral-500 hover:border-[color:var(--toggle-color)] hover:text-[color:var(--toggle-color)] bg-transparent",
        light: "bg-neutral-100/30 border stroke-light border-neutral-200 text-neutral-500 hover:bg-neutral-100/60 hover:text-[color:var(--toggle-color)] hover:border-neutral-300",
        underline: "border-b-2 border-transparent text-neutral-500 hover:text-[color:var(--toggle-color)] hover:border-neutral-200 px-1",
        ghost: "text-neutral-500 hover:text-[color:var(--toggle-color)] hover:bg-neutral-100/50",
      }[variant];
    };

    const customStyles = {
      "--toggle-color": colorVars,
      "--toggle-bg-light": pressed ? colorLightHover : colorLightBg,
    } as React.CSSProperties;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        onClick={(e) => {
          props.onClick?.(e);
          onPressedChange?.(!pressed);
        }}
        className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${iconOnlyStyles}
          ${getVariantClasses()}
          ${className}
        `}
        style={customStyles}
        {...props}
      >
        {Icon && <Icon className={size === "2xs" || size === "xs" ? "w-3 h-3" : "w-4 h-4"} />}
        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";
