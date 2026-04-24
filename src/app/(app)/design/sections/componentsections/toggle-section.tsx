"use client";

import React from "react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleFull } from "@/components/ui/toggle-full";
import { Layout, Plus } from "lucide-react";

export function ToggleSection() {
  const [val1, setVal1] = React.useState("opt1");
  const variants = ["solid", "outline", "light", "underline", "ghost"] as const;
  const colors = ["primary", "secondary", "accent", "neutral"] as const;

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 border-b border-neutral-100 pb-4">
        <h2 className="h1">Toggle Systems</h2>
        <p className="body-sm text-neutral-400">Segmented controls and binary switches for state management.</p>
      </div>

      {/* 1. ToggleFull (Segmented) All Colors */}
      <div className="space-y-12">
        <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">ToggleFull Matrix</h3>
        <div className="space-y-4">
          {colors.map((c) => (
            <div key={c} className="grid grid-cols-[100px_1fr] items-center gap-8 p-4 radius-md border border-neutral-100/50 transition-colors">
              <p className="caption text-neutral-400 font-mono uppercase">{c}</p>
              <div className="flex flex-wrap items-center gap-6">
                {variants.map((v) => (
                  <div key={`${c}-${v}`} className="flex flex-col gap-2">
                    <ToggleFull
                      color={c}
                      variant={v}
                      value={val1}
                      onChange={setVal1}
                      options={[
                        { label: "Option 1", value: "opt1", icon: Layout },
                        { label: "Option 2", value: "opt2" },
                      ]}
                    />
                    <p className="text-[10px] text-neutral-400 text-center font-mono uppercase">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Binary Toggle All Colors */}
      <div className="space-y-12">
        <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">Binary Toggle Matrix</h3>
        <div className="space-y-4">
          {colors.map((c) => (
            <div key={c} className="grid grid-cols-[100px_1fr] items-center gap-8 p-4 radius-md border border-neutral-100/50 transition-colors">
              <p className="caption text-neutral-400 font-mono uppercase">{c}</p>
              <div className="flex flex-wrap items-center gap-10">
                {variants.map((v) => (
                  <div key={`${c}-${v}`} className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <Toggle variant={v} color={c} pressed icon={Plus} />
                      <div className="w-[1px] h-4 bg-neutral-200" />
                      <Toggle variant={v} color={c} icon={Plus} />
                    </div>
                    <p className="text-[10px] text-neutral-400 font-mono uppercase">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
