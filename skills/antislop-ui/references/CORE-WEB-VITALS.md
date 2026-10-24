# Core Web Vitals (LCP, INP, CLS)

> Reference for antislop. Adapted from the MIT-licensed web-quality-skills by Addy Osmani (https://github.com/addyosmani/web-quality-skills); see LICENSE-web-quality-skills in the skill folder.

Targeted optimization for the three Core Web Vitals using field data to identify user impact and browser traces to diagnose causes.

## Measure before optimizing

When a runnable URL is available, prefer this sequence:

1. Check page-level CrUX p75 data, with a clearly labeled origin fallback when page data is unavailable.
2. Record a browser performance trace under stated conditions. With Chrome DevTools MCP, trace summaries can include CrUX alongside the observed lab metrics.
3. Analyze only the insights associated with the failing metric, then inspect the implicated code and resources.
4. Re-run equivalent lab measurements after the fix. Do not claim an immediate field improvement; CrUX and first-party RUM need new user visits.

If only source code is available, identify likely causes but do not claim that LCP, INP, or CLS is failing without runtime evidence.

## The three metrics

| Metric | Measures | Good | Needs work | Poor |
|--------|----------|------|------------|------|
| **LCP** | Loading | ≤ 2.5s | 2.5s to 4s | > 4s |
| **INP** | Interactivity | ≤ 200ms | 200ms to 500ms | > 500ms |
| **CLS** | Visual Stability | ≤ 0.1 | 0.1 to 0.25 | > 0.25 |

Google measures at the **75th percentile**: 75% of page visits must meet "Good" thresholds.

These are the numbers R-40 keeps out of the Hard Gate. They describe real visits, so compare a page against them only with a real measurement in hand, and report "not measured" otherwise (R-36).

---

## LCP: Largest Contentful Paint

LCP measures when the largest visible content element renders. Usually this is:
- Hero image or video
- Large text block
- Background image
- `<svg>` element

### Common LCP issues

**1. Slow server response (TTFB > 800ms)**
```
Fix: CDN, caching, optimized backend, edge rendering
```

**2. Render-blocking resources**
```html
<!-- ❌ Blocks rendering -->
<link rel="stylesheet" href="/all-styles.css">

<!-- ✅ Critical CSS inlined, rest deferred -->
<style>/* Critical above-fold CSS */</style>
<link rel="preload" href="/styles.css" as="style" 
      onload="this.onload=null;this.rel='stylesheet'">
```

**3. Slow resource load times**
```html
<!-- ❌ LCP image is discovered only after a stylesheet loads -->
<div class="hero"></div>

<!-- ✅ Discoverable in initial HTML and prioritized -->
<link rel="preload" href="/hero.webp" as="image" fetchpriority="high">
<img src="/hero.webp" alt="Hero" fetchpriority="high">
```

Prefer a discoverable `<img>` with `fetchpriority="high"`. Add the preload only when the trace shows that the resource would otherwise be discovered late; duplicate or speculative preloads can compete for bandwidth.

**4. Client-side rendering delays**
```javascript
// ❌ Content loads after JavaScript
useEffect(() => {
  fetch('/api/hero-text').then(r => r.json()).then(setHeroText);
}, []);

// ✅ Server-side or static rendering
// Use SSR, SSG, or streaming to send HTML with content
export async function getServerSideProps() {
  const heroText = await fetchHeroText();
  return { props: { heroText } };
}
```

**5. Make navigations instant with the Speculation Rules API**

For sites with predictable same-origin journeys, prerendering a likely next page can make a successful subsequent navigation much faster. Treat this as a measured navigation optimization, not a substitute for fixing the current page's LCP.

```html
<script type="speculationrules">
{
  "prerender": [{
    "where": { "href_matches": "/*" },
    "eagerness": "moderate"
  }]
}
</script>
```

Current Chrome behavior is specific enough to guide the choice:

| `eagerness` | Trigger |
|-------------|---------|
| `conservative` | Pointer or touch down |
| `moderate` | Desktop: 200ms hover, or earlier pointer down; mobile: viewport heuristics |
| `eager` | Chrome 143+: desktop 10ms hover; mobile 50ms after the anchor enters the viewport |
| `immediate` | As soon as the rules are observed |

Start conservatively and measure prediction hit rate, transferred bytes, server load, and navigation improvement before expanding the rules. Recheck [Chrome's maintained eagerness documentation](https://developer.chrome.com/docs/web-platform/prerender-pages#eagerness) before hardcoding timing-sensitive behavior.

Caveats:
- **Bandwidth/CPU cost.** Each prerender is roughly a full page load. Scope `where` carefully (`href_matches` patterns, exclude logout/checkout) and avoid `immediate` outside small sites.
- **Side effects fire early.** Analytics, ads, and any code that runs on load will fire when the prerender starts, not when the user navigates. Gate side effects on the [`prerenderingchange` event](https://developer.chrome.com/docs/web-platform/prerender-pages#detect_when_a_page_is_prerendered_or_used_for_a_full_navigation) or `document.prerendering`.
- **Chromium-only.** Safari and Firefox ignore the script, it's a progressive enhancement, never a regression.

### LCP optimization checklist

```markdown
- [ ] TTFB < 800ms (use CDN, edge caching)
- [ ] LCP resource is discoverable in initial HTML and prioritized; preload only if the trace shows late discovery
- [ ] LCP image optimized (WebP/AVIF, correct size)
- [ ] Critical CSS inlined (< 14KB)
- [ ] No render-blocking JavaScript in <head>
- [ ] Fonts don't block text rendering (font-display: swap)
- [ ] LCP element in initial HTML (not JS-rendered)
- [ ] Speculation Rules added for likely-next navigations (moderate eagerness)
```

### LCP element identification

This snippet diagnoses the current page session. It is not field data.

```javascript
// Find your LCP element
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP element:', lastEntry.element);
  console.log('LCP time:', lastEntry.startTime);
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

---

## INP: Interaction to Next Paint

INP measures responsiveness across clicks, taps, and key presses during a visit. Diagnose its input delay, processing time, and presentation delay separately; a slow interaction may involve main-thread contention before the handler, expensive application work, or delayed rendering after it.

When field INP is poor or a trace identifies a slow interaction, read [web.dev on optimizing INP](https://web.dev/articles/optimize-inp) for trace interpretation, yielding patterns, and third-party and rendering causes.

---

## CLS: Cumulative Layout Shift

CLS measures unexpected layout shifts across a page visit. Use field attribution or a trace to identify the shifted node and the trigger; do not assume the visible victim caused the shift.

When field CLS is poor or a trace reports shifts, read [web.dev on optimizing CLS](https://web.dev/articles/optimize-cls) for reserved-space patterns, dynamic content, and font and animation fixes.

---

## Measurement sources

| Source | Use |
|--------|-----|
| Browser performance trace (Chrome DevTools MCP: `performance_start_trace`) | Observe one load or interaction and diagnose focused insights; use included CrUX context when available |
| CrUX or Search Console | Prioritize aggregated real-user outcomes at p75 |
| Lighthouse CLI or PageSpeed Insights | Controlled lab fallback when DevTools tools are unavailable |
| First-party RUM | Segment current production experience by route, device, release, and attribution |
| Raw `PerformanceObserver` | Inspect one page session during debugging |

Do not route performance through Chrome DevTools MCP's `lighthouse_audit`; that capability intentionally covers non-performance Lighthouse categories. Do not compare a single lab value directly with a field p75 as if they were equivalent samples.

When adding or reviewing production collection, read [the `web-vitals` library documentation](https://github.com/GoogleChrome/web-vitals). Prefer the `web-vitals` library because raw browser APIs do not by themselves implement every Core Web Vital's lifecycle and reporting rules.

---

## References

- [web.dev LCP](https://web.dev/articles/lcp) and [optimizing LCP](https://web.dev/articles/optimize-lcp)
- [web.dev INP](https://web.dev/articles/inp)
- [web.dev CLS](https://web.dev/articles/cls)
