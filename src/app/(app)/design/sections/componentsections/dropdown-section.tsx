"use client";

import React from "react";
import { Dropdown } from "@/components/ui/dropdown";
import {
  Zap, Settings, User, Globe, Database,
  Star, Filter, Tag, Lock, Bell,
} from "lucide-react";

const COLORS    = ["primary", "secondary", "accent", "neutral"] as const;
const VARIANTS  = ["standard", "outline", "ghost", "industrial"] as const;
const SIZES     = ["sm", "md", "lg"] as const;

const BASE_OPTIONS = [
  { label: "Alpha Node",  value: "alpha"  },
  { label: "Beta Node",   value: "beta"   },
  { label: "Gamma Array", value: "gamma"  },
  { label: "Delta Core",  value: "delta"  },
  { label: "Epsilon Hub", value: "eps"    },
];

const STATUS_OPTIONS = [
  { label: "Active",   value: "active",   icon: Zap      },
  { label: "Standby",  value: "standby",  icon: Settings },
  { label: "Offline",  value: "offline",  icon: Lock     },
  { label: "Monitor",  value: "monitor",  icon: Bell     },
];

const ICON_OPTIONS = [
  { label: "Profile",  value: "profile",  icon: User     },
  { label: "Network",  value: "network",  icon: Globe    },
  { label: "Database", value: "database", icon: Database },
  { label: "Starred",  value: "starred",  icon: Star     },
  { label: "Filters",  value: "filters",  icon: Filter   },
  { label: "Tags",     value: "tags",     icon: Tag      },
];

// ─── Controlled state wrapper ─────────────────────────────────────────────────

type DropdownColor   = "primary" | "secondary" | "accent" | "neutral";
type DropdownVariant = "standard" | "outline" | "ghost" | "industrial";
type DropdownSize    = "sm" | "md" | "lg";

interface DemoDropdownProps {
  variant?:   DropdownVariant;
  color?:     DropdownColor;
  size?:      DropdownSize;
  icon?:      React.ElementType;
  options?:   { label: string; value: string; icon?: React.ElementType }[];
  expanding?: boolean;
  placeholder?: string;
}

const DemoDropdown = (props: DemoDropdownProps) => {
  const [value, setValue] = React.useState("");
  return (
    <Dropdown
      {...props}
      options={props.options ?? BASE_OPTIONS}
      value={value}
      onChange={setValue}
    />
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

export function DropdownSection() {
  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Page header */}
      <div className="space-y-2 border-b stroke-light border-neutral-100 pb-4">
        <h2 className="h1">Dropdowns</h2>
        <p className="body-sm text-neutral-400">
          Selection menus with four variants, four colors, three sizes, icon slots, and expanding trigger behavior.
        </p>
      </div>

      {/* ── 1. Variant × Color matrix ── */}
      <section className="space-y-12">
        <h3 className="h3 uppercase border-l-4 border-primary-500 pl-4">Variant Matrix</h3>
        <div className="space-y-10">
          {VARIANTS.map(v => (
            <div key={v} className="space-y-4">
              <h4 className="h4 uppercase text-neutral-500">{v}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {COLORS.map(c => (
                  <div key={`${v}-${c}`} className="space-y-2">
                    <p className="caption text-neutral-400 font-mono uppercase">{c}</p>
                    <DemoDropdown variant={v} color={c} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Size scale ── */}
      <section className="space-y-8">
        <h3 className="h3 uppercase border-l-4 border-secondary-500 pl-4">Size Scale</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIZES.map(s => (
            <div key={s} className="space-y-3">
              <p className="caption text-neutral-400 uppercase font-mono">{s}</p>
              <div className="space-y-3">
                <DemoDropdown size={s} variant="outline" color="primary" />
                <DemoDropdown size={s} variant="industrial" color="secondary" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. With icons ── */}
      <section className="space-y-8">
        <h3 className="h3 uppercase border-l-4 border-accent-500 pl-4">With Icons</h3>
        <p className="body-sm text-neutral-400 -mt-4">Options with icons display them in the list. Trigger can also carry a leading icon.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Status — outline</p>
            <DemoDropdown variant="outline" color="primary" options={STATUS_OPTIONS} placeholder="STATUS" />
          </div>
          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Status — industrial</p>
            <DemoDropdown variant="industrial" color="accent" options={STATUS_OPTIONS} placeholder="STATUS" />
          </div>
          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Icon options — standard</p>
            <DemoDropdown variant="standard" color="secondary" options={ICON_OPTIONS} placeholder="RESOURCE" />
          </div>
          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Icon options — ghost</p>
            <DemoDropdown variant="ghost" color="neutral" options={ICON_OPTIONS} placeholder="RESOURCE" />
          </div>
        </div>

        {/* Trigger icons */}
        <div className="space-y-4">
          <h4 className="h4 uppercase text-neutral-500">Trigger Icons</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {([
              { icon: Filter,   color: "primary",   variant: "outline"    },
              { icon: Settings, color: "secondary",  variant: "outline"    },
              { icon: Database, color: "accent",     variant: "industrial" },
              { icon: Bell,     color: "neutral",    variant: "ghost"      },
            ] as const).map(({ icon, color, variant }) => (
              <div key={`${color}-${variant}`} className="space-y-2">
                <p className="caption text-neutral-400 font-mono uppercase">{color} — {variant}</p>
                <DemoDropdown icon={icon} variant={variant} color={color} options={STATUS_OPTIONS} placeholder="FILTER" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Expanding trigger ── */}
      <section className="space-y-8">
        <h3 className="h3 uppercase border-l-4 border-primary-500 pl-4">Expanding Trigger</h3>
        <p className="body-sm text-neutral-400 -mt-4">
          When <code className="codes">expanding</code> is set, the trigger collapses to an icon-only button and expands on hover/open or when a value is selected.
          Used in the DatabaseTable toolbar.
        </p>
        <div className="flex flex-wrap items-start gap-4">
          {COLORS.map(c => (
            <div key={c} className="space-y-2">
              <p className="caption text-neutral-400 font-mono uppercase">{c}</p>
              <DemoDropdown expanding icon={Filter} variant="outline" color={c} placeholder="FILTER" />
            </div>
          ))}
          {VARIANTS.map(v => (
            <div key={v} className="space-y-2">
              <p className="caption text-neutral-400 font-mono uppercase">{v}</p>
              <DemoDropdown expanding icon={Settings} variant={v} color="primary" placeholder="OPTIONS" />
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. States ── */}
      <section className="space-y-8">
        <h3 className="h3 uppercase border-l-4 border-secondary-500 pl-4">States</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Empty (no selection)</p>
            <Dropdown variant="outline" color="primary" options={BASE_OPTIONS} placeholder="SELECT NODE" />
          </div>

          {/* Pre-selected */}
          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Pre-selected value</p>
            <Dropdown variant="outline" color="primary" options={BASE_OPTIONS} value="gamma" onChange={() => {}} />
          </div>

          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Empty list</p>
            <Dropdown variant="outline" color="accent" options={[]} placeholder="NO OPTIONS" />
          </div>

          <div className="space-y-2">
            <p className="caption text-neutral-400 font-mono uppercase">Industrial + pre-selected</p>
            <Dropdown variant="industrial" color="secondary" options={STATUS_OPTIONS} value="active" onChange={() => {}} />
          </div>
        </div>
      </section>

    </div>
  );
}
