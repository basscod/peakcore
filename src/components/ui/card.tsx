"use client";

import * as React from "react";

type CardVariant = "solid" | "outline" | "callout" | "ghost";
type CardSize = "sm" | "md" | "lg";
type CardColor = "primary" | "secondary" | "accent" | "neutral";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  size?: CardSize;
  color?: CardColor;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "solid", size = "md", color = "neutral", children, ...props }, ref) => {
    // Base styles
    const baseStyles = "transition-all duration-200 overflow-hidden flex flex-col";

    // Size mapping (Radius and Padding)
    const sizeStyles = {
      sm: "p-3 radius-sm",
      md: "p-5 radius-md",
      lg: "p-8 radius-lg",
    }[size];

    // Color mapping (Semantic Scales)
    const colorMapping = {
      primary: "var(--primary-500)",
      secondary: "var(--secondary-500)",
      accent: "var(--accent-500)",
      neutral: "var(--foreground)",
    }[color];

    // Variant styles
    const variantStyles = {
      solid: `bg-[color-mix(in_srgb,var(--card-stroke),transparent_90%)] border-none`,
      outline: `border-2 stroke-normal border-[color:var(--card-stroke)] bg-transparent`,
      callout: `border border-l-4 border-[color-mix(in_srgb,var(--card-stroke),transparent_80%)] border-l-[color:var(--card-stroke)] bg-transparent`,
      ghost: `bg-transparent border-none`,
    }[variant];

    const customStyles = {
      "--card-stroke": colorMapping,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        style={customStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col space-y-1.5 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex-1 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div ref={ref} className={`flex items-center pt-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
CardFooter.displayName = "CardFooter";
