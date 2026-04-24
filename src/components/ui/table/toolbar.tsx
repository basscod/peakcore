"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { SelectOption } from "@/types/ui";

interface ToolbarDropdownProps {
  icon: React.ReactNode;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
  colorVar: string;
}

export const ToolbarDropdown = ({ icon, label, options, value, onChange, colorVar }: ToolbarDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selected = options.find(o => o.value === value);
  const active = !!value;

  return (
    <div ref={ref} className="relative shrink-0" style={{ "--tc": colorVar } as React.CSSProperties}>
      <button
        onClick={() => setOpen(o => !o)}
        className="h-8 flex items-center gap-1.5 px-2.5 border radius-sm text-sm transition-all whitespace-nowrap"
        style={active
          ? { borderColor: colorVar, backgroundColor: colorVar + "12", color: colorVar }
          : { borderColor: "var(--neutral-200)", color: "var(--neutral-500)" }}
      >
        <span style={{ color: active ? colorVar : "var(--neutral-400)" }}>{icon}</span>
        <span className={`overflow-hidden transition-all duration-200 ${open || active ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
          {selected ? selected.label : label}
        </span>
        <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-180" : ""} ${open || active ? "opacity-100" : "w-0 opacity-0"}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full right-0 mt-1 bg-background border border-neutral-200 shadow-lg radius-md py-1 min-w-36 animate-in fade-in zoom-in-95 duration-150">
          <div className="max-h-52 overflow-y-auto px-1">
            {options.map(opt => {
              const isSelected = value === opt.value;
              const isHovered = hovered === opt.value && !isSelected;
              return (
                <button key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  onMouseEnter={() => setHovered(opt.value)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left radius-sm text-sm transition-all"
                  style={{
                    backgroundColor: isSelected
                      ? colorVar + "15"
                      : isHovered ? colorVar + "08" : "transparent",
                    color: isSelected ? colorVar : isHovered ? "var(--neutral-900)" : "var(--neutral-600)",
                    borderLeft: `2px solid ${isHovered && !isSelected ? colorVar + "50" : "transparent"}`,
                  }}
                >
                  {opt.label}
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
