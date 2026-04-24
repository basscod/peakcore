"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";

type InputVariant = "standard" | "ghost" | "underline" | "filled";
type InputColor = "primary" | "secondary" | "accent" | "neutral";
type InputStatus = "default" | "error" | "success" | "warning";

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color"> {
  label?: string;
  variant?: InputVariant;
  color?: InputColor;
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
      "w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50";
    const iconPaddingLeft = IconLeft ? "pl-10" : "";
    const iconPaddingRight = IconRight ? "pr-10" : "";

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

        <div className={`${inputWrapperBase} ${variantStyles} ${statusStyles} ${disabled ? "opacity-50" : ""}`}>
          {IconLeft && (
            <IconLeft className="absolute left-3 w-4 h-4 text-neutral-500 group-focus-within:text-[color:var(--input-color)] transition-colors" />
          )}

          <input
            ref={ref}
            className={`${inputBase} ${iconPaddingLeft} ${iconPaddingRight}`}
            disabled={disabled}
            {...props}
          />

          {IconRight && (
            <IconRight className="absolute right-3 w-4 h-4 text-neutral-500 group-focus-within:text-[color:var(--input-color)] transition-colors" />
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
