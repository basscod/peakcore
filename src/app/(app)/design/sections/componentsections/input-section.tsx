"use client";

import React from "react";
import { InputField } from "@/components/ui/input-field";
import { Search, Info, Eye, Lock } from "lucide-react";

export function InputSection() {
  const variants = ["standard", "filled", "underline", "ghost"] as const;
  const colors = ["primary", "secondary", "accent", "neutral"] as const;

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 border-b stroke-light border-neutral-100 pb-4">
        <h2 className="h1">Input System</h2>
        <p className="body-sm text-neutral-400">High-precision data entry with semantic feedback and adaptive states.</p>
      </div>

      {/* 1. All Combinations Matrix */}
      <div className="space-y-16">
        {variants.map((v) => (
          <div key={v} className="space-y-8">
            <h3 className="h3 uppercase border-l-4 border-primary-500 pl-4">{v} Variant</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {colors.map((c) => (
                <InputField 
                  key={`${v}-${c}`} 
                  color={c} 
                  variant={v} 
                  label={`${c.toUpperCase()} ${v}`} 
                  placeholder={`Active ${c} state...`}
                  iconLeft={Search}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Feedback States */}
      <div className="space-y-12">
        <h3 className="h3">4.2 Feedback & Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <InputField 
              label="Success Verification" 
              defaultValue="Protocol Alpha-9" 
              status="success" 
              helperText="Security handshake completed." 
              iconRight={Info} 
            />
            <InputField 
              label="Error Handover" 
              defaultValue="Invalid Token" 
              status="error" 
              helperText="Authentication checksum failed." 
              iconRight={Info} 
            />
          </div>
          <div className="space-y-8">
            <InputField label="Secure Entry" type="password" placeholder="••••••••" iconLeft={Lock} iconRight={Eye} />
            <InputField label="Disabled State" disabled placeholder="Node locked" />
          </div>
        </div>
      </div>

      {/* 3. Precision Scaling */}
      <div className="space-y-8">
        <h3 className="h3 uppercase border-l-4 border-primary-500 pl-4">Precision Scaling</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-12 p-8 radius-lg border stroke-light border-neutral-100 bg-background/50">
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s} className="flex flex-col gap-3">
              <InputField 
                size={s} 
                variant="filled" 
                color="primary" 
                label={`SIZE ${s.toUpperCase()}`} 
                placeholder="Data entry..." 
                iconLeft={Search}
              />
              <p className="caption text-neutral-400 font-mono text-center">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
