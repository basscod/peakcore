"use client";

import { Layout, Box } from "lucide-react";
import { ToggleFull } from "@/components/ui/toggle-full";

interface FloatingNavProps {
  activeTab: "global" | "components";
  onTabChange: (tab: "global" | "components") => void;
}

export default function FloatingNav({ activeTab, onTabChange }: FloatingNavProps) {
  const options = [
    { label: "Global Styles", value: "global", icon: Layout },
    { label: "Components", value: "components", icon: Box },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <ToggleFull
        options={options}
        value={activeTab}
        onChange={(val) => onTabChange(val as "global" | "components")}
        variant="solid"
        color="primary"
        size="md"
        className="shadow-2xl"
      />
    </div>
  );
}
