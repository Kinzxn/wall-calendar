# 📅 Wall Calendar — Interactive Date Planner

A polished, interactive wall calendar component built with **Next.js 14** + **TypeScript**, styled with plain **CSS Modules**. Inspired by the physical wall calendar aesthetic from the challenge brief.

## Design Philosophy

Minimal monochrome black-first UI inspired by Linear, Vercel, and Raycast:
- Pure black surfaces (`#080808`) with 1px borders — no gradients, no shadows, no gloss
- Monospace (`JetBrains Mono`) for dates, stats and labels; `Inter` for prose
- Single accent: inverted white-on-black for selected days
- Subtle grayscale-tinted monthly hero images from Unsplash (free, no key required)

## Features

### Core Requirements ✅
| Feature | Implementation |
|---|---|
| Wall Calendar Aesthetic | Spiral binding strip, hero image, bottom month/year label |
| Day Range Selector | Click start → hover preview → click end; clear visual states |
| Integrated Notes | Tabbed panel: Monthly Memo (500 chars) + Range Notes (with labels) |
| Responsive | Desktop 2-column, mobile stacked (≤820px breakpoint) |

### Extras ✨
- **Page-flip animation** — Framer Motion 3D rotateY on month navigation  
- **Holiday markers** — 20 built-in US/international holidays with emoji + tooltip  
- **Stats bar** — `Xd until month end` / `X days selected` in monospace  
- **Dark / Light toggle** — persisted to `localStorage`, defaults to dark  
- **Monthly hero images** — 12 curated Unsplash photos, one per month, lazy-loaded with skeleton  
- **localStorage persistence** — all notes & memos stored per `YYYY-MM` key  

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Framer Motion** — page-flip transition
- **CSS Modules** — zero Tailwind, pure vanilla CSS
- **Unsplash** — free CDN images (no API key needed)
- **localStorage** — all data persistence, no backend

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens + resets
│   ├── layout.tsx           # Root layout, SEO metadata
│   ├── page.tsx             # App shell, state lifted here
│   └── page.module.css
├── components/
│   ├── WallCalendar/        # Calendar, binding strip, hero, grid, day cell
│   ├── NotesPanel/          # Tabbed notes (memo + range notes)
│   └── ThemeToggle/         # Dark/light toggle
├── hooks/
│   ├── useCalendar.ts       # All date navigation & selection logic
│   └── useNotes.ts          # localStorage notes CRUD
└── lib/
    ├── holidays.ts           # Static holiday data
    └── monthThemes.ts        # Per-month Unsplash URLs
```

## Usage

1. **Select a range** — click a start date, hover to preview, click an end date
2. **Clear** — click "clear" in the stats bar
3. **Add a note** — go to Range Notes tab, write a note + optional label, click Add
4. **Monthly memo** — free-text area for the whole month, auto-saves
5. **Navigate** — ‹ › buttons trigger a 3D page-flip animation
6. **Toggle theme** — top-right switch, persisted across sessions
