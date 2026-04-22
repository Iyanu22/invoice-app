# Invoice Management App

A fully responsive invoice management application built with React + TypeScript, matching a Figma design spec. Supports full CRUD operations, status workflows, dark/light mode, and local persistence.

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Unzip the project (if downloaded as zip)
unzip invoice-ts.zip && cd invoice-ts

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

```bash
npm run build        # Production build
npm run preview      # Preview production build locally
npm run typecheck    # Run TypeScript type checking
```

---

## Architecture Explanation

### Tech Stack
- **React 18** — UI library
- **TypeScript** — Static typing throughout
- **Vite** — Build tool and dev server
- **CSS Custom Properties** — Design token system (no CSS framework)

### Project Structure

```
src/
├── types/
│   └── index.ts              # Invoice, Address, FormState, FormErrors types
├── utils/
│   ├── helpers.ts            # genId, fmt, money, addDays, today
│   ├── seedData.ts           # 7 typed seed invoices
│   └── formHelpers.ts        # invoiceToForm, formToInvoice, validateForm
├── context/
│   ├── ThemeContext.tsx       # Dark/light mode state + localStorage
│   └── InvoiceContext.tsx    # Invoice CRUD state + localStorage
├── components/
│   ├── Icons.tsx             # All SVG icons as named exports
│   ├── StatusBadge.tsx       # Paid / Pending / Draft pill badge
│   ├── Sidebar.tsx           # Navigation sidebar (desktop) / top bar (mobile)
│   ├── FilterDropdown.tsx    # Multi-select status filter
│   ├── EmptyState.tsx        # Illustration + message when list is empty
│   ├── InvoiceList.tsx       # Invoice list page with header
│   ├── InvoiceDetail.tsx     # Single invoice detail view
│   ├── InvoiceForm.tsx       # Create / edit form slide-in panel
│   └── DeleteModal.tsx       # Confirmation modal for deletion
├── styles/
│   └── global.css            # All CSS variables, component styles, responsive rules
├── App.tsx                   # Page routing + CRUD wiring
└── main.tsx                  # React entry point
```

### State Management
- **Theme** — React Context + `localStorage` for persistence across reloads
- **Invoices** — React Context + `localStorage` (key: `inv_v3`), seeded with 7 sample invoices on first load
- No external state library — the app is small enough that Context + hooks covers all needs cleanly

### Responsive Layout
- **Desktop (>768px):** Fixed vertical sidebar (103px wide), content fills remaining width
- **Tablet/Mobile (≤768px):** Sidebar collapses into a fixed top header bar (72px tall); content has top padding to clear it

---

## Trade-offs

| Decision | Rationale |
|---|---|
| **Single CSS file** | Keeps styling co-located and easy to scan; avoids CSS-in-JS overhead. Downside: no component-level scoping. |
| **localStorage over a backend** | Meets the spec requirement for persistence without requiring a server. Downside: data is device-local and not shareable. |
| **React Context over Redux/Zustand** | Sufficient for this app's scale. A real product with more complex async flows would benefit from a dedicated state library. |
| **Inline SVG icons** | No icon font dependency, full styling control, zero network requests. Downside: slightly more verbose JSX. |
| **No routing library** | Simple `page` state string covers the two views. Adding React Router would be worthwhile if the app grew to more pages. |
| **Draft skips validation** | Matches the spec — drafts are intentionally incomplete. Only "pending" submissions are fully validated. |
| **`inv_v3` storage key** | Versioned key avoids stale data from earlier iterations during development. In production, a migration strategy would be preferable. |

---

## Accessibility Notes

- All interactive elements are `<button>` or have `role="button"` with `tabIndex={0}`
- Invoice cards support keyboard navigation: `Enter` and `Space` open the detail view
- Form fields use `<label htmlFor>` pairing and `aria-invalid` on error states
- Delete modal traps focus on the confirm button and closes on `Escape`
- Filter dropdown uses `role="listbox"` and `aria-selected` on options
- Status badges are text-based (not color-only) for color-blind users
- Theme toggle has descriptive `aria-label` that updates with current state
- `focus-visible` outlines on all interactive elements (keyboard users only)
- Sidebar navigation has `aria-label="Main navigation"`
- WCAG AA contrast maintained in both light and dark themes

---

## Improvements Beyond Requirements

### Implemented
- ✅ **Dark mode** — full system with persisted preference
- ✅ **7 seed invoices** — matches all Figma data exactly (RT3080, XM9141, RG0314, etc.)
- ✅ **Animated transitions** — form panel slides in, modals scale in, list items fade up
- ✅ **Hover states** — invoice cards lift on hover with purple border highlight
- ✅ **Responsive top bar** — sidebar reconfigures to a top header on mobile/tablet
- ✅ **TypeScript** — full type safety across all components, contexts, and utilities
- ✅ **Form auto-calculates** — item totals update live as quantity/price are entered
- ✅ `markAsPaid` — only available from `pending` status; `paid` invoices cannot be edited

### Potential Future Improvements
- **Search** — filter invoices by client name or invoice ID
- **Sorting** — sort by date, amount, or client name
- **PDF export** — generate a printable invoice PDF
- **Backend sync** — replace localStorage with a REST API or Supabase for multi-device access
- **Pagination** — for large invoice lists
- **Toast notifications** — confirm saves/deletes with a brief dismissible message
- **Draft auto-save** — periodically save form progress to localStorage
- **Currency selector** — currently hardcoded to GBP (£)
- **Due date warning** — highlight overdue pending invoices in the list