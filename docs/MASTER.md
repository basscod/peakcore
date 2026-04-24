# basscore: AI Agent Master Guide

> [!IMPORTANT]
> **READ THIS FIRST.** 
> This is the centralized knowledge hub for basscore. All agents MUST refer to these documents before writing any code to ensure consistency and prevent redundant implementations.

## Documentation Directory

| Document | Purpose |
| :--- | :--- |
| [Project Outline](file:///d:/Projects/WebDesign/BASSVerse/basscore/docs/project-outline.md) | High-level project state, features, and historical update log. |
| [Design System](file:///d:/Projects/WebDesign/BASSVerse/basscore/docs/design-system.md) | **Critical.** Rules for typography, colors, strokes, and radii. |

## Workflow Instructions
1.  **Check the Log**: Refer to the `project-outline.md` update log to understand the current progress.
2.  **Follow the Tokens**: Use the semantic utilities defined in `design-system.md`. Do not create ad-hoc styles.
3.  **Update the Docs**: If your task involves modifying the design system or adding a major feature, update the relevant file and the project log immediately.

---

## Technical Constraints
*   **Next.js 16**: Be aware of App Router conventions.
*   **Tailwind 4**: Use `@utility` and `@theme` for CSS extensions.
*   **Theme Reversal**: Do not use `dark:` tags for colors; let the tokens handle reversal.
