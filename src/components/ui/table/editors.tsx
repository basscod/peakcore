"use client";

import * as React from "react";
import ReactDOM from "react-dom";
import { Check } from "lucide-react";
import { SelectOption } from "@/types/ui";

const pad2 = (n: number) => String(n).padStart(2, "0");

// --- Portal Popover ---
interface CellPopoverProps {
  anchor: DOMRect;
  colorVar: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const CellPopover = ({ anchor, colorVar, onClose, children }: CellPopoverProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="fixed z-[9999] bg-background border border-[color:var(--tc)] radius-md shadow-xl animate-in fade-in zoom-in-95 duration-150"
      style={{ top: anchor.bottom + 6, left: anchor.left, "--tc": colorVar } as React.CSSProperties}
    >
      {children}
    </div>,
    document.body
  );
};

// --- Editor Props ---
export interface EditorProps {
  value: unknown;
  colorVar: string;
  onCommitValue: (v: unknown) => void;
  onCancel: () => void;
}

export interface PopupEditorProps extends EditorProps {
  anchor: DOMRect;
}

// --- Text Editor ---
export const TextEditor = ({ value, colorVar, onCommitValue, onCancel }: EditorProps) => {
  const [local, setLocal] = React.useState(String(value ?? ""));
  return (
    <input
      autoFocus
      className="w-full bg-background border-2 radius-sm px-2 py-0.5 outline-none text-sm text-neutral-800"
      style={{ borderColor: colorVar }}
      value={local}
      onChange={e => setLocal(e.target.value)}
      onBlur={() => onCommitValue(local)}
      onKeyDown={e => {
        if (e.key === "Enter") onCommitValue(local);
        if (e.key === "Escape") onCancel();
      }}
    />
  );
};

// --- Date Editor ---
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_SHORT   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export const DateEditor = ({ value, anchor, colorVar, onCommitValue, onCancel }: PopupEditorProps) => {
  const str    = String(value ?? "");
  const parsed = new Date(str);
  const valid  = !isNaN(parsed.getTime());
  const [vy, setVy] = React.useState(valid ? parsed.getFullYear() : new Date().getFullYear());
  const [vm, setVm] = React.useState(valid ? parsed.getMonth()    : new Date().getMonth());
  const [view, setView] = React.useState<"days" | "months" | "years">("days");

  const firstDay    = new Date(vy, vm, 1).getDay();
  const daysInMonth = new Date(vy, vm + 1, 0).getDate();
  const selectedD   = valid && parsed.getFullYear() === vy && parsed.getMonth() === vm ? parsed.getDate() : null;

  const pick  = (d: number) => onCommitValue(`${vy}-${pad2(vm + 1)}-${pad2(d)}`);
  const prevM = () => { if (vm === 0) { setVm(11); setVy(y => y - 1); } else setVm(m => m - 1); };
  const nextM = () => { if (vm === 11) { setVm(0); setVy(y => y + 1); } else setVm(m => m + 1); };

  const cells: (number | null)[] = [...Array(firstDay).fill(null)];
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const yearStart = Math.floor(vy / 12) * 12;
  const years = Array.from({ length: 12 }, (_, i) => yearStart + i);

  return (
    <CellPopover anchor={anchor} colorVar={colorVar} onClose={onCancel}>
      <div className="p-3 w-56 select-none transition-all duration-300">
        <div className="flex items-center justify-between mb-3 h-8">
          {view === "days" ? (
            <>
              <button onClick={prevM} className="w-7 h-7 flex items-center justify-center radius-sm text-neutral-400 hover:text-[color:var(--tc)] hover:bg-[color:var(--tc)]/8 text-base leading-none transition-colors">‹</button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setView("months")}
                  className="px-1.5 py-0.5 radius-sm text-sm font-medium text-neutral-700 hover:bg-[color:var(--tc)]/8 hover:text-[color:var(--tc)] transition-colors"
                >
                  {MONTHS_SHORT[vm]}
                </button>
                <button
                  onClick={() => setView("years")}
                  className="px-1.5 py-0.5 radius-sm text-sm font-medium text-neutral-700 hover:bg-[color:var(--tc)]/8 hover:text-[color:var(--tc)] transition-colors"
                >
                  {vy}
                </button>
              </div>
              <button onClick={nextM} className="w-7 h-7 flex items-center justify-center radius-sm text-neutral-400 hover:text-[color:var(--tc)] hover:bg-[color:var(--tc)]/8 text-base leading-none transition-colors">›</button>
            </>
          ) : (
            <>
              <button
                onClick={() => setView(view === "months" ? "days" : "months")}
                className="w-7 h-7 flex items-center justify-center radius-sm text-neutral-400 hover:text-[color:var(--tc)] hover:bg-[color:var(--tc)]/8 text-base leading-none transition-colors"
              >
                ‹
              </button>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Select {view === "months" ? "Month" : "Year"}
              </span>
              <button
                onClick={() => setView("days")}
                className="w-7 h-7 flex items-center justify-center radius-sm text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-colors"
              >
                ×
              </button>
            </>
          )}
        </div>

        {view === "days" && (
          <>
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map(d => <div key={d} className="text-center text-[0.65rem] font-medium text-neutral-400 py-0.5">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((d, i) => (
                <button
                  key={i}
                  disabled={!d}
                  onClick={() => d && pick(d)}
                  className={`h-7 flex items-center justify-center radius-sm text-xs transition-all
                    ${!d ? "" : d === selectedD
                      ? "font-semibold text-background"
                      : "text-neutral-700 hover:bg-[color:var(--tc)]/10 hover:text-[color:var(--tc)]"}`}
                  style={d === selectedD ? { backgroundColor: colorVar } : undefined}
                >
                  {d ?? ""}
                </button>
              ))}
            </div>
          </>
        )}

        {view === "months" && (
          <div className="grid grid-cols-3 gap-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {MONTHS_SHORT.map((m, i) => (
              <button
                key={m}
                onClick={() => { setVm(i); setView("days"); }}
                className={`h-10 flex items-center justify-center radius-sm text-xs font-medium transition-all
                  ${i === vm
                    ? "text-background"
                    : "text-neutral-600 hover:bg-[color:var(--tc)]/10 hover:text-[color:var(--tc)]"}`}
                style={i === vm ? { backgroundColor: colorVar } : undefined}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {view === "years" && (
          <div className="grid grid-cols-3 gap-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={() => setVy(v => v - 12)}
              className="col-span-3 h-6 text-[0.6rem] text-neutral-400 hover:text-[color:var(--tc)] transition-colors"
            >
              PREVIOUS YEARS
            </button>
            {years.map(y => (
              <button
                key={y}
                onClick={() => { setVy(y); setView("days"); }}
                className={`h-10 flex items-center justify-center radius-sm text-xs font-medium transition-all
                  ${y === vy
                    ? "text-background"
                    : "text-neutral-600 hover:bg-[color:var(--tc)]/10 hover:text-[color:var(--tc)]"}`}
                style={y === vy ? { backgroundColor: colorVar } : undefined}
              >
                {y}
              </button>
            ))}
            <button
              onClick={() => setVy(v => v + 12)}
              className="col-span-3 h-6 text-[0.6rem] text-neutral-400 hover:text-[color:var(--tc)] transition-colors"
            >
              NEXT YEARS
            </button>
          </div>
        )}

        <button
          onClick={onCancel}
          className="mt-3 w-full text-xs text-neutral-400 hover:text-error-500 transition-colors text-center py-1 radius-sm hover:bg-neutral-100"
        >
          Cancel
        </button>
      </div>
    </CellPopover>
  );
};

// --- Time Editor ---
export const AnalogTimePicker = ({ value, anchor, colorVar, onCommitValue, onCancel }: PopupEditorProps) => {
  const str = String(value ?? "00:00");
  const [h24,  setH24]  = React.useState(parseInt(str.split(":")[0] ?? "0", 10));
  const [min,  setMin]  = React.useState(parseInt(str.split(":")[1] ?? "0", 10));
  const [mode, setMode] = React.useState<"hour" | "minute">("hour");

  const h12  = h24 % 12 || 12;
  const isPM = h24 >= 12;

  const setAM = () => setH24(h => (h >= 12 ? h - 12 : h));
  const setPM = () => setH24(h => (h < 12  ? h + 12 : h));

  const commit = () => onCommitValue(`${pad2(h24)}:${pad2(min)}`);

  const CX = 76, CY = 76, RING_R = 62, NUM_R = 48, HAND_R = mode === "hour" ? 38 : 48;

  const toXY = (deg: number, r: number) => ({
    x: CX + r * Math.cos((deg * Math.PI) / 180),
    y: CY + r * Math.sin((deg * Math.PI) / 180),
  });

  const handAngle = mode === "hour"
    ? (h12 / 12) * 360 - 90
    : (min / 60) * 360 - 90;
  const tip = toXY(handAngle, HAND_R);

  const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const MINS  = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const items = mode === "hour" ? HOURS : MINS;

  const pickHour = (hv: number) => {
    setH24(isPM ? (hv === 12 ? 12 : hv + 12) : hv === 12 ? 0 : hv);
    setMode("minute");
  };

  return (
    <CellPopover anchor={anchor} colorVar={colorVar} onClose={onCancel}>
      <div className="p-4 select-none" style={{ width: 208 }}>
        <div className="flex items-center justify-center gap-1 mb-1">
          <button
            onClick={() => setMode("hour")}
            className="text-[1.6rem] font-semibold w-11 text-center radius-sm leading-none py-1 transition-colors"
            style={{ color: mode === "hour" ? colorVar : "var(--neutral-300)" }}
          >
            {pad2(h12)}
          </button>
          <span className="text-[1.6rem] font-light pb-0.5" style={{ color: "var(--neutral-200)" }}>:</span>
          <button
            onClick={() => setMode("minute")}
            className="text-[1.6rem] font-semibold w-11 text-center radius-sm leading-none py-1 transition-colors"
            style={{ color: mode === "minute" ? colorVar : "var(--neutral-300)" }}
          >
            {pad2(min)}
          </button>
          <div className="flex flex-col gap-0.5 ml-1.5">
            <button
              onClick={setAM}
              className="text-[0.6rem] font-semibold px-1.5 py-0.5 radius-sm transition-all leading-none"
              style={!isPM ? { backgroundColor: colorVar, color: "var(--background)" } : { color: "var(--neutral-400)" }}
            >AM</button>
            <button
              onClick={setPM}
              className="text-[0.6rem] font-semibold px-1.5 py-0.5 radius-sm transition-all leading-none"
              style={isPM ? { backgroundColor: colorVar, color: "var(--background)" } : { color: "var(--neutral-400)" }}
            >PM</button>
          </div>
        </div>

        <p className="text-center text-[0.6rem] uppercase tracking-widest text-neutral-300 mb-3">
          {mode === "hour" ? "hour" : "minute"}
        </p>

        <svg viewBox="0 0 152 152" className="w-full">
          <circle cx={CX} cy={CY} r={RING_R} fill="none" strokeWidth="1" style={{ stroke: "var(--neutral-200)" }} />
          <line x1={CX} y1={CY} x2={tip.x} y2={tip.y} strokeWidth="1" strokeLinecap="round" opacity="0.15" style={{ stroke: colorVar }} />
          <line x1={CX} y1={CY} x2={tip.x} y2={tip.y} strokeWidth="1.5" strokeLinecap="round" style={{ stroke: colorVar }} />

          {items.map((val, i) => {
            const angle    = (i / items.length) * 360 - 90;
            const pos      = toXY(angle, NUM_R);
            const selected = mode === "hour" ? val === h12 : val === min;
            return (
              <g key={val} onClick={() => mode === "hour" ? pickHour(val) : setMin(val)} style={{ cursor: "pointer" }}>
                {selected && <circle cx={pos.x} cy={pos.y} r={9} style={{ fill: colorVar }} />}
                {!selected && (
                  <circle cx={pos.x} cy={pos.y} r={9} fill="transparent"
                    style={{ transition: "fill 0.12s" }}
                    onMouseEnter={e => { (e.currentTarget as SVGCircleElement).style.fill = colorVar + "20"; }}
                    onMouseLeave={e => { (e.currentTarget as SVGCircleElement).style.fill = "transparent"; }}
                  />
                )}
                <text
                  x={pos.x} y={pos.y + 0.5}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize={mode === "minute" ? 7.5 : 8.5}
                  style={{
                    fill:          selected ? "var(--background)" : "var(--neutral-500)",
                    fontFamily:    "inherit",
                    userSelect:    "none",
                    pointerEvents: "none",
                    fontWeight:    selected ? 600 : 400,
                  }}
                >
                  {mode === "minute" ? pad2(val) : val}
                </text>
              </g>
            );
          })}

          <circle cx={CX} cy={CY} r={2.5} style={{ fill: colorVar }} />
          <circle cx={tip.x} cy={tip.y} r={3} style={{ fill: colorVar }} />
        </svg>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 radius-sm text-xs border border-neutral-200 text-neutral-400 hover:text-error-500 hover:border-error-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={commit}
            className="flex-1 py-1.5 radius-sm text-background text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: colorVar }}
          >
            Set {pad2(h12)}:{pad2(min)} {isPM ? "PM" : "AM"}
          </button>
        </div>
      </div>
    </CellPopover>
  );
};

// --- Select Editor ---
interface SelectEditorProps extends PopupEditorProps {
  options: SelectOption[];
}

export const SelectEditor = ({ value, anchor, colorVar, options, onCommitValue, onCancel }: SelectEditorProps) => {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <CellPopover anchor={anchor} colorVar={colorVar} onClose={onCancel}>
      <div className="py-1 min-w-40">
        <div className="max-h-52 overflow-y-auto px-1">
          {options.map(opt => {
            const isSelected = String(value) === opt.value;
            const isHovered  = hovered === opt.value && !isSelected;
            return (
              <button
                key={opt.value}
                onClick={() => onCommitValue(opt.value)}
                onMouseEnter={() => setHovered(opt.value)}
                onMouseLeave={() => setHovered(null)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left radius-sm text-sm transition-colors"
                style={{
                  backgroundColor: isSelected ? colorVar : "transparent",
                  color: isSelected ? "var(--background)" : isHovered ? colorVar : "var(--neutral-600)",
                }}
              >
                {opt.label}
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </CellPopover>
  );
};

// --- Slider Editor ---
interface SliderEditorProps extends EditorProps {
  min?: number;
  max?: number;
  step?: number;
}

export const SliderEditor = ({ value, colorVar, onCommitValue, min = 0, max = 100, step = 1 }: SliderEditorProps) => {
  const [local, setLocal] = React.useState(parseFloat(String(value ?? "0")) || 0);
  const pct = ((local - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-2 w-full min-w-[120px]" onClick={e => e.stopPropagation()}>
      <div className="relative flex-1 h-4 flex items-center">
        <div className="absolute inset-x-0 h-1 bg-neutral-200 radius-sm" />
        <div className="absolute left-0 h-1 radius-sm transition-all" style={{ width: `${pct}%`, backgroundColor: colorVar }} />
        <input
          type="range" min={min} max={max} step={step} value={local}
          onChange={e => setLocal(parseFloat(e.target.value))}
          onMouseUp={() => onCommitValue(local)}
          onTouchEnd={() => onCommitValue(local)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
      <span className="text-xs w-8 text-right shrink-0" style={{ color: colorVar }}>{local}</span>
    </div>
  );
};
