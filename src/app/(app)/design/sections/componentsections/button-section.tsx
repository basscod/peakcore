"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, ArrowRight, Settings } from "lucide-react";

export function ButtonSection() {
  const variants = ["solid", "outline", "light", "underline", "ghost"] as const;
  const colors = ["primary", "secondary", "accent", "neutral"] as const;
  const sizes = ["2xs", "xs", "sm", "md", "lg"] as const;

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Introduction */}
      <div className="space-y-2 border-b border-neutral-100 pb-4">
        <h2 className="h1">Button System</h2>
        <p className="body-sm text-neutral-400">Adaptive action components with semantic feedback loops.</p>
      </div>

      {/* 1. All Combinations Matrix */}
      <div className="space-y-16">
        {variants.map((v) => (
          <div key={v} className="space-y-8">
            <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">{v} Variant</h3>
            <div className="space-y-4">
              {colors.map((c) => (
                <div key={`${v}-${c}`} className="grid grid-cols-[100px_1fr] items-center gap-8 p-4 radius-md border border-neutral-100/50 transition-colors">
                  <p className="caption text-neutral-400 font-mono uppercase">{c}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant={v} color={c}>Label Text</Button>
                    <Button variant={v} color={c} iconLeft={Plus}>Action</Button>
                    <Button variant={v} color={c} iconRight={ArrowRight}>Proceed</Button>
                    <Button variant={v} color={c} iconLeft={Settings} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Precision Scaling */}
      <div className="space-y-8">
        <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">Precision Scaling</h3>
        <div className="flex flex-wrap items-end gap-10 p-8 radius-lg border border-neutral-100">
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <Button variant="solid" color="primary" size={s}>
                {s.toUpperCase()}
              </Button>
              <p className="caption text-neutral-400 font-mono">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. States */}
      <div className="space-y-8">
        <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">Interactive States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="outline" className="p-6 space-y-4">
            <p className="caption text-neutral-500">Loading State</p>
            <Button variant="solid" isLoading className="w-full">Processing</Button>
          </Card>
          <Card variant="outline" className="p-6 space-y-4">
            <p className="caption text-neutral-500">Disabled State</p>
            <Button variant="outline" disabled className="w-full">Locked</Button>
          </Card>
          <Card variant="outline" className="p-6 space-y-4">
            <p className="caption text-neutral-500">Full Width</p>
            <Button variant="light" color="accent" className="w-full">Maximum Expansion</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
