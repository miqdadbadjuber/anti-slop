---
name: antislop-ui
description: "UI and visual skill for antislop. Use when building or editing any interface: color, layout, components, motion. Load with the core."
allowed-tools: Read Write Edit Glob Grep
---
# antislop-ui

> Anti Slop: Rules for AI Coding Agents. UI & Visual skill

> Part of the antislop system. Read together with `antislop.md` (the core). This skill deep-dives the UI/visual concern: color, layout, components, decoration, structural flow, and motion. It references core rules by number and never duplicates or renumbers them. Load it when the task builds or edits a website, web app, or any interface.

## How to use this skill

- Load together with `antislop.md` whenever the task is UI or visual work. The core holds the mechanism (the purpose test, the three tiers, the Delivery Gate); this skill holds UI-specific depth.
- Every entry has the same shape: **Tell** (the pattern), **Why** (why it reads as slop), **Fix** (what to do instead), with the governing core rule cited as R-XX.
- The Delivery Gate in the core remains the gate. The "UI Skill Checklist" at the end of this file is the UI-specific supplement to run alongside it.

## Visual & Color

### Generic Blue-Purple Gradient

- **Tell:** blue-to-purple, blue-to-cyan, or purple-to-pink gradients used as the primary color treatment, or a full-page colored glow.
- **Why:** the most over-represented color treatment in training data. It signals "no brand identity", not "our palette", and marks the design as AI-generated at a glance.
- **Fix:** pull the palette from `DESIGN.md` or the product's own identity. Keep a gradient only as a hierarchy function with the reason written down (R-01). A gradient separating one level from another is craft; the same gradient on every section is a default.
- **The same default family:** harsh or rainbow gradients, purple-and-black schemes, neon or pastel palettes, and blurred radial orbs behind the hero. They are the same tell wearing different clothes: color from the model's default, not from the brand. All of them are FORBIDDEN as defaults without purpose (R-01).

### Excessive Glassmorphism

- **Tell:** blur/backdrop-filter on the navbar, cards, modals, and sidebar at the same time.
- **Why:** blur removes texture and sits every surface in the same frosted layer, flattening hierarchy. When every surface is glass, nothing is foreground.
- **Fix:** treat glass as an accent, not a character trait. Dose cap: at most 1-2 elements (R-10). The surface that needs the attention gets the glass; everything else stays solid.

### Excessive Border Radius

- **Tell:** every element is pill-shaped: buttons, inputs, cards, badges, modals.
- **Why:** uniform pill shapes erase the visual language of "this is an input, this is a card". Radius becomes decoration instead of a hierarchy tool.
- **Fix:** set a small set of radii in the design system and apply them deliberately (R-11). One generous radius on the primary CTA reads as intentional; the same radius on every element reads as a default.

### Overly Soft Shadows

- **Tell:** every component carries a large shadow, so the whole page feels like it is floating.
- **Why:** when everything is elevated, elevation communicates nothing. The page loses its ground plane and becomes generic softness.
- **Fix:** use shadow as an elevation marker only, and write the elevation reason down (R-12). Most elements should sit flat; the one or two that need to lift above the page carry the shadow.

### Glow Everywhere

- **Tell:** glow on cards, buttons, icons, badges, backgrounds, and borders simultaneously.
- **Why:** glow is an attention amplifier. Applied everywhere it amplifies nothing, and it is one of the fastest ways to look "made by AI".
- **Fix:** reserve glow for a maximum of 1-2 important elements as a focus accent (R-13). Everything else stays matte.

### Background Grid

- **Tell:** grid squares, blueprint lines, graph paper, dot grids, or thin repeating lines behind content.
- **Why:** it is a default way to make a flat page feel "technical" without doing any real work. It reads as texture without intent.
- **Fix:** use texture or pattern only when it genuinely supports the product's identity, with the reason written down (R-07). A real identity motif (core Part 3) beats a stock grid every time.

### Dark Mode Default for No Reason

- **Tell:** the whole page is dark simply because it looks "tech", with no branding consideration.
- **Why:** dark is a decision, not a default. Forcing it reads as following a trend, not serving the product.
- **Fix:** choose the theme from brand identity, product type, and audience (R-21). Developer and creative tools have legitimate reasons for dark; a content-first product usually does not. If there is no strong reason for a fixed theme, build a working light/dark toggle.

### Too Many Colors in the Palette

- **Tell:** 5-7 different colors on one page with no clear design system.
- **Why:** a scattered palette has no hierarchy. When every element can be any color, nothing is distinguished.
- **Fix:** cap the active palette at 2-3 core colors + 1 accent (R-29), and let one of the cores be the neutral base. Restraint is what makes the accent land.

### Excessive Accent Color

- **Tell:** one accent color on buttons, icons, badges, links, lines, backgrounds, and glows at once.
- **Why:** the accent stops being an accent the moment it is everywhere. It becomes just another color, and the design loses its focal point.
- **Fix:** the accent belongs at the key moment only (one deliberate accent, core Part 3). Zero accents is sterile; an accent everywhere is slop. Choose the one or two places it matters.

### Sterile Default

- **Tell:** flat white or near-white, thin grey borders, small radius, no texture, generic font, no identity.
- **Why:** this is the "safe" result of over-filtering without direction. It is not slop, but it is not design either: it is a void where a design should be.
- **Fix:** this is a direction problem, not a filter problem. Add `DESIGN.md` or resolve the Design Read (core Part 3), then raise the liveliness dials. The fix is never more bans; it is state the purpose and add energy.

## Layout & Components

### Monotonous Template Layout

- **Tell:** hero, subtitle, 2 CTAs, screenshot, feature grid, testimonials, FAQ, CTA, footer, in that order, every time.
- **Why:** the order is the training-data default, not the product's narrative. Sections appear because the template has them, not because the content needs them.
- **Fix:** build the structure around actual content needs (R-05, C-3). If the product has no testimonials, there is no testimonials section. Section order follows the product's story. Match the RHYTHM dial: if it is 3, sections visibly vary.

### Copy-Paste Feature Cards

- **Tell:** identical size, height, icon, layout, and padding across all feature cards.
- **Why:** uniform cards flatten the content. When every feature is a card with an icon, the features with real weight and the ones without look the same.
- **Fix:** create variation that reflects content hierarchy, with the reason written down (R-14). Not every feature needs to be a card. The flagship feature may deserve a full-width treatment, the supporting ones a list.

### Bento Grid

- **Tell:** a section made of a mosaic of differently-sized cards, some spanning two columns or two rows, filling the space like a tiled dashboard.
- **Why:** it is the default "app-like" landing layout of the last few years, so it signals nothing about the product. When every section could be a bento, the layout is a template, not a decision.
- **Fix:** use a bento grid only when the content genuinely has elements of different sizes to show (R-05). If every cell is roughly the same, a simple grid or list is more honest. The RHYTHM dial decides whether sections vary at all.

### Uniform Spacing

- **Tell:** padding, margin, and gaps are identical across every section.
- **Why:** rhythm is a tool, and a single spacing value removes it. Sections stop relating to each other; the page reads as one flat strip.
- **Fix:** use whitespace as structure (core Part 3) and vary it with the RHYTHM dial. Establish a spacing scale, then use different levels to separate and connect. Uniform rhythm is a deliberate choice only when the dial says so (R-05).

### "How It Works" Always 3 Steps

- **Tell:** round icon + number 1, 2, 3 + short text, always three steps, always the same shape.
- **Why:** the product's real process is rarely a tidy three-step list. The template forces the process into its shape, not the other way around.
- **Fix:** present the process as it actually is (R-05). Three steps with round icons is fine if that is genuinely the process; otherwise use whatever shape the real workflow takes, including two steps or five.

### "Trusted By" Logo Bar

- **Tell:** a row of generic company logos directly below the hero.
- **Why:** it is a trust claim with no evidence: generic logos, no real customers named, no proof of use.
- **Fix:** only show real, verifiable logos (R-18, R-36, C-5). If the product has no such customers yet, do not fabricate a logo bar. Real social proof beats a generic one every time.

### "Most Popular" Pricing Card

- **Tell:** the middle pricing tier always highlighted with a capsule badge.
- **Why:** it is the default pattern, which means it is not a decision. When every pricing section does it, the highlighted tier stops meaning anything.
- **Fix:** highlight the tier that actually serves the product's goals, and write why (R-31). If no tier deserves emphasis, highlight none.
- **Three columns is part of the tell:** pricing shown as three tiers whatever the real structure, the middle one highlighted. That shape is the default, so it is not a decision (R-05). Use as many tiers as the product really has, and highlight the one that serves it.

### Demo Without a Product

- **Tell:** the page sells a product that is never shown working: no real demo, no Terms of Service, no Privacy Policy, just promises.
- **Why:** it is a demo wearing a product's clothes. Every claim is trust with nothing behind it, and the missing legal pages are the quiet tell that nothing real exists yet.
- **Fix:** show the real product working, or say honestly that it is not shipped yet (R-38, C-5). If the page asks for signups or payment, the Terms of Service and Privacy Policy must exist. An honest "coming soon" beats a convincing demo.

### 4-Column Template Footer

- **Tell:** Product / Company / Resources / Legal columns with no variation.
- **Why:** the columns exist because templates have them, not because the site has that many link groups.
- **Fix:** structure the footer around what the product actually links to (R-05). A single column of links can be more useful than four half-empty ones.

### Uniform Section Rhythm

- **Tell:** every section is centered title + subtitle + identical card grid, with no variation.
- **Why:** identical composition makes sections blur together, and the page feels repetitive and flat.
- **Fix:** vary composition with the RHYTHM dial (R-05). Alternate text-heavy and visual sections, asymmetric and symmetric layouts. A page where every section follows the same template is a page designed by a template.

## Decorative Elements

### Generic AI Icons

- **Tell:** sparkle, star, magic, lightning, diamond, cube, robot, or AI orb as feature icons.
- **Why:** these glyphs are the generic vocabulary of "AI product". They communicate nothing about the specific feature.
- **Fix:** use icons genuinely relevant to the content, with the relevance written down when the glyph is generic (R-04). If no appropriate icon exists, use none. The feature label does the work.

### Lucide Icons

- **Tell:** every icon comes from the same thin-stroke, rounded-corner library (Lucide or a visual clone), so all icons share one recognizable look.
- **Why:** a single default icon library makes every AI site's icons identical, so the icons stop telling you anything about the product. The glyphs may be relevant; the uniform library look is the tell.
- **Fix:** the icon set is a visual choice, not a default (R-04). Pick icons for relevance first; then decide whether the library's weight and stroke suit the product's character. Two icons that look "same-ish" can still read as yours if the set is a decision, not an import.

### Emoji as Decoration

- **Tell:** literal emoji scattered through the copy, headings, badges, and buttons: 🚀 in a headline, ✅ beside every feature bullet, 🔥 on a CTA, 📈 above a chart title.
- **Why:** emoji is the loudest shorthand for "this was generated, not written". In a UI it competes with the content for attention and flattens the product's voice into the same cheerful default as every other AI site.
- **Fix:** remove emoji from UI text. If a concept needs a mark, use a real, relevant icon with the reason written down (R-04), or no mark at all. The copy carries the meaning; the emoji adds nothing.

### Small Arrows on Every Button

- **Tell:** `→` or `↗` placed on almost every button as pure decoration.
- **Why:** the arrow becomes a pattern, not a signal. When every CTA has one, none of them point anywhere specific.
- **Fix:** arrows are not the default identity for buttons (R-08). Keep them for the action that genuinely benefits from a direction cue, sized proportionally, with the purpose written down.

### Colored Left Stripe

- **Tell:** a thin colored vertical bar on the left edge of cards, list rows, or section headers, used as decoration.
- **Why:** the stripe adds color without adding meaning. It is the cheapest way to make a card "look designed", so it appears everywhere and says nothing.
- **Fix:** the stripe is decoration; it must carry information or go (R-01, R-31). A left edge that marks real state (active, warning, new) is a signal. A stripe that exists to look designed is a default.

### AI Capsule Badges

- **Tell:** pill shape, thin border, glow, small dot, uppercase, containing "AI Powered", "Beta", "New".
- **Why:** the capsule-plus-glow-plus-dot combination is a self-referential badge that says "made by AI, about being made by AI". It adds noise, not information.
- **Fix:** badges only when functionally needed, with the need written down, and never the full combination (R-09). A real status label is fine; a decorative "AI Powered" pill is not.

### Generic AI Typography

- **Tell:** large monospace headings, or uppercase labels with extreme letter-spacing ("HOW IT WORKS", "FEATURES").
- **Why:** monospace-as-aesthetic and wide-tracked uppercase are shorthand for "technical and modern" without doing any real typographic work.
- **Fix:** choose typeface from brand character, not the model's default pick, and write the reason (R-06). Typography must improve readability and reflect the product. A type choice with a reason beats a trend every time.
- **The default roster:** Inter, Geist, and Space Grotesk for sans; Geist Mono, JetBrains Mono, and Fira Code for mono. None are banned; each is valid with a brand reason. The tell is the font that shows up because it was the default, not because it fits (R-06).

### Fake Terminal Window

- **Tell:** a styled terminal window with traffic-light dots, a prompt line, and typed-out commands, used as the hero or feature visual.
- **Why:** it is the generic "this is a developer tool" costume. The window is decoration; the real product rarely looks like that. It reads as a placeholder for a real screenshot.
- **Fix:** if the product is genuinely a terminal or CLI, a real, working screenshot is evidence. Otherwise show the actual product UI, not a costume (R-06, C-5). Monospace as aesthetic is already covered by R-06; a fake terminal is that pattern as a component.

### Illustrations With No Connection

- **Tell:** Undraw, Storyset, or generic 3D blob characters with no real connection to the product.
- **Why:** decorative illustrations say the design is decorated, not designed. They fill space without serving the content.
- **Fix:** illustrations must have a direct connection to the product, with the connection written down (R-22). If none exists, use real screenshots or no illustration.

## Structural & Flow

### Dead Navigation

- **Tell:** navbar links to pages or sections that do not exist.
- **Why:** dead links are a broken promise. They break trust the moment a user clicks them.
- **Fix:** every navigation item must have a real destination (R-24). If a feature is not built, leave it out, or label it "Coming soon" clearly. The navbar reflects content that actually exists.

### Non-Functional Controls

- **Tell:** buttons do nothing, dropdowns won't open, forms cannot submit.
- **Why:** the visual is finished but the behavior is not. This is the difference between a mockup and a product.
- **Fix:** every interactive element has real behavior, or it is removed (R-26). If an element genuinely cannot have a destination, ship a clear `// TODO` plus a visible "Coming soon" label, or do not ship it.

### Sections That Fill a Template

- **Tell:** a section exists because "every AI landing page has one", not because the content needs it.
- **Why:** template sections are content without purpose. They add length and remove focus.
- **Fix:** every section earns its place from the product's content (C-3). Remove sections that only fill a template. A page with fewer, purposeful sections is stronger than a page with all the defaults.

## App & Dashboard

The patterns above are landing-page shapes. These are the app-side equivalents: the defaults an agent reaches for when the screen is a dashboard, an admin panel, or any signed-in view. The rules they break are the same ones; only the shape is new.

### Default Dashboard Shell

- **Tell:** left sidebar, top bar, four stat cards, a chart, a table. Chosen before anyone asked what the screen is for, and identical whether it manages invoices, patients, or servers.
- **Why:** it is the landing-page template problem in an app: a layout picked from memory instead of from the work the screen supports. Swap the labels and it belongs to any product.
- **Fix:** name the screen's job and the one decision the user makes on it, then build the hierarchy around that (C-3, R-20). If the job is "spot the failing job and retry it", the failing jobs are the page and the stat row is a footnote. Sections that survive only because dashboards usually have them get cut (C-3).

### Stat Cards With Invented Numbers

- **Tell:** a row of four cards reading 12,483 / 94.2% / $48.2K / 1,204, each with a green "+12% this week" delta.
- **Why:** the numbers are decoration, and the deltas are worse: a trend claim with no series behind it. Real dashboards have metrics that matter and metrics that do not, so four equal cards is already a hierarchy failure.
- **Fix:** show real numbers or none (R-17, R-38). Wire the cards to real data, or ship the one metric that is real. A delta appears only when the comparison period is real and named. If the screen is a prototype, label the values as placeholder where the user can see it (R-38).

### Filler Activity Feed

- **Tell:** "Sarah Chen updated a document, 2 hours ago", repeated with rotating names and avatars.
- **Why:** invented people, invented events. It is the testimonial section wearing a different layout, and it makes an empty product look busy.
- **Fix:** the feed shows real events or does not ship (R-18, R-38). An honest empty state beats a fabricated feed, and it tells the user what to do first (R-27).

### Charts Without a Question

- **Tell:** a line or donut chart placed because the space looked bare, with a generic title ("Overview", "Performance") and no axis the reader can act on.
- **Why:** a chart is an answer. Without the question, it is texture, and it costs more attention than a sentence would.
- **Fix:** write the question the chart answers before drawing it, and put that question in the title ("Failed jobs per hour, last 24h"). If a sentence answers it better, write the sentence (C-3). Chart segments still need 3:1 contrast against their neighbours (R-25).

### Generic Table Columns

- **Tell:** Name, Status, Date, Actions, whatever the rows actually are, with a three-dot menu on every row.
- **Why:** the columns come from the table component, not from the data. The user scans for the field that decides their next move and it is not there.
- **Fix:** pick columns from the decision the user makes in this table, and put the deciding field early. The row menu holds actions that exist; anything that does nothing comes out (R-26).

### Filler Data in Fields and Columns

- **Tell:** empty form fields and table columns filled with fake but plausible data: `John Doe`, `johndoe@example.com`, `"Let's build something"`, phone numbers and dates that belong to nobody.
- **Why:** fabricated content disguised as real. It reads fine in a mockup and falls apart the moment a real user looks: the name is not a customer, the email is not a lead, and the message is a tagline. It is the strongest tell that the screen was generated, not built.
- **Fix:** leave empty cells empty, or use placeholders that clearly say what goes there: `Your Name`, `email@example.com`, `Drop your message here...`, or `[REAL DATA]` when a value is expected (R-23, R-38). Real data goes in when it exists. Generic filler copy like "Let's build something" is buzzword slop and does not belong in a data column (R-16).

### Placeholder Empty and Loading States

- **Tell:** "No data available" with an illustration, a bare spinner, or a full-page skeleton that mimics a layout the real data never fills.
- **Why:** R-27 requires the states, and these technically have them. They still tell the user nothing: no cause, no next action, no idea whether this is normal.
- **Fix:** an empty state says why it is empty and gives the one action that fills it ("No jobs yet. Run a sync to see results here"). A loading state says what it is loading. An error state says what failed and what to do next (R-27). First run, filtered to nothing, and permission denied are different screens and read differently.

## Motion

### Endless Pulses and Loops

- **Tell:** elements that pulse, bounce, or float forever with no user trigger.
- **Why:** perpetual motion is noise. It competes with the content for attention and never stops to let the user rest.
- **Fix:** motion must have a clear UX purpose, written down (R-19). Animation guides attention to a moment; it does not run on a loop. If the MOTION dial is 1 (hover states only), an endless loop is a FAIL against the declared dial.

### Template Animations Stacked

- **Tell:** every element uses Fade Up + Fade In + Floating + Scale + Bounce simultaneously.
- **Why:** a page where everything animates has no focal point. Motion becomes wallpaper.
- **Fix:** choreograph motion to a purpose and to the MOTION dial (R-19). Not everything moves. The hero speaks, the supporting elements stay calm. Claimed "cinematic" pages must actually move; claimed "static" pages must not.

## UI Skill Checklist

Run these alongside the core Delivery Gate when the task is UI work. All answers must be **yes**:

- [ ] Is the palette derived from `DESIGN.md` or a written brand identity, not the default gradient set? (R-01, R-29)
- [ ] Is the accent used at the key moment only, not spread across every element? (core Part 3, one deliberate accent)
- [ ] Is the copy free of decorative emoji scattered through headings, bullets, and buttons? (R-04)
- [ ] Do section compositions vary according to the declared RHYTHM dial instead of repeating one template? (R-05)
- [ ] Is the layout free of the default AI shapes: bento-grid mosaic, fake terminal window, three pricing columns, and left-edge color stripes with no meaning? (R-05, R-01)
- [ ] Does every navigation item and interactive element have a real destination or behavior, or a visible "Coming soon" label? (R-24, R-26)
- [ ] Does motion follow the declared MOTION dial and serve a written purpose, with no endless loops? (R-19)
- [ ] Is glass, glow, shadow, and radius used at their dose caps, not as a page-wide default? (R-10, R-11, R-12, R-13)
- [ ] On an app screen, is the layout built around the decision the user makes there, rather than the sidebar plus stat row plus chart plus table default? (C-3, R-20)
- [ ] Is every number, delta, feed entry, and table row real or a labelled placeholder, with no invented metrics? (R-17, R-18, R-38)
- [ ] Do empty form fields and table cells stay empty or carry honest placeholders (Your Name, email@example.com) instead of fake-looking data (John Doe, johndoe@example.com)? (R-23, R-38)
- [ ] Do the empty, loading, and error states name the cause and the next action instead of saying "No data"? (R-27)
- [ ] Does the page hold up at every breakpoint, theme, and state, and pass keyboard-only use? (R-03, R-34, C-4)
