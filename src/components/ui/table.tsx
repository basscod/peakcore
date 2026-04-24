"use client";

import * as React from "react";
import { TableVariant, TableDensity, TableColor } from "@/types/ui";

// --- Shared Constants ---
const COLOR_VARS: Record<TableColor, string> = {
  primary: "var(--primary-500)",
  secondary: "var(--secondary-500)",
  accent: "var(--accent-500)",
  neutral: "var(--neutral-400)",
};

// --- Export DatabaseTable ---
export { DatabaseTable } from "./table/database-table";

// --- Primitive Table Components ---

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  density?: TableDensity;
  color?: TableColor;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = "", variant = "standard", density = "standard", color = "neutral", children, ...props }, ref) => {
    const densityStyles = {
      compact: "[&_td]:py-1.5 [&_th]:py-1.5 [&_td]:px-5 [&_th]:px-5",
      standard: "[&_td]:py-2.5 [&_th]:py-2.5 [&_td]:px-6 [&_th]:px-6",
      spacious: "[&_td]:py-5   [&_th]:py-5   [&_td]:px-8 [&_th]:px-8",
    }[density];

    const variantInner = {
      standard: "[&_thead]:border-b [&_thead]:border-neutral-200",
      striped: "[&_thead]:border-b-2 [&_thead]:border-neutral-200 [&_tbody_tr:nth-child(even)]:bg-[color:var(--tc)]/10",
      bordered: "[&_thead]:border-b-2 [&_thead]:border-[color:var(--tc)]/30",
      industrial: "[&_thead]:border-b-4 [&_thead]:border-[color:var(--tc)] [&_th]:bg-[color:var(--tc)] [&_th]:text-background [&_th]:py-2",
    }[variant];

    const containerStyles = {
      standard: "border border-neutral-200 shadow-sm",
      striped: "border-2 border-neutral-200 shadow-sm",
      bordered: "border-2 border-[color:var(--tc)]/30",
      industrial: "border-4 border-[color:var(--tc)]",
    }[variant];

    return (
      <div
        className={`w-full overflow-hidden radius-md ${containerStyles} ${className}`}
        style={{ "--tc": COLOR_VARS[color] } as React.CSSProperties}
      >
        <div className="w-full overflow-auto">
          <table
            ref={ref}
            className={`w-full text-left text-sm border-collapse ${densityStyles} ${variantInner}`}
            {...props}
          >
            {children}
          </table>
        </div>
      </div>
    );
  }
);
Table.displayName = "Table";

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = "", ...props }, ref) => (
    <thead ref={ref} className={`bg-neutral-200/50 ${className}`} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = "", ...props }, ref) => <tbody ref={ref} className={className} {...props} />
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className = "", ...props }, ref) => (
    <tr ref={ref} className={`transition-colors hover:bg-neutral-200/60 group ${className}`} {...props} />
  )
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className = "", ...props }, ref) => (
    <th ref={ref} className={`font-semibold caption text-neutral-500 ${className}`} {...props} />
  )
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className = "", ...props }, ref) => (
    <td ref={ref} className={`text-neutral-700 ${className}`} {...props} />
  )
);
TableCell.displayName = "TableCell";
