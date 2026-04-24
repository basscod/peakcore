# basscore Design System

> [!IMPORTANT]
> **MANDATORY INSTRUCTION FOR ALL AI AGENTS:**
> You MUST read and follow this document before building any custom components or modifying existing ones. 
> ALWAYS reuse existing semantic utilities and tokens. 
> ALWAYS update this file if you modify style tokens, semantics, or core reusable components.

## Typography Semantics

### Headings (Barlow Condensed)
*   `.display`: Ultra-large heading (6xl/8xl). Features **tracking-widest** for industrial clarity. Changes color to `primary-500` on hover.
*   `.h1` to `.h6`: Standard heading hierarchy. Features **tracking-widest** for industrial clarity and **smooth transition to primary-500** on hover.

### Body & Meta (Jost)
*   `.body-lg`: Large body text (1.125rem/1.25rem).
*   `.body`: Standard base text (1rem).
*   `.body-sm`: Secondary/dense text (0.875rem).
*   `.caption`: Micro-text (0.75rem), uppercase, wide tracking.

### Monospace (JetBrains Mono)
*   `.codes`: Inline code blocks with background and border.

---

## Color System

### Semantic Scales (100-900)
Every color family uses a 100-900 scale. The system is designed with **automatic dark mode reversal**: in dark mode, 100 becomes dark and 900 becomes light.

*   **Primary (Lime)**: Used for action highlights and interactive states. Base: `primary-500`.
*   **Secondary (Navy)**: Used for secondary actions and structural depth. Base: `secondary-900`.
*   **Accent (Orange)**: Used for call-outs and variety. Base: `accent-500`.
*   **Neutral (Slate)**: Used for backgrounds, borders, and general text.

### Status Colors (Fixed)
Unlike the semantic scales above, status colors do **not** flip in dark mode. They remain consistent to ensure clear communication of state.

*   **Success (Green)**: Vibrant green for positive status. Base: `success-500`.
*   **Warning (Amber)**: Warm orange-yellow for alerts. Base: `warning-500`.
*   **Error (Red)**: Vibrant red for destructive/failure states. Base: `error-500`.

### Global Variables
*   `--background`: Maps to `neutral-100` (Light) / `neutral-900` (Dark).
*   `--foreground`: Maps to `neutral-900` (Light) / `neutral-100` (Dark).

---

## Strokes & Radius

### Border Radius
*   `.radius-sm`: 4px (tight elements).
*   `.radius-md`: 8px (standard components).
*   `.radius-lg`: **12px** (primary containers/homepage standard).

### Stroke Weights
*   `.stroke-light`: 1px (subtle borders).
*   `.stroke-normal`: 2px (standard borders).
*   `.stroke-bold`: 4px (heavy containers).
*   `.stroke-black`: 8px (extreme industrial depth).

---

## Layout Rules

### Full Bleed Architecture
*   **Mandatory**: All pages MUST be designed with a full-bleed architecture. 
*   Avoid `max-w-*` wrappers on main page containers. 
*   Use consistent horizontal padding (`px-8` standard) instead of layout width restrictions.

---

### Stroke Styles
*   `.stroke-solid`: Standard solid line.
*   `.stroke-dashed`: Dashed line for availability/placeholders.
*   `.stroke-dotted`: Dotted line for auxiliary separators.

---

## Interactive Components

### Button (`src/components/ui/button.tsx`)
A clean, modular button system with five base variants and semantic color integration.

#### Variants
*   `solid`: High-contrast action with page background text on colored background.
*   `outline`: (Default) Standard 2px stroke and text in the same semantic color.
*   `light`: 1px stroke, 25% background transparency, 50% on hover.
*   `underline`: Text-only with a bottom border that expands to a full border on hover.
*   `ghost`: Transparent background with subtle hover activation.

#### Colors
*   `primary`: Lime (`primary-500`)
*   `secondary`: Navy (`secondary-500`)
*   `accent`: Orange (`accent-500`)
*   `neutral`: Slate/Foreground (`foreground`)

#### Sizes & Radius
| Size | Padding | Text | Radius |
| :--- | :--- | :--- | :--- |
| `2xs` | `px-3 py-0.5` | `text-[0.6rem]` | `.radius-sm` (4px) |
| `xs` | `px-3.5 py-0.5` | `text-[0.7rem]` | `.radius-sm` (4px) |
| `sm` | `px-4 py-1` | `text-xs` | `.radius-sm` (4px) |
| `md` | `px-4.5 py-1` | `text-xs` | `.radius-sm` (4px) **[DEFAULT]** |
| `lg` | `px-5.5 py-2` | `text-sm` | `.radius-sm` (4px) |

*Note: Icon-only buttons maintain the same radius scale for consistency.*

---

### ToggleFull (`src/components/ui/toggle-full.tsx`)
A multi-option segmented control system for navigation and state toggling, mirroring the button system's aesthetics.

#### Variants
*   `solid`: Active option is a high-contrast pill.
*   `outline`: Active option has a 2px stroke.
*   `light`: (Default) Active option has a subtle background and light stroke.
*   `underline`: Active option has a bottom border.
*   `ghost`: Active option has a subtle background highlight.

#### Sizes & Radius
| Size | Padding | Text | Radius |
| :--- | :--- | :--- | :--- |
| `2xs` | `px-3 py-0.5` | `text-[0.6rem]` | `.radius-sm` (4px) |
| `xs` | `px-3.5 py-0.5` | `text-[0.7rem]` | `.radius-sm` (4px) |
| `sm` | `px-4 py-1` | `text-xs` | `.radius-sm` (4px) |
| `md` | `px-4.5 py-1` | `text-xs` | `.radius-sm` (4px) **[DEFAULT]** |
| `lg` | `px-5.5 py-2` | `text-sm` | `.radius-sm` (4px) |

*Note: Hovering inactive options in ToggleFull transitions the text color to primary.*

---

### Toggle (`src/components/ui/toggle.tsx`)
A single-state binary switch component for toggling individual features or states.

#### Variants
*   `solid`: Pressed state is high-contrast; base state is subtle background.
*   `outline`: Pressed state has a 2px stroke; base state has a neutral border.
*   `light`: (Default) Pressed state has a primary highlight; base state is subtle.
*   `underline`: Pressed state has a bottom border; base state is text-only.
*   `ghost`: Subtle background highlight on hover and pressed states.

#### Sizes & Radius
| Size | Padding | Text | Radius |
| :--- | :--- | :--- | :--- |
| `2xs` | `px-3 py-0.5` | `text-[0.6rem]` | `.radius-sm` (4px) |
| `xs` | `px-3.5 py-0.5` | `text-[0.7rem]` | `.radius-sm` (4px) |
| `sm` | `px-4 py-1` | `text-xs` | `.radius-sm` (4px) |
| `md` | `px-4.5 py-1` | `text-xs` | `.radius-sm` (4px) **[DEFAULT]** |
| `lg` | `px-5.5 py-2` | `text-sm` | `.radius-sm` (4px) |

*Note: Toggle components support an `icon` prop for high-precision iconography.*

---

## Technical Integration

---

### InputField (`src/components/ui/input-field.tsx`)
A robust data entry system with integrated labels, status feedback, and adaptive sizing.

#### Sizes & Radius
| Size | Padding | Text | Radius |
| :--- | :--- | :--- | :--- |
| `sm` | `px-4 py-1` | `text-xs` | `.radius-sm` (4px) |
| `md` | `px-4.5 py-1.5` | `text-sm` | `.radius-sm` (4px) **[DEFAULT]** |
| `lg` | `px-5.5 py-2` | `text-base` | `.radius-sm` (4px) |

*Note: InputField icons scale with the size and maintain consistent alignment with the wide horizontal padding.*

### File Structure
- `src/styles/`: Theme tokens and semantic utilities.
- `src/components/ui/`: Atomic UI components.
  - `table/`: Modular table sub-components.
- `src/types/ui.ts`: Centralized UI type definitions.

### Implementation Rules
1.  **Never hardcode hex values.** Use `--color-{token}` or Tailwind utility classes.
2.  **Avoid `dark:` variants** for colors. The tokens handle theme switching automatically.
3.  **Reuse semantics.** Use `.h1` instead of `text-4xl font-bold` to ensure hover effects and font-family consistency.
4.  **Use Centralized Types.** Import `BaseColor`, `BaseSize`, etc., from `@/types/ui` to ensure system-wide consistency.
5.  **Modularize Complex Components.** If a component exceeds 300 lines, extract sub-components or logic into a sub-directory (e.g., `src/components/ui/table/`).
