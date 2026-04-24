"use client";

import { Button } from "@/components/ui/button";
import { LayoutDashboard, Terminal, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground transition-colors duration-300">
      <div className="space-y-8 text-center flex flex-col items-center">
        {/* Mission Directive Emphasis */}
        <div className="callout border-accent-500 bg-accent-500/5 animate-pulse flex items-center gap-3">
          <Zap className="w-4 h-4 text-accent-500" />
          <span className="caption text-accent-500 font-bold tracking-[0.2em]">
            DIRECTIVE: DONT ABANDON THIS MISSION
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="display">basscore</h1>
          <p className="body-lg text-neutral-500 max-w-lg mx-auto">
            Industrial-minimalist productivity suite.
            The core design system is active.
            Maintain operational integrity.
          </p>
        </div>

        <div className="flex gap-4 justify-center pt-6">
          <Button
            variant="solid"
            color="primary"
            size="lg"
            iconLeft={Terminal}
            href="/design"
          >
            System Styles
          </Button>
          <Button
            variant="outline"
            color="neutral"
            size="lg"
            iconLeft={LayoutDashboard}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
