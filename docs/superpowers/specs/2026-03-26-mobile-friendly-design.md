# Mobile-Friendly Design — Ragas & Rasas

Date: 2026-03-26

## Overview

Make the static ragas-rasas site responsive at a 768px breakpoint. All changes are CSS media queries added to `styles.css` plus a small JS addition in `app.js` to handle bottom sheet behavior. No new files, no HTML changes.

## Breakpoint

`@media (max-width: 768px)` — phones and small tablets switch to mobile layout; larger screens are unaffected.

## Section 1: Layout & Table (index.html)

- `body` padding: `48px 24px` → `24px 16px`
- `.layout`: switches from `flex-row` to `flex-column`; sidebar moves out of normal flow
- `.main-content`: `padding-right` → `0`
- `.table-wrap`: add `-webkit-overflow-scrolling: touch` for smooth iOS horizontal scroll; table stays as-is (horizontal scroll approach)
- `h1` already uses `clamp(2.4rem, 5vw, 3.8rem)` — no override needed; other header text is small enough to not need changes

## Section 2: Bottom Sheet Filter Panel

The sidebar becomes a fixed bottom sheet on mobile. No HTML changes required.

**CSS changes:**
- `.sidebar` at mobile: `position: fixed; bottom: 0; left: 0; right: 0; width: 100%; height: auto; max-height: 80vh; overflow-y: auto; z-index: 100; transform: translateY(100%); transition: transform 0.3s ease`
- `.sidebar.open` at mobile: `transform: translateY(0)`
- `.sidebar.collapsed` desktop behavior unchanged above 768px

**JS changes in `app.js`:**
- The existing filter toggle button already adds/removes `collapsed` on the sidebar
- On mobile (`window.innerWidth <= 768`), toggle `open` class instead of `collapsed`
- Add a backdrop overlay `<div id="overlay">` to `index.html` (hidden by default); show it when sheet opens, hide on tap
- Tapping the overlay closes the sheet (removes `open` class)
- On window resize crossing the 768px boundary, reset classes to avoid stuck state

## Section 3: Info Pages (rasas.html, thaats.html)

- `.info-grid`: `minmax(480px, 1fr)` → `minmax(280px, 1fr)` — cards reflow to single column on narrow screens
- `.info-card-body` padding: `24px` → `16px`
- `.info-card-header`: `flex-direction: column`
- `.info-card-meta`: `text-align: left`

## Files Changed

| File | Change |
|------|--------|
| `styles.css` | Add `@media (max-width: 768px)` block at bottom |
| `app.js` | Add mobile bottom sheet toggle logic (~10–15 lines) |
| `index.html` | Add `<div id="overlay">` for backdrop |

## Out of Scope

- No changes to rasas.html or thaats.html HTML structure
- No changes to data.js or nav.js
- No font or color theme changes
- No touch gesture (swipe to close) — tap backdrop to close is sufficient
