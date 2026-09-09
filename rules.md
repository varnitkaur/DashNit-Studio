# Project Rules & AI Guidelines
**Project:** DashNit Artisan Studio & Operations  
**Applies To:** AI Coding Assistants, Human Engineers, and Contributors  
**Enforcement Level:** Mandatory  

---

## Core Directive (Iron Rule)
> [!IMPORTANT]
> **NEVER BREAK EXISTING FUNCTIONALITY UNLESS EXPLICITLY REQUESTED.**  
> - Always preserve existing user journeys, data flow, component props, and active features when adding new functionality or refactoring.
> - Before modifying any component or function, audit all dependent files and verify that downstream features remain fully intact.
> - When updating types in [`src/types.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/types.ts), make newly added fields optional (`?`) if existing mock data or components do not yet provide them.

---

## 1. Coding Standards

### 1.1 TypeScript & Type Safety
- **Strict Mode:** Maintain zero TypeScript errors. Run `npm run lint` (`tsc --noEmit`) to validate type soundness.
- **No `any` Policy:** Avoid using `any` or loose type assertions (`as unknown as ...`). Every entity must be typed using contracts from [`src/types.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/types.ts).
- **Explicit Interfaces for Components:** Every React component must define an explicit `interface [ComponentName]Props` for its props:
  ```tsx
  // ✅ Correct
  interface CraftingBoardProps {
    cards: CraftCard[];
    onUpdateCardStage: (cardId: string, newStage: CraftStage) => void;
    searchQuery: string;
  }
  export const CraftingBoard: React.FC<CraftingBoardProps> = ({ cards, onUpdateCardStage, searchQuery }) => { ... };

  // ❌ Incorrect
  export const CraftingBoard = (props: any) => { ... };
  ```
- **Null Safety & Optional Chaining:** Use optional chaining (`card.details?.scent`) and nullish coalescing (`card.price ?? 0`) when accessing nested properties.

### 1.2 React 19 Patterns
- **Functional Components Only:** Use modern functional components with hooks. Do not use legacy class components.
- **Hook Discipline:**
  - Adhere strictly to the Rules of Hooks (never call hooks inside loops, conditions, or nested functions).
  - Use `useMemo` for heavy filtering and search computations across card and order arrays.
  - Keep state localized to the lowest common ancestor component.
- **State Immutability:** Never mutate React state directly. Always use updater functions with array spreads or object clones:
  ```tsx
  // ✅ Correct
  setCraftCards((prev) => prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c)));

  // ❌ Incorrect
  const card = craftCards.find(c => c.id === id);
  if (card) card.stage = newStage;
  ```

### 1.3 Tailwind CSS v4 Usage
- **Utility Classes:** Use Tailwind CSS v4 utility classes for styling. Do not write separate inline CSS `style={{ ... }}` objects unless calculating dynamic positioning or progress percentages.
- **Tailwind v4 Specifics:** The project uses `@tailwindcss/vite` without a legacy `tailwind.config.js`. Global design tokens and theme layers reside in [`src/index.css`](file:///c:/Users/ASUS/DashNit-Studio/src/index.css).
- **Avoid Arbitrary Magic Numbers:** Reuse existing Tailwind spacing, padding, and standardized brand color hex values rather than introducing arbitrary random scales.

---

## 2. Folder Structure Rules

The project follows a modular, feature-oriented structure. AI assistants must respect these boundaries:

```
c:\Users\ASUS\DashNit-Studio\
├── .env.example              # Template for environment variables (must be kept updated)
├── metadata.json             # Applet metadata, frame permissions, and major capabilities
├── package.json              # Project scripts and dependencies
├── tsconfig.json             # TypeScript compiler configuration
├── vite.config.ts            # Vite 6 config with @tailwindcss/vite and path aliases
├── public/                   # Static assets served as-is (favicons, logos)
├── src/
│   ├── main.tsx              # React DOM root entry point
│   ├── App.tsx               # Top-level state orchestrator, global modals & routing
│   ├── index.css             # Tailwind v4 theme, fonts, and custom print rules
│   ├── types.ts              # Single source of truth for all domain interfaces & types
│   ├── components/           # Feature components and interactive views
│   │   ├── Header.tsx        # Global search bar, notifications, and navigation tabs
│   │   ├── Sidebar.tsx       # Studio status, craft counters, and quick links
│   │   ├── CraftingBoard.tsx # 4-stage Kanban workflow, cure timers & craft cards
│   │   ├── CatalogInventory.tsx # Products & raw materials dual-track supervisor
│   │   ├── OrdersLogistics.tsx  # Dispatch queue, courier AWBs & shipping manifests
│   │   ├── AnalyticsRevenue.tsx # Financial KPIs, SLA tracking & cost breakdowns
│   │   ├── CustomOrderStudio.tsx# Customer commissioning studio with live pricing
│   │   ├── ArchitectureView.tsx # System topology, subsystem latency & API contracts
│   │   └── Modals.tsx        # Batch sheets, purchase orders, thermal label modal
│   └── data/
│       └── mockData.ts       # Production-aligned seed data for all modules
```

### Folder Placement Guidelines
| File Type | Directory | Rule |
| :--- | :--- | :--- |
| **Domain Interfaces / Types** | `src/types.ts` | All shared data models MUST be declared here. |
| **Feature Views** | `src/components/` | Large views (e.g. tabs) get dedicated files. |
| **Reusable Modals** | `src/components/Modals.tsx` | Specialized modal dialogs; ensure clean keyboard escape handling. |
| **Mock & Seed Datasets** | `src/data/mockData.ts` | Realistic, high-quality test data matching real Jaipur atelier operations. |
| **New Utility Functions** | `src/utils/` | If creating helper functions (formatting currency, dates), place them here. |

---

## 3. Naming Conventions

Maintain strict naming consistency across the entire codebase:

### 3.1 Files & Directories
- **React Components:** `PascalCase.tsx` (e.g., `CraftingBoard.tsx`, `InspectCardModal.tsx`).
- **Data & Configuration Files:** `camelCase.ts` or `kebab-case` (e.g., `mockData.ts`, `vite.config.ts`).
- **Markdown Documentation:** `lowercase.md` (e.g., `decisions.md`, `rules.md`, `memory.md`, `changelog.md`).

### 3.2 Code Identifiers
| Element | Convention | Example |
| :--- | :--- | :--- |
| **Components & Interfaces** | `PascalCase` | `CraftCard`, `RawMaterial`, `LogisticsOrder` |
| **Variables & Functions** | `camelCase` | `handleUpdateCardStage`, `triggerToast`, `isSubmitting` |
| **Event Handlers** | `handle[Action]` or `on[Action]` | `handleSubmitPO`, `onOpenLabelModal` |
| **Boolean Flags** | `is[Flag]`, `has[Flag]`, `show[Flag]` | `isAuditing`, `hasPassedQC`, `showDocs` |
| **Constants** | `UPPER_SNAKE_CASE` | `MAX_DAILY_CAPACITY`, `DEFAULT_CURING_HOURS` |
| **Stage & Enum Literals** | `snake_case` | `'new_placed'`, `'in_crafting'`, `'qc_packaging'`, `'manifested'` |
| **Navigation Tab Slugs** | `kebab-case` | `'crafting-queue'`, `'catalog-and-inventory'`, `'architecture'` |

---

## 4. UI/UX Consistency Rules

DashNit Studio represents a high-end artisanal brand. The interface must balance operational density with an elegant visual aesthetic.

### 4.1 Brand Color Palette
Always adhere to the curated studio color system:

| Token Name | Hex Code | Semantic Role / Usage |
| :--- | :--- | :--- |
| **Studio Cream** | `#FAF7F2` | Global background, viewport canvas |
| **Artisan Paper** | `#F3EDE4` | Card header, secondary button backgrounds, input fills |
| **Warm Espresso** | `#2D221E` | Primary typography, headers, dark toasts, high-contrast badges |
| **Earth Terracotta** | `#9d3e1d` | Primary brand accent, primary CTA buttons, active tab indicators |
| **Hover Terracotta** | `#bd5633` | Hover state for primary action buttons |
| **Border Oatmeal** | `#E5DBD0` | Subdued borders, divider lines, panel outlines |
| **Muted Walnut** | `#6B5851` | Secondary text, field labels, metadata captions |
| **Herb Green** | `#1E6B43` | QC passed badges, healthy statuses, success toasts |
| **Amber Honey** | `#A35C00` | Warning alerts, curing phase markers, urgent warnings |
| **Crimson Clay** | `#ba1a1a` | Critical low stock alerts, SLA breaches (< 24h deadline) |

### 4.2 Typography System
The application imports Google Fonts in [`index.html`](file:///c:/Users/ASUS/DashNit-Studio/index.html):
- **Headings & Brand Title:** `font-['Epilogue']` (Bold, elegant, artisanal).
- **Body & Data Tables:** `font-['Plus_Jakarta_Sans']` (Clean, legible, modern geometric sans).
- **Numbers, Codes, SKUs, AWBs & Timers:** `font-['Space_Mono']` (Tabular monospace alignment).

### 4.3 Component Geometry & Micro-Interactions
- **Border Radii:** Use `rounded-2xl` for cards, modals, and container panels. Use `rounded-xl` for buttons, input fields, and pill tags.
- **Tactile Feedback:** Actionable buttons must feature active states: `active:scale-95 transition-all duration-150`.
- **Kanban Card Design:** Cards must display visual priority markers (urgent badge, candle curing meter, or crochet stitch progress percentage bar).
- **Empty States & Loading:** Provide clear feedback (spinners, empty state illustrations, toast confirmations) for all async actions.

---

## 5. Git Commit Rules

All git commits must follow the **Conventional Commits 1.0.0** specification.

### 5.1 Format
```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### 5.2 Commit Types
- `feat`: A new user-facing feature or view (e.g., `feat(crafting): add curing timer countdown alert`).
- `fix`: A bug fix (e.g., `fix(inventory): prevent negative count on batch pour`).
- `docs`: Documentation updates only (e.g., `docs: update memory.md with new API specs`).
- `style`: Code formatting, missing semicolons, or cosmetic tweaks (no logic change).
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: Code change that improves performance.
- `chore`: Build tooling, dependency updates, or configuration changes.

### 5.3 Commit Standards
- Keep the first line under **72 characters**.
- Use the **imperative, present tense**: *"add"* not *"added"*, *"fix"* not *"fixed"*.
- Do not end the subject line with a period.

---

## 6. Security and Environment Variable Rules

### 6.1 Secret Management
- **Zero Secrets in Git:** NEVER commit `.env`, API keys, private certificates, or user secrets into version control.
- **Repository Template:** Always maintain [`.env.example`](file:///c:/Users/ASUS/DashNit-Studio/.env.example) with placeholder values whenever new environment variables are introduced.
- **Client Bundling:** Never prefix secrets with `VITE_` unless they are explicitly public keys safe for browser exposure.
- **Server-Side Gemini API:** The `GEMINI_API_KEY` must only be consumed by server-side processes or authorized backend functions as declared in [`metadata.json`](file:///c:/Users/ASUS/DashNit-Studio/metadata.json).

### 6.2 Data Privacy & PII
- Customer phone numbers and delivery addresses displayed in [`mockData.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/data/mockData.ts) must remain sanitized test fixtures.
- Never log raw customer credit card details or unencrypted UPI credentials.

---

## 7. AI Assistant Interaction Protocol

When an AI coding assistant interacts with this repository, it must:
1. **Consult Knowledge First:** Review [`decisions.md`](file:///c:/Users/ASUS/DashNit-Studio/decisions.md), [`rules.md`](file:///c:/Users/ASUS/DashNit-Studio/rules.md), and [`memory.md`](file:///c:/Users/ASUS/DashNit-Studio/memory.md) before designing modifications.
2. **Never Remove Existing Capabilities:** Adding a new view or feature must not delete or break existing tabs (`crafting-queue`, `catalog-and-inventory`, `orders-and-logistics`, `analytics-and-revenue`, `architecture`, `custom-studio`).
3. **Keep Types in Sync:** Whenever adding or altering an entity attribute, update both [`src/types.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/types.ts) and [`src/data/mockData.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/data/mockData.ts).
4. **Log Changes:** Record non-trivial enhancements in [`changelog.md`](file:///c:/Users/ASUS/DashNit-Studio/changelog.md).
