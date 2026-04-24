"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
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
    </div>
  );
}
