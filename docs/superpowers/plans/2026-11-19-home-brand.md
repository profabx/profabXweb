# Home content and brand implementation plan

**Goal:** Update the existing homepage using the approved white/blue layout and provided Feishu references.
**Architecture:** Keep App routing and hero image; extract static Home and Brand components, use shared SVG assets and scoped CSS, extend existing locale rows.
**Tech Stack:** React 19, Vite, CSS, SVG.
**Spec:** docs/superpowers/specs/2026-11-19-home-brand-design.md

## Tasks
- [ ] Extract the reference logo silhouette as an SVG and sample its approved blue. Reuse for header/footer/favicon.
- [ ] Update Home: title, service value, five delivery steps, owned FDM/LCD and partner processes, retaining quote links and hero illustration. Add English/Japanese copy.
- [ ] Verify desktop/mobile layout, links, locale switch and admin/public parity in an isolated headless browser. Build both versions and run existing required checks.
- [ ] Mirror changes, update dated changelog, commit/push only website changes, confirm live deployed asset.

## Review focus
Preserve quote calculations and permissions. No confidential internal price/margin/team data goes on the homepage. No unverified numeric specifications. Logo must retain the referenced symbol/outlined wordmark, without substituting a font. Check narrow screens and long translated copy.
