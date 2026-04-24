"use client";

import * as React from "react";

type TableVariant = "standard" | "striped" | "bordered" | "industrial";
type TableDensity = "compact" | "standard" | "spacious";
type TableColor = "primary" | "secondary" | "accent" | "neutral";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  density?: TableDensity;
  color?: TableColor;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = "", variant = "standard", density = "standard", color = "neutral", children, ...props }, ref) => {
    // Color mapping
    const colorVars = {
      primary: "var(--primary-500)",
      secondary: "var(--secondary-500)",
      accent: "var(--accent-500)",
      neutral: "var(--neutral-400)",
    }[color];

    const densityStyles = {
      compact: "[&_td]:py-1.5 [&_th]:py-1.5 [&_td]:px-3 [&_th]:px-3",
      standard: "[&_td]:py-3 [&_th]:py-3 [&_td]:px-4 [&_th]:px-4",
      spacious: "[&_td]:py-6 [&_th]:py-6 [&_td]:px-6 [&_th]:px-6",
    }[density];

    const variantStyles = {
      standard: "[&_thead]:border-b [&_thead]:border-neutral-200",
      striped:
        "[&_thead]:border-b-2 [&_thead]:border-neutral-200 [&_tbody_tr:nth-child(even)]:bg-[color:var(--table-color)]/10",
      bordered: "[&_thead]:border-b-2 [&_thead]:border-[color:var(--table-color)]/30",
      industrial:
        "[&_thead]:border-b-4 [&_thead]:border-[color:var(--table-color)] [&_th]:bg-[color:var(--table-color)] [&_th]:text-background [&_th]:py-4",
    }[variant];

    const containerStyles = {
      standard: "border stroke-light border-neutral-200 shadow-sm",
      striped: "border-2 stroke-normal border-neutral-200 shadow-sm",
      bordered: "border-2 border-[color:var(--table-color)]/30",
      industrial: "border-4 stroke-bold border-[color:var(--table-color)]",
    }[variant];

    const customStyles = {
      "--table-color": colorVars,
    } as React.CSSProperties;

    return (
      <div className={`w-full overflow-hidden radius-md ${containerStyles} ${className}`} style={customStyles}>
        <div className="w-full overflow-auto">
          <table
            ref={ref}
            className={`w-full text-left text-sm border-collapse ${densityStyles} ${variantStyles}`}
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
  ({ className = "", ...props }, ref) => {
    return <thead ref={ref} className={`bg-neutral-200/50 ${className}`} {...props} />;
  }
);
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className = "", ...props }, ref) => {
    return <tbody ref={ref} className={className} {...props} />;
  }
);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className = "", ...props }, ref) => {
    return <tr ref={ref} className={`transition-colors hover:bg-neutral-200/40 group ${className}`} {...props} />;
  }
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className = "", ...props }, ref) => {
    return <th ref={ref} className={`px-4 py-3 font-semibold caption text-neutral-500 ${className}`} {...props} />;
  }
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <td ref={ref} className={`px-4 py-3 text-neutral-700 dark:text-neutral-300 ${className}`} {...props} />
    );
  }
);
TableCell.displayName = "TableCell";
