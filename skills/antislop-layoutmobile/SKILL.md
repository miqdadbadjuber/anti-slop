---
name: antislop-layoutmobile
description: "Mobile layout skill for antislop. Use for layouts that reflow on small screens: grids, overflow, tap targets. Load with the core."
allowed-tools: Read Write Edit Glob Grep
---
# antislop-layoutmobile

> Anti Slop: Rules for AI Coding Agents. Mobile Layout skill

> Part of the antislop system. Read together with `antislop.md` (the core). This skill deep-dives the mobile layout concern: how a layout must reflow on small screens. Breakpoints, scale, grids, overflow, tap targets, and navigation. It references core rules by number and never duplicates or renumbers them. Load it when the task builds or edits a layout that has to hold up on a phone.

## How to use this skill

- Load together with `antislop.md` whenever the task is mobile or responsive layout work. The core holds the mechanism (the purpose test, the three tiers, the Delivery Gate); this skill holds mobile-layout depth.
- Every entry has the same shape: **Tell** (the pattern), **Why** (why it reads as slop), **Fix** (what to do instead), with the governing core rule cited as R-XX.
- The principle behind this skill: **mobile layout is a different layout, not the desktop layout at a smaller size.** It must reflow: re-stack, rescale, and re-order with intent. Every pattern below is a way a layout fails to reflow.
- The Delivery Gate in the core remains the gate. The "Layoutmobile Skill Checklist" at the end of this file is the mobile-specific supplement to run alongside it.

## Breakpoints

### Desktop-Only Layout

- **Tell:** one layout state for every screen; the mobile view is the desktop layout squeezed into a phone.
- **Why:** R-03 requires a mobile layout that is perfect, not an afterthought. A page that only shrinks has no mobile design at all: cards that worked side by side overlap, and text meant for a wide canvas crowds into a narrow one.
- **Fix:** define a real mobile state at the breakpoint where the content stops working. The mobile layout reflows: columns stack, sizes drop, and order changes where the content needs it. If the mobile view is just the desktop view at a smaller width, the layout is not done.

### Breakpoint Driven by Device List

- **Tell:** breakpoints named after phone widths (375px, 414px, 768px) chosen because "that is the iPhone size", not because the content breaks there.
- **Why:** device widths change every year and every model. A breakpoint is a point where the layout stops holding; forcing it to match a device list makes the layout follow a spec sheet instead of the content (R-03).
- **Fix:** place breakpoints where the content actually breaks: when a column stops being readable, when a row of cards gets too narrow. Test by narrowing the viewport and watching where it snaps, then set the breakpoint there.

### Mobile Styled Last

- **Tell:** mobile rules bolted on as a trailing override: a long desktop stylesheet with a small media query at the end fixing one or two things.
- **Why:** an override patch is not a mobile design. It fixes the symptom that got reported and leaves the next one, and the base styles stay tuned for a wide screen (R-03).
- **Fix:** treat mobile as a designed state, not an override. Give the narrow viewport its own deliberate sizes and stacking, and verify the whole layout there, not just the patched spots (R-35).

## Scale & Sizing

### Desktop-Sized Everything

- **Tell:** padding, gaps, hero heights, and card sizes carried unchanged from desktop to mobile, so every section looks blown up on a phone.
- **Why:** an element sized for a 1440px canvas dominates a 375px one. What reads as confident on desktop becomes oversized on mobile: nothing fits, nothing breathes, and the page feels like it was designed for a screen that is not the one in hand (R-03). Spacing and type should follow the design rhythm (R-05), and that rhythm has a smaller register on mobile.
- **Fix:** give mobile its own size step: a smaller type scale, tighter section padding, smaller gaps. Keep tap targets at their minimum size (see Tap Targets), but shrink everything else with intent at the breakpoint.

### Fixed Pixel Type

- **Tell:** font sizes in fixed px that never change between desktop and mobile, so headings and body text stay oversized on a phone.
- **Why:** type that does not respond to the viewport is type sized for one screen. R-03 demands the mobile layout hold up, and R-06 requires typography that improves readability. A headline that spans the whole phone width or a body size tuned for a wide line breaks both.
- **Fix:** use fluid type (`clamp()`) so sizes scale with the viewport, or set a smaller type step at the breakpoint. Verify the result at a narrow width (R-35), not just in the desktop preview.

### 100vh Sections

- **Tell:** hero and section heights set to `100vh`, so a section fills the whole phone screen and pushes everything else below the fold.
- **Why:** a full-viewport section designed for a desktop monitor becomes a giant slab on a phone, and `100vh` includes the browser chrome, so it overflows the visible area on mobile browsers. It dominates the layout instead of introducing it (R-03).
- **Fix:** let sections size to their content (`auto`), or use the dynamic viewport unit (`dvh`) where a real full-height section is intended. Nothing below the fold should be an accident of viewport units.

### Huge Empty Padding

- **Tell:** desktop-scale section padding (96px, 128px) kept on mobile, creating tall empty gaps between sections on a phone.
- **Why:** padding tuned for a large canvas turns into wasted vertical space on a small one. The page scrolls through emptiness, and the rhythm R-05 calls for becomes a void between every section.
- **Fix:** reduce section padding at the breakpoint to a mobile register (roughly half or less), and check that the page scrolls at a natural density instead of through deserts of space.

## Grids & Stacking

### Columns That Don't Collapse

- **Tell:** a multi-column grid keeps its side-by-side columns on mobile, so the columns shrink, the text wraps awkwardly, and elements collide.
- **Why:** a grid is a promise about how much width is available. When the viewport narrows and the grid does not re-stack, every column gets a sliver, text becomes unreadable, and cards overlap (R-03). This is the collision failure: desktop's side-by-side becomes mobile's pileup.
- **Fix:** collapse the grid to a single reflowing column at the breakpoint. Side-by-side becomes stacked, and each item gets the full width again. Re-verify at a narrow width (R-35).

### Fixed-Width Grid

- **Tell:** `grid-template-columns` set in fixed px, or grid areas that cannot reflow, so the grid stays rigid when the viewport shrinks.
- **Why:** a fixed-px track does not care about the viewport; it keeps its width and forces overflow or collision. The layout was built for one canvas and cannot change shape (R-03).
- **Fix:** size tracks with `minmax()` or `auto-fit` and `auto-fill` so columns shrink and wrap with the content, and define grid areas that collapse at the breakpoint. The grid should be fluid by default, rigid only where a fixed size is deliberate.

### Forced 12-Column

- **Tell:** a 12-column grid forced onto mobile content that needs one or two columns, so spans look arbitrary and the math fights the layout.
- **Why:** a 12-column system is for a wide canvas with many columns of content. Forcing it on a phone makes every element a fraction of an invisible grid the user never sees, and the content gets fitted to the grid instead of the grid to the content (R-03).
- **Fix:** let columns follow the content. On mobile the content usually wants one column, or two at most; the 12-column span only makes sense where the layout genuinely has that many things side by side.

## Overflow

### Horizontal Scroll Leak

- **Tell:** the page scrolls sideways because some element is wider than the viewport: a table, a code block, an image, a long unbroken string.
- **Why:** horizontal scrolling is a broken promise on mobile. The user cannot see where the page ends, and the layout visibly spills off the screen (R-03). It is the most common overflow slop because the offender is off-screen in the desktop preview and goes unnoticed until a phone opens it.
- **Fix:** find the element wider than the viewport (a table that needs a reflow layout or a scroll container, a code block that wraps, images with `max-width: 100%`), then contain or reflow it. Verify the whole page has zero horizontal scroll at the narrowest target (R-35).

### Overflow Hidden Clipping

- **Tell:** `overflow: hidden` on a container that clips content at narrow widths, hiding text or controls instead of letting them fit.
- **Why:** clipping is hiding a failure. When a container cuts off its content because the layout cannot fit it, the user loses information and interaction (R-03). The zoom and text-resize angle on this is covered by `antislop-human`.
- **Fix:** let the content reflow instead of clipping: allow the container to grow, wrap its content, or collapse it at the breakpoint. Clip only where cropping is the design intent (like a thumbnail), never where it hides content.

### Fixed-Width Children

- **Tell:** flex or grid children with a fixed px width or `min-width` that burst out of their parent on a narrow screen.
- **Why:** a child sized in absolute px does not care how much room its parent has. On mobile the parent shrinks and the child stays wide, so it overflows the container and the page (R-03).
- **Fix:** size children with relative units and let them wrap (`flex-wrap`, fluid widths, `min-width: 0` on grid children). A child should be allowed to shrink with its container, not hold a desktop size.

## Tap Targets

### Under-Sized Targets

- **Tell:** buttons, links, and controls smaller than about 44 x 44 px, easy to hit on desktop with a cursor but hard to hit with a thumb.
- **Why:** a desktop cursor has pixel accuracy; a thumb does not. A target that is fine at 16px becomes an exercise in frustration on a phone, and it fails the promise that the UI is usable on mobile (R-03).
- **Fix:** give interactive targets a minimum touch area of 44 x 44 px, using padding or a larger hit box even when the visual is smaller. Verify the whole set of controls at a phone width (R-35).

### Targets Too Close

- **Tell:** 44px targets packed together with no gap, so a thumb tap hits the wrong one.
- **Why:** target size matters only with target spacing. Two large controls touching each other behave like one large control: the user cannot reliably pick either (R-03).
- **Fix:** leave a clear gap between adjacent interactive targets, at least a few px and ideally enough that the finger press area does not overlap. Spacing is the other half of tappability.

### Hover-Only Interactions

- **Tell:** menus, reveals, and tooltips that exist only on hover, so a touch user can never open them.
- **Why:** there is no hover on a touchscreen. An interaction that only responds to hover simply does not exist for mobile users, and any control that relies on it is a dead end (R-03).
- **Fix:** give every hover-only interaction a tap equivalent: a menu that opens on hover also opens on tap, a reveal also shows on click, and interactive elements show visible `:active` feedback so a tap registers. Test by using the UI with touch alone (R-35).

## Mobile Navigation

### Nav That Stays Desktop

- **Tell:** the desktop top bar with its row of links kept side by side on mobile, so the links crowd, wrap into two rows, or spill past the viewport.
- **Why:** a desktop nav is sized for a wide canvas. Kept as a row on a phone it becomes a mess of cramped links, and it is the first thing a mobile user meets (R-03). Navigation is where reflow matters most: the user has to find where to go before they can go anywhere.
- **Fix:** collapse the nav into a mobile pattern at the breakpoint: a bottom nav for the handful of primary destinations, or a menu for the rest. The links reflow out of the row, and the primary destinations stay one thumb tap away. Verify it holds at a narrow width (R-35).

### The Bare Hamburger

- **Tell:** everything hidden behind a hamburger icon with no label and no hint, so a user never realizes the menu exists or cannot tell what it opens.
- **Why:** a bare hamburger assumes the user already knows what the icon means and that a menu hides behind it. That is knowledge the mobile user may not have, and on mobile the hidden menu can hold the only way around the app (R-03).
- **Fix:** keep the menu discoverable: label the hamburger ("Menu"), or keep the primary destinations visible and hide only the secondary ones. If a menu is the only way to reach something important, that reachability has to be obvious.

### Bottom Nav That Eats Content

- **Tell:** a fixed bottom nav bar that sits over the content, covering the last list items, the final button, or the form the user was trying to finish.
- **Why:** a fixed bar takes real space on a small screen. If nothing reserves that space, the content scrolls under it and the user cannot reach what is hidden, especially at the very bottom of the page (R-03).
- **Fix:** reserve the bar's height for the content: scroll padding on the page and safe-area insets where the device needs them, so nothing important is ever hidden behind it. Verify at a narrow width that the last item is reachable (R-35).

### Sticky Nav Steals the Screen

- **Tell:** a sticky header or tall bottom bar that holds a large fixed height, so a big slice of the phone screen is always taken by navigation.
- **Why:** on a small viewport every fixed pixel of chrome is a pixel of content lost. A tall sticky header turns the visible area into a letterbox and the content into a sliver (R-03).
- **Fix:** keep fixed nav compact: small enough that the content stays dominant, and collapse or shrink it on scroll where appropriate. Navigation should be present, not the main occupant of the screen.

## Layoutmobile Skill Checklist

Run these alongside the core Delivery Gate when the task is mobile or responsive layout work. All answers must be **yes**:

- [ ] Does the layout reflow into a distinct mobile state rather than a squeezed desktop? (R-03)
- [ ] Do sizes (type, padding, gaps, section heights) use a mobile scale, not desktop sizes unchanged? (R-03, R-05)
- [ ] Do multi-column grids collapse and stack instead of colliding? (R-03)
- [ ] Is there no horizontal overflow and nothing clipped? (R-03)
- [ ] Are interactive targets at least 44 x 44 px with spacing between them? (R-03)
- [ ] Do hover-only interactions have a tap equivalent with visible feedback? (R-03)
- [ ] Does the navigation reflow into a mobile pattern (bottom nav or menu) instead of a squeezed desktop row? (R-03)
- [ ] Do fixed nav bars (bottom nav, sticky headers) never cover content and respect safe areas? (R-03)
- [ ] Is the layout verified at mobile breakpoints? (R-35)
