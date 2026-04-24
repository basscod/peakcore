"use client";

import * as React from "react";
import { Calendar, Clock } from "lucide-react";
import { SelectOption, DatabaseColumn } from "@/types/ui";

export const CellDateDisplay = ({ value, colorVar, dim }: { value: unknown; colorVar: string; dim?: boolean }) => (
  <div className="flex items-center gap-1.5 text-sm" style={{ color: dim ? "var(--neutral-400)" : colorVar }}>
    <Calendar className="w-3.5 h-3.5 shrink-0 opacity-60" />
    <span>{value != null && value !== "" ? String(value) : <span style={{ color: "var(--neutral-400)" }}>—</span>}</span>
  </div>
);

export const CellTimeDisplay = ({ value, colorVar, dim }: { value: unknown; colorVar: string; dim?: boolean }) => (
  <div className="flex items-center gap-1.5 text-sm" style={{ color: dim ? "var(--neutral-400)" : colorVar }}>
    <Clock className="w-3.5 h-3.5 shrink-0 opacity-60" />
    <span>{value != null && value !== "" ? String(value) : <span style={{ color: "var(--neutral-400)" }}>—</span>}</span>
  </div>
);

export const CellSelectDisplay = ({
  value, options, colorVar, active = false,
}: { value: unknown; options: SelectOption[]; colorVar: string; active?: boolean }) => {
  const label = options.find(o => o.value === String(value ?? ""))?.label;
  const text  = label ?? (value != null && value !== "" ? String(value) : null);
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colorVar }} />
      <span className="text-sm font-medium" style={{ color: active ? colorVar : "inherit" }}>
        {text ?? <span className="text-neutral-300">Unassigned</span>}
      </span>
    </div>
  );
};

export const CellDisplay = ({ col, value, colorVar }: { col: DatabaseColumn; value: unknown; colorVar: string }) => {
  const type = col.type ?? "readonly";
  if (type === "date") return <CellDateDisplay value={value} colorVar={colorVar} dim />;
  if (type === "time") return <CellTimeDisplay value={value} colorVar={colorVar} dim />;
  if (type === "select") return <CellSelectDisplay value={value} options={col.options ?? []} colorVar={colorVar} />;
  if (type === "slider") return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-neutral-100 radius-sm overflow-hidden">
        <div className="h-full" style={{ width: `${value}%`, backgroundColor: colorVar }} />
      </div>
      <span className="text-[0.65rem] font-mono w-6 text-right" style={{ color: colorVar }}>{String(value)}</span>
    </div>
  );
  return <span className="text-neutral-700">{String(value ?? "")}</span>;
};
