"use client";

import * as React from "react";
import { Search, Filter, ArrowUpDown, ArrowDownAz, ArrowUpAz } from "lucide-react";
import { InputField } from "./input-field";

type TableVariant = "standard" | "striped" | "bordered" | "industrial";
type TableDensity = "compact" | "standard" | "spacious";
type TableColor = "primary" | "secondary" | "accent" | "neutral";
type SortOrder = "asc" | "desc";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  density?: TableDensity;
  color?: TableColor;
}

/**
 * TableToolbar: Optional header for tables with search, sort, and filter actions.
 */
interface TableToolbarProps {
  title?: string;
  onSearch?: (value: string) => void;
  onFilterChange?: (column: string) => void;
  onSortChange?: (column: string) => void;
  onSortOrderToggle?: () => void;
  sortOrder?: SortOrder;
  columns?: string[];
  variant?: TableVariant;
  color?: TableColor;
  className?: string;
}

import { Dropdown } from "./dropdown";

export const TableToolbar = ({ 
  title, 
  onSearch, 
  onFilterChange, 
  onSortChange, 
  onSortOrderToggle,
  sortOrder = "asc",
  columns = [],
  variant = "standard",
  color = "neutral",
  className = "" 
}: TableToolbarProps) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [sortValue, setSortValue] = React.useState("");

  const colorVars = {
    primary: "var(--primary-500)",
    secondary: "var(--secondary-500)",
    accent: "var(--accent-500)",
    neutral: "var(--neutral-400)",
  }[color];

  const variantStyles = {
    standard: "border-2 border-neutral-200 bg-neutral-100/30",
    striped: "border-2 border-neutral-200 bg-neutral-100/30",
    bordered: "border-2 border-[color:var(--toolbar-color)]/30 bg-background",
    industrial: "border-2 border-[color:var(--toolbar-color)] bg-neutral-100/30 border-l-[6px]",
  }[variant];

  const customStyles = {
    "--toolbar-color": colorVars,
  } as React.CSSProperties;

  const dropdownOptions = [
    { label: "NONE", value: "" },
    ...columns.map(col => ({ label: col.toUpperCase(), value: col }))
  ];

  const toolbarVariant = variant === "industrial" ? "industrial" : "outline";

  return (
    <div 
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-2.5 radius-md ${variantStyles} ${className}`}
      style={customStyles}
    >
      {title && <h4 className="h4 uppercase tracking-tighter text-neutral-800">{title}</h4>}
      
      <div className="flex flex-wrap items-center gap-3 ml-auto">
        <InputField 
          variant="filled"
          placeholder="SEARCH DATA..." 
          iconLeft={Search} 
          size="sm" 
          color={color}
          className="w-full md:w-64"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        
        <div className="flex items-center gap-2">
          <Dropdown
            icon={Filter}
            placeholder="FILTER"
            variant={toolbarVariant}
            color={color}
            size="sm"
            expanding
            options={dropdownOptions}
            value={filterValue}
            onChange={(val) => {
              setFilterValue(val);
              onFilterChange?.(val);
            }}
          />

          <div className="flex items-center gap-1">
            <Dropdown
              icon={ArrowUpDown}
              placeholder="SORT"
              variant={toolbarVariant}
              color={color}
              size="sm"
              expanding
              options={dropdownOptions}
              value={sortValue}
              onChange={(val) => {
                setSortValue(val);
                onSortChange?.(val);
              }}
            />
            
            <button 
              onClick={onSortOrderToggle}
              className="w-10 h-8 flex items-center justify-center border-2 border-neutral-200 radius-sm hover:bg-neutral-100 hover:border-[color:var(--toolbar-color)] transition-all group shrink-0"
              title={sortOrder === "asc" ? "Sort Ascending" : "Sort Descending"}
            >
              {sortOrder === "asc" ? (
                <ArrowDownAz className="w-4 h-4 text-neutral-500 group-hover:text-[color:var(--toolbar-color)]" />
              ) : (
                <ArrowUpAz className="w-4 h-4 text-neutral-500 group-hover:text-[color:var(--toolbar-color)]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      compact: "[&_td]:py-1.5 [&_th]:py-1.5 [&_td]:px-5 [&_th]:px-5",
      standard: "[&_td]:py-2.5 [&_th]:py-2.5 [&_td]:px-6 [&_th]:px-6",
      spacious: "[&_td]:py-5 [&_th]:py-5 [&_td]:px-8 [&_th]:px-8",
    }[density];

    const variantStyles = {
      standard: "[&_thead]:border-b [&_thead]:border-neutral-200",
      striped:
        "[&_thead]:border-b-2 [&_thead]:border-neutral-200 [&_tbody_tr:nth-child(even)]:bg-[color:var(--table-color)]/10",
      bordered: "[&_thead]:border-b-2 [&_thead]:border-[color:var(--table-color)]/30",
      industrial:
        "[&_thead]:border-b-4 [&_thead]:border-[color:var(--table-color)] [&_th]:bg-[color:var(--table-color)] [&_th]:text-background [&_th]:py-2",
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
    return <tr ref={ref} className={`transition-colors hover:bg-neutral-200/60 group ${className}`} {...props} />;
  }
);
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className = "", ...props }, ref) => {
    return <th ref={ref} className={`font-semibold caption text-neutral-500 ${className}`} {...props} />;
  }
);
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <td ref={ref} className={`text-neutral-700 dark:text-neutral-300 ${className}`} {...props} />
    );
  }
);
TableCell.displayName = "TableCell";

/**
 * DataTable: A high-level component that integrates TableToolbar and Table 
 * with built-in search, sort, and filter logic.
 */
interface DataTableColumn<T = Record<string, unknown>> {
  header: string;
  accessor: string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  title?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  variant?: TableVariant;
  density?: TableDensity;
  color?: TableColor;
  className?: string;
}

export const DataTable = <T extends Record<string, unknown>>({ 
  title, 
  columns, 
  data, 
  variant, 
  density, 
  color,
  className = "" 
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");
  const [filterColumn, setFilterColumn] = React.useState<string | null>(null);
  const [editingCell, setEditingCell] = React.useState<{ rowIndex: number; accessor: string } | null>(null);
  const [prevData, setPrevData] = React.useState<T[]>(data);
  const [localData, setLocalData] = React.useState<T[]>(data);

  // Sync localData if data prop changes (Adjusting state during render to avoid cascading renders)
  if (data !== prevData) {
    setPrevData(data);
    setLocalData(data);
  }

  // 1. Process Data (Search -> Filter -> Sort)
  const processedData = React.useMemo(() => {
    let result = [...localData];

    // Search logic (Search across all visible columns)
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(item => 
        columns.some(col => {
          const value = item[col.accessor];
          return value !== null && value !== undefined && String(value).toLowerCase().includes(lowerSearch);
        })
      );
    }

    // Filter logic (Simplified: Only showing items where the column has a value)
    if (filterColumn) {
      result = result.filter(item => {
        const val = item[filterColumn];
        return val !== null && val !== undefined && val !== "";
      });
    }

    // Sort logic
    if (sortColumn) {
      result.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (valA === valB) return 0;
        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        let comparison = 0;
        if (typeof valA === "string" && typeof valB === "string") {
          comparison = valA.localeCompare(valB);
        } else if (typeof valA === "number" && typeof valB === "number") {
          comparison = valA - valB;
        } else {
          comparison = String(valA).localeCompare(String(valB));
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [localData, columns, searchTerm, sortColumn, sortOrder, filterColumn]);

  return (
    <div className={`space-y-3 ${className}`}>
      <TableToolbar 
        title={title}
        variant={variant}
        color={color}
        sortOrder={sortOrder}
        onSortOrderToggle={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
        columns={columns.map(c => c.accessor)}
        onSearch={setSearchTerm}
        onFilterChange={setFilterColumn}
        onSortChange={setSortColumn}
        className="shadow-sm"
      />
      <Table 
        variant={variant} 
        density={density} 
        color={color} 
        className="shadow-sm"
      >
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.accessor}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {processedData.length > 0 ? (
            processedData.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => {
                  const isEditing = editingCell?.rowIndex === i && editingCell?.accessor === col.accessor;
                  
                  return (
                    <TableCell 
                      key={col.accessor}
                      onClick={() => !col.render && setEditingCell({ rowIndex: i, accessor: col.accessor })}
                      className={!col.render ? "cursor-text hover:bg-neutral-50 transition-colors" : ""}
                    >
                      {isEditing ? (
                        <input
                          autoFocus
                          className="w-full bg-background border-2 border-primary-500 radius-sm px-2 py-1 outline-none text-sm font-mono"
                          defaultValue={String(row[col.accessor])}
                          onBlur={(e) => {
                            const newValue = e.target.value;
                            const newData = [...localData];
                            // Find the actual index in the source data (reference check)
                            const actualIndex = localData.findIndex(r => r === row);
                            if (actualIndex !== -1) {
                              newData[actualIndex] = { ...newData[actualIndex], [col.accessor]: newValue };
                              setLocalData(newData);
                            }
                            setEditingCell(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                            if (e.key === "Escape") setEditingCell(null);
                          }}
                        />
                      ) : (
                        col.render 
                          ? col.render(row[col.accessor], row) 
                          : (row[col.accessor] as React.ReactNode)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-12 text-neutral-400 italic">
                No matching data protocols found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
