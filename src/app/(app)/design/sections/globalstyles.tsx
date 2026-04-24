export default function GlobalStyles() {
  const scales = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const colorFamilies = [
    { name: "Primary (Lime)", key: "primary", hasScales: true },
    { name: "Secondary (Navy)", key: "secondary", hasScales: true },
    { name: "Accent (Orange)", key: "accent", hasScales: true },
    { name: "Neutral", key: "neutral", hasScales: true },
    { name: "Success (Green)", key: "success", hasScales: false },
    { name: "Warning (Amber)", key: "warning", hasScales: false },
    { name: "Error (Red)", key: "error", hasScales: false },
  ];

  const radii = [
    { name: "radius-sm", class: "radius-sm" },
    { name: "radius-md", class: "radius-md" },
    { name: "radius-lg", class: "radius-lg" },
  ];

  const strokeWeights = [
    { name: "stroke-light", class: "stroke-light" },
    { name: "stroke-normal", class: "stroke-normal" },
    { name: "stroke-bold", class: "stroke-bold" },
    { name: "stroke-black", class: "stroke-black" },
  ];

  const strokeStyles = [
    { name: "stroke-solid", class: "stroke-solid" },
    { name: "stroke-dashed", class: "stroke-dashed" },
    { name: "stroke-dotted", class: "stroke-dotted" },
  ];

  return (
    <main className="p-8 space-y-16 bg-background text-foreground transition-colors duration-300">
      {/* Typography Section */}
      <section className="space-y-8">
        <div className="space-y-2">
          <p className="caption">System Documentation</p>
          <h1 className="display">Typography</h1>
          <p className="body-sm text-neutral-500">Hover over headings to see the smooth primary color transition.</p>
        </div>
        
        <div className="space-y-10">
          <div className="space-y-6 p-6 border stroke-light border-neutral-200 radius-lg">
            <h2 className="h2 stroke-light border-b border-neutral-100 pb-2 mb-4">Headings</h2>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="caption text-primary-500">.h1</p>
                <h1 className="h1">The industrial revolution and its consequences</h1>
              </div>
              <div className="space-y-1">
                <p className="caption text-primary-500">.h2</p>
                <h2 className="h2">Automated intelligence systems</h2>
              </div>
              <div className="space-y-1">
                <p className="caption text-primary-500">.h3</p>
                <h3 className="h3">Strategic neural interfaces</h3>
              </div>
              <div className="space-y-1">
                <p className="caption text-primary-500">.h4</p>
                <h4 className="h4">Quantum encrypted protocols</h4>
              </div>
              <div className="space-y-1">
                <p className="caption text-primary-500">.h5</p>
                <h5 className="h5">Distributed ledger validation</h5>
              </div>
              <div className="space-y-1">
                <p className="caption text-primary-500">.h6</p>
                <h6 className="h6">Micro-modular architecture</h6>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 border stroke-light border-neutral-200 radius-lg">
            <h2 className="h2 stroke-light border-b border-neutral-100 pb-2 mb-4">Body & Content</h2>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="caption text-secondary-500">.body-lg</p>
                <p className="body-lg">Large body text for introductory paragraphs and high-importance content where legibility is paramount.</p>
              </div>
              <div className="space-y-1">
                <p className="caption text-secondary-500">.body</p>
                <p className="body">Standard body text used for the majority of the interface content. It balances density with readability across all devices.</p>
              </div>
              <div className="space-y-1">
                <p className="caption text-secondary-500">.body-sm</p>
                <p className="body-sm">Smaller body text for secondary information, sidebars, and dense data displays.</p>
              </div>
              <div className="space-y-1">
                <p className="caption text-accent-500">.caption</p>
                <p className="caption">Meta-information, labels, and micro-copy.</p>
              </div>
              <div className="space-y-1">
                <p className="caption text-accent-500">.codes</p>
                <p>Use <code className="codes">npm run dev</code> to start the neural link.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout & Strokes Section */}
      <section className="space-y-8">
        <h2 className="h1">Strokes & Radius</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Radius Scales */}
          <div className="space-y-4 p-6 border stroke-light border-neutral-200 radius-lg">
            <h3 className="h3">Border Radius</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {radii.map((r) => (
                <div key={r.name} className="space-y-2">
                  <div className={`h-24 w-full bg-neutral-100 border stroke-light border-neutral-300 ${r.class}`} />
                  <p className="caption text-center">{r.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stroke Weights */}
          <div className="space-y-4 p-6 border stroke-light border-neutral-200 radius-lg">
            <h3 className="h3">Stroke Weights</h3>
            <div className="space-y-4">
              {strokeWeights.map((w) => (
                <div key={w.name} className="flex items-center gap-4">
                  <div className={`flex-1 h-4 bg-neutral-100 border border-neutral-400 ${w.class} stroke-solid radius-sm`} />
                  <p className="caption w-24">{w.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stroke Styles */}
          <div className="space-y-4 p-6 border stroke-light border-neutral-200 radius-lg col-span-full">
            <h3 className="h3">Stroke Styles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {strokeStyles.map((s) => (
                <div key={s.name} className="space-y-2">
                  <div className={`h-32 w-full bg-neutral-100 border stroke-normal border-neutral-400 ${s.class} radius-md flex items-center justify-center`}>
                    <p className="caption text-neutral-400">{s.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="space-y-6">
        <h2 className="h1">Color Palette</h2>
        
        <div className="space-y-8">
          {colorFamilies.map((family) => (
            <div key={family.key} className="space-y-3">
              <h3 className="h3">{family.name}</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {family.hasScales ? (
                  scales.map((scale) => (
                    <div key={scale} className="space-y-1">
                      <div 
                        className="h-16 w-full radius-md shadow-sm border stroke-light border-neutral-200/50" 
                        style={{ backgroundColor: `var(--${family.key}-${scale})` }}
                      />
                      <p className="caption text-center">{scale}</p>
                    </div>
                  ))
                ) : (
                  <div className="space-y-1">
                    <div 
                      className="h-16 w-full radius-md shadow-sm border stroke-light border-neutral-200/50" 
                      style={{ backgroundColor: `var(--${family.key})` }}
                    />
                    <p className="caption text-center text-primary-500 font-bold">Base</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
