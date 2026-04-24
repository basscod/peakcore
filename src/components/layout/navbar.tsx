"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 group bg-background border-b border-transparent transition-colors duration-300">
      <div className="flex items-center justify-between px-8 h-16">
        {/* Logo / Brand */}
        <Link href="/" className="h5 hover:text-primary-500 transition-colors">
          basscore
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link
              href="/design"
              className="body-sm font-medium hover:text-primary-500 transition-colors"
            >
              Design
            </Link>
            <Link
              href="/overview"
              className="body-sm font-medium hover:text-primary-500 transition-colors"
            >
              Dashboard
            </Link>
          </div>

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-500 transition-all duration-500 ease-in-out group-hover:w-full" />
    </nav>
  );
}
