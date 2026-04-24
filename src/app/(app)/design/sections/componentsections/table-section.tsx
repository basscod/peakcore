"use client";

import React from "react";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  DatabaseTable,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, ShieldCheck, AlertCircle, Clock3 } from "lucide-react";

// ─── Static demo data ─────────────────────────────────────────────────────────

const BASIC_ROWS = [
  { id: "X-01", name: "Core Reactor",  status: "STABLE",  power: "940 kW" },
  { id: "X-02", name: "Backup Array",  status: "STANDBY", power: "120 kW" },
  { id: "X-03", name: "Cooling Node",  status: "ACTIVE",  power: "450 kW" },
];

type NodeRow = {
  id:       string;
  node:     string;
  status:   string;
  deployed: string;
  window:   string;
  priority: number;
  owner:    string;
};

const DB_DATA: NodeRow[] = [
  { id: "NODE-01", node: "Orbital Uplink",   status: "active",   deployed: "2026-03-14", window: "09:00", priority: 85, owner: "ADMIN"    },
  { id: "NODE-02", node: "Fusion Core",      status: "standby",  deployed: "2026-04-01", window: "14:30", priority: 60, owner: "TECH-01"  },
  { id: "NODE-03", node: "Cryo Storage",     status: "active",   deployed: "2026-01-22", window: "00:00", priority: 40, owner: "ADMIN"    },
  { id: "NODE-04", node: "Security Array",   status: "error",    deployed: "2026-04-15", window: "11:15", priority: 95, owner: "SEC-LEAD" },
  { id: "NODE-05", node: "Hydroponics Bay",  status: "active",   deployed: "2026-02-08", window: "07:45", priority: 30, owner: "TECH-02"  },
];

const STATUS_OPTIONS = [
  { label: "Active",  value: "active"  },
  { label: "Standby", value: "standby" },
  { label: "Error",   value: "error"   },
  { label: "Offline", value: "offline" },
];

const OWNER_OPTIONS = [
  { label: "ADMIN",    value: "ADMIN"    },
  { label: "TECH-01",  value: "TECH-01"  },
  { label: "TECH-02",  value: "TECH-02"  },
  { label: "SEC-LEAD", value: "SEC-LEAD" },
];

const StatusBadge = ({ value }: { value: unknown }) => {
  const v = String(value ?? "").toLowerCase();
  const cfg = {
    active:  { icon: ShieldCheck,  cls: "text-success-500 bg-success-500/10"  },
    standby: { icon: Clock3,       cls: "text-warning-500 bg-warning-500/10"  },
    error:   { icon: AlertCircle,  cls: "text-error-500 bg-error-500/10"      },
    offline: { icon: AlertCircle,  cls: "text-neutral-400 bg-neutral-200/50"  },
  }[v] ?? { icon: AlertCircle, cls: "text-neutral-400 bg-neutral-200/50" };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 radius-sm caption font-mono uppercase ${cfg.cls}`}>
      <Icon className="w-3 h-3" />
      {v}
    </span>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

export function TableSection() {
  const variants = ["striped", "bordered", "industrial"] as const;
  const colors   = ["primary", "secondary", "accent", "neutral"] as const;
  const densities = ["compact", "standard", "spacious"] as const;

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Page header */}
      <div className="space-y-2 border-b stroke-light border-neutral-100 pb-4">
        <h2 className="h1">Data Tables</h2>
        <p className="body-sm text-neutral-400">Structured display systems — from raw primitives to fully editable database tables.</p>
      </div>

      {/* ── 1. Standard Table Primitives ── */}
      <section className="space-y-12">
        <h3 className="h3 uppercase border-l-4 border-primary-500 pl-4">Standard Table</h3>
        <p className="body-sm text-neutral-400 -mt-8">
          Composable primitives: <code className="codes">Table</code>, <code className="codes">TableHeader</code>, <code className="codes">TableBody</code>,{" "}
          <code className="codes">TableRow</code>, <code className="codes">TableHead</code>, <code className="codes">TableCell</code>.
        </p>

        {/* Variant × Color matrix */}
        {variants.map(v => (
          <div key={v} className="space-y-10">
            <h4 className="h4 uppercase text-neutral-500">{v} variant</h4>
            <div className="space-y-6">
              {colors.map(c => (
                <div key={`${v}-${c}`} className="space-y-2">
                  <p className="caption text-neutral-400 font-mono uppercase">{c}</p>
                  <Table variant={v} color={c}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>System ID</TableHead>
                        <TableHead>Node Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {BASIC_ROWS.map(row => (
                        <TableRow key={row.id}>
                          <TableCell className="font-mono">{row.id}</TableCell>
                          <TableCell className="font-semibold">{row.name}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell className="text-right">
                            <Button size="2xs" variant="ghost" color={c} iconLeft={Edit2} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Density scale */}
        <div className="space-y-6 pt-4">
          <h4 className="h4 uppercase text-neutral-500">Density Scale</h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {densities.map(d => (
              <div key={d} className="space-y-2">
                <p className="caption text-neutral-400 uppercase">{d}</p>
                <Table density={d} variant="bordered" color="primary">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Label</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>System Uptime</TableCell><TableCell>1,240 hrs</TableCell></TableRow>
                    <TableRow><TableCell>Efficiency</TableCell><TableCell>99.4%</TableCell></TableRow>
                    <TableRow><TableCell>Queue Depth</TableCell><TableCell>3 tasks</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Database Table ── */}
      <section className="space-y-12">
        <div className="space-y-2">
          <h3 className="h3 uppercase border-l-4 border-accent-500 pl-4">Database Table</h3>
          <p className="body-sm text-neutral-400">
            Fully editable cells with five field types — click any non-readonly cell to edit in place.
          </p>
        </div>

        {/* Field type legend */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Text",     desc: "Inline input"          },
            { label: "Date",     desc: "Calendar picker"       },
            { label: "Time",     desc: "HH/MM column picker"   },
            { label: "Select",   desc: "Dropdown list"         },
            { label: "Slider",   desc: "Range with value"      },
          ].map(f => (
            <div key={f.label} className="border stroke-light border-neutral-200 radius-lg px-3 py-2 space-y-0.5">
              <p className="caption font-mono text-primary-500 uppercase">{f.label}</p>
              <p className="caption text-neutral-400">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Primary */}
        <div className="space-y-3">
          <p className="caption text-neutral-400 font-mono uppercase">Primary Theme</p>
          <DatabaseTable<NodeRow>
            title="Node Registry"
            color="primary"
            data={DB_DATA}
            columns={[
              { key: "id",       header: "Node ID",    type: "readonly", width: "100px" },
              { key: "node",     header: "Name",       type: "text"                     },
              { key: "status",   header: "Status",     type: "select",   options: STATUS_OPTIONS,
                render: (v) => <StatusBadge value={v} /> },
              { key: "deployed", header: "Deployed",   type: "date"                     },
              { key: "window",   header: "Window",     type: "time"                     },
              { key: "priority", header: "Priority",   type: "slider",   min: 0, max: 100, step: 5 },
              { key: "owner",    header: "Owner",      type: "select",   options: OWNER_OPTIONS   },
            ]}
          />
        </div>

        {/* Secondary */}
        <div className="space-y-3">
          <p className="caption text-neutral-400 font-mono uppercase">Secondary Theme</p>
          <DatabaseTable<NodeRow>
            title="Deployment Schedule"
            color="secondary"
            data={DB_DATA}
            columns={[
              { key: "id",       header: "ID",         type: "readonly", width: "100px" },
              { key: "node",     header: "Asset",      type: "text"                     },
              { key: "deployed", header: "Date",       type: "date"                     },
              { key: "window",   header: "Time",       type: "time"                     },
              { key: "priority", header: "Priority",   type: "slider",   min: 0, max: 100, step: 5 },
              { key: "owner",    header: "Assigned",   type: "select",   options: OWNER_OPTIONS   },
            ]}
          />
        </div>

        {/* Accent */}
        <div className="space-y-3">
          <p className="caption text-neutral-400 font-mono uppercase">Accent Theme</p>
          <DatabaseTable<NodeRow>
            title="Asset Manifest"
            color="accent"
            data={DB_DATA}
            columns={[
              { key: "id",       header: "Ref",        type: "readonly", width: "100px" },
              { key: "node",     header: "Name",       type: "text"                     },
              { key: "status",   header: "Status",     type: "select",   options: STATUS_OPTIONS  },
              { key: "priority", header: "Load",       type: "slider",   min: 0, max: 100, step: 1 },
              { key: "owner",    header: "Owner",      type: "select",   options: OWNER_OPTIONS   },
            ]}
          />
        </div>
      </section>

    </div>
  );
}
