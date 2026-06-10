# Madawaska River Cottages — Project Context

## What this is
A boutique rental website for 4 riverside cottages + 1 treehouse in Griffith, Ontario.
Built with Astro 6, TypeScript, Tailwind CSS v4. Fully static, deployed on Vercel.

## Links
- **Live site:** https://madawaskarivercottages.vercel.app
- **GitHub:** https://github.com/FriendlyGhosts/madawaskarivercottages
- **Vercel project:** madawaskarivercottages (under friendlyghosts org)

## How to deploy
Every `git push` to `main` auto-deploys to Vercel. No manual step needed.
For a manual deploy: `npx vercel --prod --yes` from the project root.

## Key files
- `src/pages/index.astro` — entire site (single page, all sections)
- `src/layouts/Layout.astro` — wave canvas, custom cursor, scroll reveal, night mode
- `src/styles/global.css` — colour tokens (day + night), cursor, reveal animations
- `public/images/cottages/` — Airbnb photos downloaded for each property

## Colour scheme
Earthy Ontario cottage country palette.
- Day: warm parchment bg `#f2ece0`, deep lake blue accent `#2e6b8a`, sage card gradients
- Night: dark bark bg `#181410`, forest green accent `#5a9e7a`
- Wave colours: deep northern lake blue (day), dark forest green (night)

## The wave system (Layout.astro)
Gerstner sum-of-cosines waves. 5 layers, each with 4 frequency components.
Mouse/touch interaction: bowstring surface tension per layer.
- Pull a line with the cursor/finger → tent-shaped deformation
- Release at SNAP_DIST → two outward-traveling pulses split from the snap point
- Desktop: ENGAGE_DIST=11px, SNAP_DIST=62px
- Mobile (maxTouchPoints>0): ENGAGE_DIST=22px, SNAP_DIST=28px (snaps sooner)
- Touch: passive listeners (scroll works), touchend snaps any engaged line
- Canvas renders at device pixel ratio for crisp mobile rendering
- Night mode toggle (☽/○) stored in localStorage

## The 5 properties
Displayed in two sections on the page.

### Section 1 — Four Cottages (riverside, on the Madawaska River)
| Address | Name | Sleeps | Airbnb listing ID | Photo folder |
|---------|------|--------|-------------------|--------------|
| 117 Harrison Trail | Whitetail Lodge | 4 | 895861420839792739 | cozy-riverfront |
| 143 Harrison Trail | Owl's Nest | 4 | 1037163450739528690 | magical-wintertime |
| 157 Harrison Trail | Cedarwood Cabin | 4 | 679589509313140703 | tucked-away |
| 165 Harrison Trail | Lazy Bear Lodge | 6 | 1705267791513863760 | drone-165 / interior-165 |

### Section 2 — The Treehouse (in the forest, NOT on the river)
- **Name:** The Treehouse
- **Sleeps:** 2, 1 bedroom
- **Airbnb listing ID:** 1042917519190055212
- **Photo folder:** cabin-heaven
- **Note:** 650m from road via forest trail, completely secluded

**Important:** The listing-to-cottage address mapping above is a best guess —
the owner (Luka) should confirm which Airbnb listing belongs to which address.
Photos can be swapped in index.astro by changing the `photo:` field.

## Booking / policy (shown in contact section)
- **Rental season: May through October only** (6 months). Cottages closed Nov-April.
  This is critical when evaluating PMS subscription costs — flat monthly fees are paid
  year-round but revenue only flows for 6 months, so commission-based pricing is more
  competitive than it first appears.
- 1 week minimum stay
- Check-in 3pm, check-out 11am
- 50% deposit to confirm
- $300 refundable damage deposit
- $50/pet fee
- Rates exclude taxes

## Location copy (shown in location section)
- 90 min from Ottawa
- 40 min from Calabogie Ski Resort
- 90 min from Algonquin Park
- General store, pub & LCBO in Griffith
- Boat launch 10 min away — Centennial Lake

## Nav structure (mobile vs desktop)
- Desktop: centered, two rows — title on top, links below
- Mobile: title stacked left ("Madawaska / River Cottages"), Cottages + Book + toggle on right
- Nav hides on scroll down, reappears on scroll up

## Drone photos (added 2026-05-20)
Fresh aerial drone shots for all four riverside cottages, organized by address:
- `drone-117-1..15.jpg` → Whitetail Lodge (117 Harrison Trail)
- `drone-143-1..13.jpg` → Owl's Nest (143 Harrison Trail)
- `drone-157-1..10.jpg` → Cedarwood Cabin (157 Harrison Trail)
- `drone-165-1..11.jpg` → Lazy Bear Lodge (165 Harrison Trail)
- Raw river aerials: `Pictures/Drone/05-20-2026/Madawaska River/` (not yet on site)

## Pending / known TODOs
- [ ] Confirm which Airbnb listing maps to which cottage address (117/143/157/165)
- [ ] Contact form is UI only — not wired to any backend/email service yet
- [ ] May want individual cottage detail pages (/cottages/whitetail-lodge etc.)
- [x] iCal availability calendars implemented — fetched at build time, 2-month inline calendar per cottage card + treehouse section. Gracefully degrades if Airbnb fetch fails.

## Airbnb listing IDs (all 5)
| Listing name | ID |
|---|---|
| Cozy Riverfront Haven | 895861420839792739 |
| Magical Wintertime Retreat | 1037163450739528690 |
| Tucked-away Riverside Cottage | 679589509313140703 |
| The Madawaska Lodge (unlisted, 6 guests, sauna) | 1078400080373382488 |
| Cabin on the Heaven / The Treehouse | 1042917519190055212 |
