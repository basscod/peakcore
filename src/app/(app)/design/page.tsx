"use client";

import React from "react";
import GlobalStyles from "./sections/globalstyles";
import ComponentsShowcase from "./sections/components";
import FloatingNav from "./components/FloatingNav";

export default function DesignPage() {
  const [activeTab, setActiveTab] = React.useState<"global" | "components">("components");

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="p-8">
        {activeTab === "global" ? <GlobalStyles /> : <ComponentsShowcase />}
      </div>

      <FloatingNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
