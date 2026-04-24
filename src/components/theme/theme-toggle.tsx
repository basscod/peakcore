"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "../ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="w-10 h-10" /> // Placeholder to prevent layout shift
    );
  }

  return (
    <Toggle
      variant="light"
      size="md"
      pressed={theme === "dark"}
      icon={theme === "dark" ? Sun : Moon}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
