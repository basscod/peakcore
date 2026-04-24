"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, DataTable } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

export function TableSection() {
  const densities = ["compact", "standard", "spacious"] as const;
  const variants = ["striped", "bordered", "industrial"] as const;
  const colors = ["primary", "secondary", "accent", "neutral"] as const;

  const mockData = [
    { id: "X-01", name: "Core Reactor", status: "STABLE", power: "940kW" },
    { id: "X-02", name: "Backup Array", status: "STANDBY", power: "120kW" },
    { id: "X-03", name: "Cooling Node", status: "ACTIVE", power: "450kW" },
  ];

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 border-b border-neutral-100 pb-4">
        <h2 className="h1">Data Tables</h2>
        <p className="body-sm text-neutral-400">Structured information display for dense industrial datasets.</p>
      </div>

      {/* 1. Architecture Variants & Colors Matrix */}
      <div className="space-y-24">
        {variants.map((v) => (
          <div key={v} className="space-y-12">
            <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">{v} Variant matrix</h3>
            <div className="space-y-8">
              {colors.map((c) => (
                <div key={`${v}-${c}`} className="space-y-4">
                  <p className="caption text-neutral-400 font-mono uppercase">{c} Theme</p>
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
                      {mockData.map((row) => (
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
      </div>

      {/* 2. Density Scales */}
      <div className="space-y-12">
        <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">Density Ecosystem</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {densities.map((d) => (
            <div key={d} className="space-y-4">
              <p className="caption text-neutral-500 uppercase">{d} Spacing</p>
              <Table density={d} variant="bordered" color="primary">
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>System Uptime</TableCell>
                    <TableCell>1,240 hrs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Efficiency Rate</TableCell>
                    <TableCell>99.4%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </div>
      {/* 3. DataTable (Pro System) */}
      <div className="space-y-24">
        <div className="space-y-4">
          <h2 className="h2 uppercase tracking-tighter">Pro Data Management</h2>
          <p className="body-sm text-neutral-400">Advanced table systems with integrated search, filter, and sort capabilities.</p>
        </div>

        {/* Variant: Industrial Primary */}
        <div className="space-y-8">
          <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">Industrial Variant (Primary)</h3>
          <DataTable
            title="Terminal Network Protocols"
            variant="industrial"
            color="primary"
            columns={[
              { header: "Node ID", accessor: "id" },
              { header: "Status", accessor: "status" },
              { header: "Latency", accessor: "latency" },
              { header: "Throughput", accessor: "throughput" },
            ]}
            data={[
              { id: "NODE-A1", status: "Active", latency: "12ms", throughput: "1.2GB/s" },
              { id: "NODE-B2", status: "Standby", latency: "45ms", throughput: "400MB/s" },
              { id: "NODE-C3", status: "Active", latency: "8ms", throughput: "2.4GB/s" },
              { id: "NODE-D4", status: "Error", latency: "999ms", throughput: "0MB/s" },
              { id: "NODE-E5", status: "Active", latency: "15ms", throughput: "1.1GB/s" },
            ]}
          />
        </div>

        {/* Variant: Striped Accent */}
        <div className="space-y-8">
          <h3 className="h3 uppercase tracking-tighter border-l-4 border-accent-500 pl-4">Striped Variant (Accent)</h3>
          <DataTable
            title="Asset Deployment Registry"
            variant="striped"
            color="accent"
            density="compact"
            columns={[
              { header: "Asset Name", accessor: "name" },
              { header: "Type", accessor: "type" },
              { header: "Deployment", accessor: "date" },
              { header: "Owner", accessor: "owner" },
            ]}
            data={[
              { name: "Orbital Uplink", type: "COMM", date: "2026-04-12", owner: "ADMIN" },
              { name: "Fusion Core", type: "PWR", date: "2026-03-20", owner: "TECH-01" },
              { name: "Cryo Storage", type: "LOG", date: "2026-04-01", owner: "ADMIN" },
              { name: "Security Array", type: "SEC", date: "2026-04-15", owner: "SEC-LEAD" },
              { name: "Hydroponics", type: "BIO", date: "2026-01-10", owner: "TECH-02" },
            ]}
          />
        </div>

        {/* Variant: Bordered Secondary */}
        <div className="space-y-8">
          <h3 className="h3 uppercase tracking-tighter border-l-4 border-secondary-500 pl-4">Bordered Variant (Secondary)</h3>
          <DataTable
            title="User Authorization Logs"
            variant="bordered"
            color="secondary"
            columns={[
              { header: "Timestamp", accessor: "time" },
              { header: "Identity", accessor: "user" },
              { header: "Access Level", accessor: "level" },
              { header: "Action", accessor: "action" },
            ]}
            data={[
              { time: "09:42:15", user: "j.doe", level: "04", action: "GATE_OPEN" },
              { time: "10:05:32", user: "a.smith", level: "02", action: "FILE_READ" },
              { time: "11:20:11", user: "system", level: "05", action: "SCRUB_SYNC" },
              { time: "12:01:45", user: "m.ross", level: "01", action: "LOGIN_FAIL" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
