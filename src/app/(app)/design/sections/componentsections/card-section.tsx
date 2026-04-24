"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export function CardSection() {
  const variants = ["solid", "outline", "callout", "ghost"] as const;
  const colors = ["primary", "secondary", "accent", "neutral"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
        <h2 className="h1">Card System</h2>
        <p className="body-sm text-neutral-400">Structural containers with modular surfacing and industrial-grade interactivity.</p>
      </div>

      {/* 1. All Combinations Matrix */}
      <div className="space-y-16">
        {variants.map((v) => (
          <div key={v} className="space-y-8">
            <h3 className="h3 uppercase tracking-tighter border-l-4 border-primary-500 pl-4">{v} Variant</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {colors.map((c) => (
                <Card key={`${v}-${c}`} variant={v} color={c} size="md">
                  <CardHeader>
                    <h4 className="caption font-bold">
                      {c} {v}
                    </h4>
                  </CardHeader>
                  <CardContent className="mt-2">
                    <p className="body-sm text-neutral-500">
                      Modular {v} container using {c} semantic mapping.
                    </p>
                  </CardContent>
                  <CardFooter className="mt-4">
                    <span className="text-[0.6rem] font-mono text-neutral-400 px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 radius-sm">
                      {v.toUpperCase()}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Size Scales */}
      <div className="space-y-12">
        <h3 className="h3 uppercase tracking-tighter border-l-4 border-accent-500 pl-4">Size Ecosystem</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {sizes.map((s) => (
            <Card key={s} size={s} variant="outline" color="primary">
              <CardHeader>
                <h4 className="h4 uppercase">{s} Size</h4>
              </CardHeader>
              <CardContent className="mt-4">
                <p className="body-sm text-neutral-500">
                  Size {s} defines both padding and border radius.
                </p>
              </CardContent>
              <CardFooter className="mt-4">
                <p className="caption text-primary-500 font-bold">Radius-{s}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
