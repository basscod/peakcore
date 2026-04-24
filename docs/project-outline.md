# Project Outline: BASSVerse PeakCore

## Overview
BASSVerse PeakCore is an industrial-minimalist web application built with Next.js, focused on high-precision data visualization and productivity tools. The design language is characterized by sharp lines, geometric typography, and a reactive semantic color system.

## Core Features
*   **Typography System**: Multi-layered semantic hierarchy using Barlow Condensed, Jost, and JetBrains Mono.
*   **Color Intelligence**: Dynamic 100-900 scales with automatic dark mode reversal.
*   **Theme Management**: User-controlled dark/light mode toggle with system preference awareness.
*   **Modular Architecture**: Clean separation of styles, tokens, and components.

## Technical Stack
*   **Framework**: Next.js 16+ (App Router)
*   **Styling**: Tailwind CSS 4+
*   **Icons**: Lucide React
*   **Theme**: Next Themes

---

## File Structure Reference

### Documentation
- `docs/MASTER.md`: Entry point for AI agents.
- `docs/project-outline.md`: Project state and history.
- `docs/design-system.md`: Design rules and tokens.

### Styling & Design
- `src/styles/tokens/`: CSS variables for raw colors and fonts.
- `src/styles/semantics/`: Utility classes for typography and layout/strokes.
- `src/app/(app)/design/`: Design system showcase area.
  - `sections/`: Individual showcase modules (Typography, Components, etc.).
  - `components/`: Local components for the design area.

### Application Core
- `src/app/layout.tsx`: Root layout, font injection, and theme providers.
- `src/app/(app)/(00_home)/page.tsx`: Application landing page.
- `src/components/`:
  - `theme/`: Theme-related components (ThemeProvider, ThemeToggle).
  - `ui/`: Shared atomic UI components (Button, Toggle, etc.).

---

## Project Update Log

| Date | Time (Local) | Major Changes / Milestones |
| :--- | :--- | :--- |
| 2026-04-24 | 08:48 | Initial Geist font replacement with Barlow Condensed, Jost, and JetBrains Mono. |
| 2026-04-24 | 09:12 | Style refactoring: moved globals to `src/styles` and split into tokens/semantics. |
| 2026-04-24 | 09:34 | Expanded color scales and dark mode reversal logic implementation. |
| 2026-04-24 | 10:12 | Implemented `next-themes` and added the ThemeToggle component. |
| 2026-04-24 | 10:34 | Added Typography Semantics (`display`, `h1`-`h6`, `body` scales). |
| 2026-04-24 | 10:52 | Implemented Stroke & Radius semantics and created the Documentation Hub. |
| 2026-04-24 | 11:05 | Relocated Style Guide to `/design` and updated project structure documentation. |
| 2026-04-24 | 11:18 | Implemented multi-variant `Button` component and added tabbed Components Showcase. |
| 2026-04-24 | 11:24 | Adjusted button sizes (MD is now old SM), updated underline hover, and removed layout width restrictions. |
| 2026-04-24 | 11:55 | Refactored `Toggle` component to be reusable with variants/colors and enhanced `ThemeToggle` with active states. |
| 2026-04-24 | 12:05 | Major file structure reorganization: modularized `design` area, moved theme components to `src/components/theme`, and reorganized landing page. |
| 2026-04-24 | 13:50 | Added `success`, `warning`, and `error` color tokens (non-flipping) to the design system. |
| 2026-04-24 | 13:53 | Refreshed hero section with high-visibility "DIRECTIVE: DONT ABANDON THIS MISSION" emphasis and refactored buttons to use the UI component library. |
| 2026-04-24 | 13:57 | Adjusted `.display` typography utility to use `tracking-wide` for enhanced industrial legibility and spacing. |
| 2026-04-24 | 13:55 | Resolved serialization errors in `page.tsx` and suppressed React 19 hydration script tag warnings in `ThemeProvider`. |
---

> [!NOTE]
> This log must be updated at the end of every significant development session to maintain an accurate project state for future AI agents.
