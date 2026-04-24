import * as React from "react";

// --- Base Types ---
export type BaseColor = "primary" | "secondary" | "accent" | "neutral";
export type BaseSize = "2xs" | "xs" | "sm" | "md" | "lg";

// --- Component Specific Variants ---
export type ButtonVariant = "solid" | "outline" | "light" | "underline" | "ghost";
export type CardVariant = "solid" | "outline" | "callout" | "ghost";
export type CardSize = "sm" | "md" | "lg";

// --- Table Types ---
export type TableColor = "primary" | "secondary" | "accent" | "neutral";
export type TableVariant = "standard" | "striped" | "bordered" | "industrial";
export type TableDensity = "compact" | "standard" | "spacious";
export type SortOrder = "asc" | "desc";
export type CellType = "text" | "date" | "time" | "select" | "slider" | "readonly";

export interface SelectOption {
  label: string;
  value: string;
}

export interface DatabaseColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  type?: CellType;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}
