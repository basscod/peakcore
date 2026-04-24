"use client";

import React from "react";
import { ToggleFull } from "@/components/ui/toggle-full";
import { MousePointerClick, ToggleLeft, Layout, Type, Table as TableIcon, ChevronDown } from "lucide-react";

// Section Imports
import { ButtonSection }   from "./componentsections/button-section";
import { ToggleSection }   from "./componentsections/toggle-section";
import { CardSection }     from "./componentsections/card-section";
import { InputSection }    from "./componentsections/input-section";
import { TableSection }    from "./componentsections/table-section";
import { DropdownSection } from "./componentsections/dropdown-section";

export default function ComponentsShowcase() {
  const [activeSection, setActiveSection] = React.useState("buttons");

  const componentOptions = [
    { label: "Buttons",   value: "buttons",   icon: MousePointerClick },
    { label: "Toggles",   value: "toggles",   icon: ToggleLeft        },
    { label: "Cards",     value: "cards",     icon: Layout            },
    { label: "Inputs",    value: "inputs",    icon: Type              },
    { label: "Dropdowns", value: "dropdowns", icon: ChevronDown       },
    { label: "Tables",    value: "tables",    icon: TableIcon         },
  ];

  return (
    <div className="space-y-24 pb-32">
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="caption text-primary-500">basscore library</p>
        </div>

        {/* Floating Navigator */}
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <ToggleFull
            variant="solid"
            color="primary"
            size="lg"
            options={componentOptions}
            value={activeSection}
            onChange={setActiveSection}
            className="shadow-2xl border-neutral-100/10"
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="min-h-[60vh]">
        {activeSection === "buttons"   && <ButtonSection   />}
        {activeSection === "toggles"   && <ToggleSection   />}
        {activeSection === "cards"     && <CardSection     />}
        {activeSection === "inputs"    && <InputSection    />}
        {activeSection === "dropdowns" && <DropdownSection />}
        {activeSection === "tables"    && <TableSection    />}
      </div>
    </div>
  );
}
