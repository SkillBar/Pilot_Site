# PILOT Product Design QA

## Comparison target

- Source visual truth: the original browser captures in `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/02-hero.png` through `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/14-mobile-finance.png`, interpreted together with the approved implementation plan. The plan intentionally replaces the broken type system, decorative English tags, placeholder imagery, scale behavior, and financial navigation shown in the source captures.
- Rendered implementation: `http://localhost:3000/`.
- Primary implementation captures: `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/implementation/` plus the final follow-up captures in `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/followup/`.
- Combined comparison evidence: `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/implementation/comparisons/` and `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/followup/comparisons/`.

## Viewports and normalization

| State | CSS viewport | Source pixels | Implementation pixels | Density normalization |
| --- | ---: | ---: | ---: | --- |
| Desktop | 1440 × 900 | 1440 × 900 | 1440 × 900 | 1:1 CSS-pixel comparison |
| Tablet landscape | 1024 × 768 | n/a | 1024 × 768 | implementation resilience check |
| Tablet portrait | 768 × 1024 | n/a | 768 × 1024 | implementation resilience check |
| Mobile | 390 × 844 | 390 × 844 | 390 × 844 | 1:1 CSS-pixel comparison |
| Narrow mobile | 360 × 800 | n/a | 360 × 800 | implementation resilience check |

The screenshots contain the page viewport only, without an external device frame. Side-by-side comparison images preserve equal source and implementation pixel dimensions.

## State and interaction coverage

- Theme and locale: dark/light section system as shipped, Russian locale, unauthenticated landing page.
- Hero: animated scale chip, CTA layout, platform links, sticky header.
- Scale: desktop four-canvas state, mobile one-canvas state, selector change to 1:43, keyboard ArrowRight rotation, pointer drag, pointer capture path, model remount after viewport exit/return.
- Finance: horizontal investment navigation, Base/Growth toggle, M1–M24 month controls, slider ArrowLeft behavior, active orange/white state, mobile horizontal chart viewport.
- Responsive: 1440×900, 1024×768, 768×1024, 390×844, and 360×800.
- Browser console: no errors and no `WebGL context lost` messages. The remaining `THREE.Clock` deprecation notice is emitted by the current React Three Fiber dependency; an audience LCP notice occurs only when QA opens the deep `#audience` anchor as the first visible viewport.
- Follow-up implementation: exact two-line Phygital heading; simplified scale selector; aligned vehicle baselines; smaller circuit city labels; left-aligned bento copy; equal 3×2 advantage cards; readable Arena table labels; and removal of Anatomy, Business Model, and Cap Table micro-tags.

## Full-view comparison evidence

- Hero: `comparisons/desktop-hero-before-after.jpg` and `comparisons/mobile-hero-before-after.jpg`.
- Scale: `comparisons/desktop-scale-before-after.jpg` and `comparisons/mobile-scale-before-after.jpg`.
- Tracks: `comparisons/desktop-tracks-before-after.jpg`.
- Advantages: `comparisons/desktop-advantages-before-after.jpg`.
- Audience: `comparisons/desktop-audience-before-after.jpg` and `comparisons/mobile-audience-before-after.jpg`.
- Finance: `comparisons/desktop-finance-before-after.jpg` and `comparisons/mobile-finance-before-after.jpg`.

## Focused-region comparison evidence

- Hero scale animation: `implementation/desktop-hero.png` confirms a visible scale value during the animation and the larger logo/headline/CTA hierarchy.
- Advantage imagery and crop: `implementation/desktop-advantages.png` and `desktop-advantages-lower.png` confirm all six real images, 4:3 treatment, and no missing AR media.
- 3D interaction: `implementation/mobile-scale-drag-before.png` and `mobile-scale-drag-after.png` confirm pointer-driven rotation; keyboard and selector state were also verified in the browser.
- Tablet finance: `implementation/tablet-768-finance.png` confirms the active tab, readable chart labels, and full-width graph composition.
- Header rhythm: `followup/comparisons/desktop-header-before-after.png` confirms removal of both FPV controls and equal 40 px word-edge gaps between intrinsic-width navigation items.
- Bento and cards: `followup/comparisons/desktop-bento-before-after.png`, `desktop-advantages-before-after.png`, and `desktop-audience-before-after.png` confirm the revised alignment and grid rhythm.

## Required fidelity surfaces

- Fonts and typography: Pilot Unbounded is used for display hierarchy, Pilot Inter for reading/UI text, and Pilot JetBrains Mono for metrics and technical labels. Cyrillic and Latin local WOFF2 subsets load with `font-display: swap`. Headline wrapping is word-safe at 360–1440 px.
- Spacing and layout rhythm: hero, section headers, 12-column advantages grid, 3/2/1 audience grid, partner cards, and full-width finance panel retain clear hierarchy without overlap or horizontal page overflow.
- Colors and visual tokens: the established black/white/orange system is preserved. Active orange controls use white text, and body copy contrast is stronger without changing the product palette.
- Image quality and asset fidelity: supplied advantage and audience media are rendered as real responsive images with explicit alt text and object positioning. No placeholder silhouettes remain in the audited audience cards; no missing media remains in advantages.
- Copy and content: the Russian product copy and information architecture remain intact. Decorative English eyebrow labels, repeated Race Week/Partner labels, and the visible Investor Deck/Scenario metadata are removed as approved.

## Comparison history

1. Initial pass — blocked by P1 mobile heading breaks, compressed finance labels, and a missing AR image.
   - Fixes: ScrollFloat now wraps complete words; the chart receives a readable mobile horizontal viewport and padded endpoint labels; the active financial tab auto-centers; AR media was converted from the supplied PNG to a browser-safe optimized WebP.
   - Post-fix evidence: `comparisons/mobile-audience-before-after.jpg`, `comparisons/mobile-finance-before-after.jpg`, and `implementation/desktop-advantages.png`.
2. Second pass — blocked by P2 stretched whitespace in narrow advantage cards, anchor headings under the sticky header, and a transient blank Hero scale frame.
   - Fixes: advantage cards align to their natural height, sections receive a sticky-header scroll margin, and Hero uses synchronized presence with shorter stagger.
   - Post-fix evidence: `implementation/desktop-advantages.png`, `implementation/mobile-scale.png`, and `comparisons/desktop-hero-before-after.jpg`.
3. Final pass — no actionable P0/P1/P2 visual or interaction findings remain across the audited viewports and states.
4. Follow-up pass — applied the user's exact content reductions and typography cleanup. Desktop advantage cards measure the same 395 px height, use a 6 px title-to-copy gap, and contain no circular arrow buttons. Audience copy is two lines at desktop with 24 px column and 32 px row gaps. Shared section titles compute to 48 px/700 on desktop.

## Findings

- No actionable P0, P1, or P2 findings remain.
- P3: React Three Fiber currently emits a `THREE.Clock` deprecation warning from dependency internals. It does not affect rendering, interaction, or WebGL stability and can be removed during the next dependency maintenance pass.
- P3: deep-anchor screenshots can catch lazy images or ScrollFloat while the in-app browser has animation/observer work paused. Normal top-to-bottom browsing and the earlier implementation captures confirm the assets and headings render; this is a capture-surface artifact, not a shipped layout defect.

## Residual test gaps

- Exact p95 frame-time and long-task budgets require a dedicated hardware performance trace rather than screenshot QA. The implemented path removes scene raycasting, keeps demand rendering, uses 105k–139k-triangle motion LODs, excludes Three/R3F from the initial HTML chunk graph, and keeps the selected four idle+motion GLBs at 19.24 MiB.
- KTX2 transcoding was not forced because no KTX2 encoder is installed locally; the GLB transfer budget is already met with Web/Motion LOD staging.
- Full-repository ESLint still reports seven errors and one warning in untouched legacy files (`DownloadSection`, `FadeIn`, `Shuffle`, and city-driving debug utilities). ESLint for every file changed in this implementation, TypeScript, production build, and `git diff --check` pass.

## Video, partner-logo and finance refinement — 2026-08-20

### Evidence compared together

- Normalized 694 × 781 before/after pairs:
  - `.codex-audit/video-refresh/comparisons/phygital-before-after.jpg`;
  - `.codex-audit/video-refresh/comparisons/companies-before-after.jpg`;
  - `.codex-audit/video-refresh/comparisons/finance-before-after.jpg`.
- Source-video and seam evidence: `.codex-audit/video-source/loop-contact.jpg`, `loop-mobile-contact.jpg`, `transition-a-b.jpg`, and `transition-loop.jpg`.
- Final standalone captures: desktop Phygital at `.codex-audit/video-refresh/after/11-phygital-final-1280.png`, mobile Phygital at `02-phygital-mobile.jpg`, desktop partners at `05-companies-desktop.jpg`, and finance at `07-finance-desktop.jpg` / `08-finance-mobile.jpg`.

### Implemented result

- Phygital is now a full-bleed atmospheric video section. The two supplied clips are encoded as one 24.083-second H.264 loop with two 0.5-second dissolves, no reverse or speed change, desktop/mobile crops, progressive loading, still posters, offscreen pause, document-visibility pause, and a still-poster reduced-motion state. The final desktop capture reports the desktop source at ready state 4, playback active, subtitle opacity 1, and zero horizontal overflow.
- The Scale and Circuit introductions now place their descriptions directly below the headings. Intro-to-content rhythm is normalized to 48 px on mobile and 64 px on desktop; section skeletons use the same 64/96 px outer cadence as resolved sections.
- Five verified official partner assets are rendered in optical containers without replacing the existing company names. No logo was fabricated for ФВСМ because its official site does not expose a standalone brand asset and uses a different organization qualifier.
- Finance now uses the available panel width on mobile, preserves vertical page scrolling with `touch-action: pan-y`, only changes the chart after pointer down, exposes a Russian `aria-valuetext`, provides a visible keyboard focus outline, uses 44 px scenario controls, 2 × 2 mobile metrics, and shows a useful peek of the next investment tab before horizontal scroll.

### Measurements and findings

- Responsive visual checks: 1280 × 800, 694 × 781, 390 × 844; final audited captures have zero page-level horizontal overflow.
- Partner render: five official images load; the sixth card remains intentionally typographic rather than using an unverified mark.
- Finance: Base/Growth controls measure 44 px; chart touch action computes to `pan-y`; month/network/monetization values are exposed to assistive technology.
- Browser console in the final inspected state contains no fresh errors or warnings.
- No actionable P0, P1, or P2 findings remain. P3 content dependency: add the ФВСМ mark only after receiving a verified official brand file and confirming the organization name.

final result: passed

## Transition, advantages, partners, infrastructure and launcher — 2026-08-20

### Scope and comparison evidence

- Source references: `/private/tmp/pilot-current-ui-audit-20260820/` for the pre-change transition, advantages and partner cards; `/Users/egor/Documents/ChatGPT/ИНВЕСТ ПИЛОТА/tmp/design-iteration2/` for the approved infrastructure and launcher compositions.
- Rendered implementation: `http://127.0.0.1:3000/`.
- Final captures: `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/iteration-2026-08-20/`.
- Normalized side-by-side evidence: `/Users/egor/Documents/ChatGPT/PILOT FINAL SITE/.codex-audit/iteration-2026-08-20/comparisons/`, including desktop and mobile comparisons for the transition, advantages, companies, infrastructure and launcher.
- Responsive coverage: 1440 × 900, 1024 × 768, 768 × 1024, 390 × 844 and 360 × 800. No page-level horizontal overflow was observed.

### Implemented result

- Hero, partner rail and Phygital video retain the approved order. A responsive black fade now softens the Hero exit, the rail borders are reduced to 8% white, the video top is more strongly shaded, and the mobile rail ends with a soft edge mask.
- Advantages are a standalone section with the requested 96 + 1 + 96 px desktop and 64 + 1 + 64 px mobile rhythm. The six cards retain the 3/2/1 responsive grid; their images have no lower border or dark separator. The supplied 1448 × 1086 application art is delivered as an optimized 4:3 WebP without cropping.
- Partner cards use a 72 px optical logo row with the mark on the left and index on the right. Exact official assets are used for ФСП, RUDN University, ВОСВОД, Сколтех and НМИЦ Алмазова. The user-supplied ФВСМ artwork is preserved and its white wordmark/descriptor are deterministically recolored to site black; no generative reconstruction was used.
- The complete Infrastructure block is inserted between Companies and Launcher. Desktop has keyboard-operable tabs and only the active, near-viewport video set mounts. Mobile uses the accordion and posters with no video elements.
- The launcher is the full-width reference composition with monitor and phone, keeps `id="download"`, chooses macOS or Windows as the primary platform, and leaves all controls visible but disabled when a valid HTTPS download URL is absent.

### Interaction and accessibility coverage

- Infrastructure tabs: pointer selection and keyboard `End` navigation verified; the active panel changes correctly.
- Media lifecycle: desktop reports three videos near the active panel and zero after scrolling far away; mobile reports zero videos and displays posters.
- Launcher: the macOS browser receives the macOS primary CTA. Missing URL states remain disabled and communicate unavailable downloads without dead navigation.
- Minimum interactive targets, focus states, reduced-motion behavior and sticky-header offsets were preserved. The development browser surface showed only its Next.js tooling badge; TypeScript, focused ESLint and the production build are the authoritative error checks for this pass.

### Comparison history and findings

1. Initial responsive pass found that Infrastructure media could still mount on mobile. The media gate was changed to require a desktop-width media query as well as near-viewport state.
2. Second pass confirmed zero mobile videos, three active desktop videos near the section, zero videos far away, correct accordion posters and keyboard tab navigation.
3. The earlier P3 gap for ФВСМ is resolved by the user-provided source asset and the exact black-letter treatment requested in this pass.

- Typography, spacing, color tokens, image quality and Russian copy were inspected in the combined comparison sheets.
- No actionable P0, P1 or P2 visual, responsive or interaction findings remain.
- P3 content dependency: real launcher URLs are intentionally absent. Add valid HTTPS values to the documented `NEXT_PUBLIC_PILOT_*_URL` variables when production installers are available.

final result: passed
