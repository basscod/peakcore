"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "standard" | "ghost" | "underline" | "filled";
type InputColor = "primary" | "secondary" | "accent" | "neutral";
type InputStatus = "default" | "error" | "success" | "warning";

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color" | "size"> {
  label?: string;
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  status?: InputStatus;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  helperText?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className = "",
      label,
      variant = "standard",
      color = "primary",
      size = "md",
      status = "default",
      iconLeft: IconLeft,
      iconRight: IconRight,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    // Color mapping
    const colorVars = {
      primary: "var(--primary-500)",
      secondary: "var(--secondary-500)",
      accent: "var(--accent-500)",
      neutral: "var(--foreground)",
    }[color];

    const statusColors = {
      default: "var(--neutral-500)",
      error: "var(--error)",
      success: "var(--success)",
      warning: "var(--warning)",
    }[status];

    // Size mapping (matching Button's wide vibe)
    const sizeStyles = {
      sm: {
        container: "min-h-[1.75rem] px-4 py-1 text-xs",
        iconLeft: "left-3.5",
        iconRight: "right-3.5",
        paddingLeft: IconLeft ? "pl-9" : "",
        paddingRight: IconRight ? "pr-9" : "",
        iconSize: "w-3.5 h-3.5",
      },
      md: {
        container: "min-h-[2.25rem] px-4.5 py-1.5 text-sm",
        iconLeft: "left-4",
        iconRight: "right-4",
        paddingLeft: IconLeft ? "pl-10" : "",
        paddingRight: IconRight ? "pr-10" : "",
        iconSize: "w-4 h-4",
      },
      lg: {
        container: "min-h-[2.75rem] px-5.5 py-2 text-base",
        iconLeft: "left-5",
        iconRight: "right-5",
        paddingLeft: IconLeft ? "pl-12" : "",
        paddingRight: IconRight ? "pr-12" : "",
        iconSize: "w-5 h-5",
      },
    }[size];

    // Base input container styles
    const containerBase = "group relative flex flex-col gap-1.5 w-full";
    const inputWrapperBase = "relative flex items-center transition-all duration-200 radius-md overflow-hidden";

    // Variant styles for the wrapper
    const variantStyles = {
      standard: `border-2 stroke-normal border-neutral-500 bg-transparent focus-within:border-[color:var(--input-color)]`,
      ghost: `border-2 border-transparent bg-transparent focus-within:border-[color:var(--input-color)]`,
      underline: `border-b-2 radius-none border-neutral-500 bg-transparent focus-within:border-[color:var(--input-color)]`,
      filled: `border-2 border-transparent bg-[color-mix(in_srgb,var(--input-color),transparent_90%)] focus-within:border-[color:var(--input-color)]`,
    }[variant];

    // Status overrides
    const statusStyles = status !== "default" ? `!border-[color:var(--status-color)]` : "";

    // Input itself
    const inputBase =
      "w-full bg-transparent outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50";

    const customStyles = {
      "--input-color": colorVars,
      "--status-color": statusColors,
    } as React.CSSProperties;

    return (
      <div className={`${containerBase} ${className}`} style={customStyles}>
        {label && (
          <label className="caption text-neutral-500 group-focus-within:text-[color:var(--input-color)] transition-colors">
            {label}
          </label>
        )}

        <div className={`${inputWrapperBase} ${variantStyles} ${statusStyles} ${sizeStyles.container} ${disabled ? "opacity-50" : ""}`}>
          {IconLeft && (
            <IconLeft className={`absolute ${sizeStyles.iconLeft} ${sizeStyles.iconSize} text-neutral-500 group-focus-within:text-[color:var(--input-color)] transition-colors`} />
          )}

          <input
            ref={ref}
            className={`${inputBase} ${sizeStyles.paddingLeft} ${sizeStyles.paddingRight}`}
            disabled={disabled}
            {...props}
          />

          {IconRight && (
            <IconRight className={`absolute ${sizeStyles.iconRight} ${sizeStyles.iconSize} text-neutral-500 group-focus-within:text-[color:var(--input-color)] transition-colors`} />
          )}
        </div>

        {helperText && (
          <p className={`text-[0.7rem] ${status !== "default" ? "text-[color:var(--status-color)]" : "text-neutral-500"}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
