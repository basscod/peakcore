"use client";

import * as React from "react";
import { Search, Filter, ArrowUpDown, ArrowDownAz, ArrowUpAz } from "lucide-react";
import { DatabaseColumn, TableColor, SortOrder } from "@/types/ui";
import { TextEditor, DateEditor, AnalogTimePicker, SelectEditor, SliderEditor } from "./editors";
import { CellDateDisplay, CellTimeDisplay, CellSelectDisplay, CellDisplay } from "./displays";
import { ToolbarDropdown } from "./toolbar";

const COLOR_VARS: Record<TableColor, string> = {
  primary: "var(--primary-500)",
  secondary: "var(--secondary-500)",
  accent: "var(--accent-500)",
  neutral: "var(--neutral-400)",
};

interface DatabaseTableProps<T extends Record<string, unknown>> {
  title: string;
  columns: DatabaseColumn<T>[];
  data: T[];
  color?: TableColor;
  className?: string;
  onChange?: (data: T[]) => void;
}

type EditingCell = { rowIdx: number; key: string; anchor: DOMRect };

export const DatabaseTable = <T extends Record<string, unknown>>({
  title,
  columns,
  data,
  color = "primary",
  className = "",
  onChange,
}: DatabaseTableProps<T>) => {
  const [localData, setLocalData] = React.useState<T[]>(data);
  const [prevData, setPrevData] = React.useState<T[]>(data);
  const [editing, setEditing] = React.useState<EditingCell | null>(null);
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("asc");
  const [filterKey, setFilterKey] = React.useState("");

  if (data !== prevData) {
    setPrevData(data);
    setLocalData(data);
  }

  const colorVar = COLOR_VARS[color];

  const commitValue = React.useCallback((value: unknown) => {
    if (!editing) return;
    const next = localData.map((row, i) =>
      i === editing.rowIdx ? { ...row, [editing.key]: value } : row
    ) as T[];
    setLocalData(next);
    onChange?.(next);
    setEditing(null);
  }, [editing, localData, onChange]);

  const cancel = React.useCallback(() => setEditing(null), []);

  const startEdit = (rowIdx: number, key: string, e: React.MouseEvent) => {
    const anchor = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setEditing({ rowIdx, key, anchor });
  };

  const processed = React.useMemo(() => {
    let rows = [...localData];
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(r => columns.some(c => r[c.key] != null && String(r[c.key]).toLowerCase().includes(q)));
    }
    if (filterKey) rows = rows.filter(r => r[filterKey] != null && r[filterKey] !== "");
    if (sortKey) {
      rows.sort((a, b) => {
        const va = a[sortKey], vb = b[sortKey];
        if (va === vb) return 0;
        if (va == null) return 1;
        if (vb == null) return -1;
        const cmp = typeof va === "number" && typeof vb === "number"
          ? (va as number) - (vb as number) : String(va).localeCompare(String(vb));
        return sortOrder === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [localData, search, filterKey, sortKey, sortOrder, columns]);

  const allColOpts = [{ label: "None", value: "" }, ...columns.map(c => ({ label: c.header, value: c.key }))];
  const isEditing = (ri: number, key: string) => editing?.rowIdx === ri && editing?.key === key;

  return (
    <div className={`w-full ${className}`} style={{ "--tc": colorVar } as React.CSSProperties}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 px-5 py-3 bg-neutral-100/60 border border-b-0 border-neutral-200 radius-md rounded-b-none">
        <h4 className="h4 uppercase tracking-tighter text-neutral-800 shrink-0">{title}</h4>
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-8 pl-8 pr-3 text-sm border border-neutral-200 bg-transparent radius-sm outline-none transition-all w-40 placeholder:text-neutral-400 text-neutral-700"
              onFocus={e => (e.currentTarget.style.borderColor = colorVar)}
              onBlur={e => (e.currentTarget.style.borderColor = "")}
            />
          </div>

          <ToolbarDropdown icon={<Filter className="w-3.5 h-3.5" />} label="Filter"
            options={allColOpts} value={filterKey} onChange={setFilterKey} colorVar={colorVar} />

          <ToolbarDropdown icon={<ArrowUpDown className="w-3.5 h-3.5" />} label="Sort"
            options={allColOpts} value={sortKey} onChange={setSortKey} colorVar={colorVar} />

          <button
            onClick={() => setSortOrder(o => o === "asc" ? "desc" : "asc")}
            className="h-8 w-8 flex items-center justify-center border border-neutral-200 radius-sm transition-all group shrink-0 hover:border-[color:var(--tc)]"
          >
            {sortOrder === "asc"
              ? <ArrowDownAz className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[color:var(--tc)]" />
              : <ArrowUpAz className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[color:var(--tc)]" />}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-neutral-200 radius-md rounded-t-none overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-100/80 border-b border-[color:var(--tc)]/20">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="text-xs font-medium text-neutral-400 px-5 py-3 whitespace-nowrap uppercase tracking-wide"
                    style={col.width ? { width: col.width } : undefined}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processed.length > 0 ? processed.map((row, ri) => (
                <tr key={ri} className="border-b border-neutral-100 last:border-0 hover:bg-[color:var(--tc)]/5 transition-colors group">
                  {columns.map(col => {
                    const type = col.type ?? "readonly";
                    const isReadonly = type === "readonly" || !!col.render;
                    const cellValue = row[col.key];
                    const active = isEditing(ri, col.key);

                    return (
                      <td
                        key={col.key}
                        className={`px-5 py-2.5 text-sm text-neutral-700 ${!isReadonly ? "cursor-pointer" : ""}`}
                        style={col.width ? { width: col.width } : undefined}
                        onClick={!isReadonly && !active ? e => startEdit(ri, col.key, e) : undefined}
                      >
                        {col.render ? (
                          col.render(cellValue, row)
                        ) : active && editing ? (
                          <>
                            {type === "text" && (
                              <TextEditor value={cellValue} colorVar={colorVar}
                                onCommitValue={commitValue} onCancel={cancel} />
                            )}
                            {type === "date" && (
                              <>
                                <CellDateDisplay value={cellValue} colorVar={colorVar} />
                                <DateEditor value={cellValue} anchor={editing.anchor} colorVar={colorVar}
                                  onCommitValue={commitValue} onCancel={cancel} />
                              </>
                            )}
                            {type === "time" && (
                              <>
                                <CellTimeDisplay value={cellValue} colorVar={colorVar} />
                                <AnalogTimePicker value={cellValue} anchor={editing.anchor} colorVar={colorVar}
                                  onCommitValue={commitValue} onCancel={cancel} />
                              </>
                            )}
                            {type === "select" && (
                              <>
                                <CellSelectDisplay value={cellValue} options={col.options ?? []} colorVar={colorVar} active />
                                <SelectEditor value={cellValue} anchor={editing.anchor} colorVar={colorVar}
                                  options={col.options ?? []} onCommitValue={commitValue} onCancel={cancel} />
                              </>
                            )}
                            {type === "slider" && (
                              <SliderEditor value={cellValue} colorVar={colorVar}
                                onCommitValue={commitValue} onCancel={cancel} min={col.min} max={col.max} step={col.step} />
                            )}
                          </>
                        ) : (
                          <CellDisplay col={col as DatabaseColumn} value={cellValue} colorVar={colorVar} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              )) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12 text-sm text-neutral-400">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
