"use client";

import * as React from "react";
import Link from "next/link";
import { LucideIcon, Loader2 } from "lucide-react";

type ButtonVariant = "solid" | "outline" | "light" | "underline" | "ghost";
type ButtonColor = "primary" | "secondary" | "accent" | "neutral";
type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  isLoading?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  (
    {
      className = "",
      variant = "outline",
      color = "primary",
      size = "md",
      iconLeft: IconLeft,
      iconRight: IconRight,
      isLoading,
      href,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2";

    // Size mapping
    const sizeStyles = {
      "2xs": "px-1.5 py-0.5 text-[0.65rem] radius-sm min-h-[1.35rem]",
      xs: "px-2 py-0.5 text-[0.75rem] radius-sm min-h-[1.6rem]",
      sm: "px-2.5 py-1 text-xs radius-sm min-h-[2rem]",
      md: "px-3.5 py-2 text-sm radius-sm min-h-[2.5rem]",
      lg: "px-5 py-2.5 text-base radius-md min-h-[3rem]",
    };

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

    // Color mapping (CSS Variables)
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

    // Variant styles
    const variantStyles = {
      solid: `bg-[color:var(--btn-color)] text-background hover:opacity-90`,
      outline: `border-2 stroke-normal border-[color:var(--btn-color)] text-[color:var(--btn-color)] hover:bg-[color:var(--btn-color)]/5`,
      light: `stroke-light border border-[color:var(--btn-color)]/30 bg-[color:var(--btn-bg-light)] hover:bg-[color:var(--btn-bg-hover)] text-[color:var(--btn-color)]`,
      underline: `relative text-[color:var(--btn-color)] min-h-0 px-1 pt-1 pb-1 radius-none group/btn`,
      ghost: `relative text-[color:var(--btn-color)] min-h-0 px-1 pt-1 pb-1 radius-none group/btn`,
    }[variant];

    const underlineEffect = (variant === "underline" || variant === "ghost") && (
      <span 
        className={`absolute bottom-0 left-0 h-[2px] bg-[color:var(--btn-color)] transition-all duration-300 ${variant === "underline" ? "w-full" : "w-0 group-hover/btn:w-full"}`} 
      />
    );

    const customStyles = {
      "--btn-color": colorVars,
      "--btn-bg-light": colorLightBg,
      "--btn-bg-hover": colorLightHover,
    } as React.CSSProperties;

    const commonClasses = `${baseStyles} ${sizeStyles[size]} ${iconOnlyStyles} ${variantStyles} ${className} ${
      isLoading ? "cursor-not-allowed" : ""
    }`;

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {IconLeft && <IconLeft className={size === "2xs" || size === "xs" ? "w-3 h-3" : "w-4 h-4"} />}
            {children}
            {IconRight && <IconRight className={size === "2xs" || size === "xs" ? "w-3 h-3" : "w-4 h-4"} />}
          </>
        )}
        {underlineEffect}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={commonClasses}
          style={customStyles}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        className={commonClasses}
        style={customStyles}
        disabled={props.disabled || isLoading}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
