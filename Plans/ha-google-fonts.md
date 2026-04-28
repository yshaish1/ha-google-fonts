# ha-google-fonts

## Goal
Ship a HACS-distributable Lovelace frontend plugin that lets each Home Assistant user pick any Google Font and apply it across the entire Lovelace dashboard. Configuration happens via a floating gear button on the dashboard with a searchable, live-preview font picker. Per-user persistence via HA's `frontend.set_user_data`. Fonts are loaded on demand from `fonts.googleapis.com`.

## Context / Constraints
- **Type:** HACS Frontend plugin (single JS module, no Python).
- **Repo / package name:** `ha-google-fonts`. Bundle output: `dist/ha-google-fonts.js` (HACS plugin filename rule: filename must match repo name, look in `/dist/` first).
- **Distribution:** Public GitHub repo, installed via HACS → Frontend → Custom repositories (no HACS default submission for v1).
- **Scope:** Lovelace dashboard cards/views only. Sidebar/header/settings pages are explicitly out of scope.
- **Per-user, not global.** No admin-wide override in v1.
- **Font properties:** family only. No weight/size/per-element overrides in v1.
- **Font picker:** searchable dropdown of the full Google Fonts catalog (~1700 fonts) with live preview rows.
- **API key:** required. User supplies their own via the settings dialog. README includes a 60-second walkthrough for getting one (Google Cloud Console → Web Fonts Developer API → create key, free, no billing).
- **Loading:** standard Google Fonts CSS link (`https://fonts.googleapis.com/css2?family=...`). No self-hosting in v1.
- **Test environment:** user has HA OS / Supervised running, will install via HACS Custom repository.
- **Code stance (per user prefs):** clean, minimal, efficient. Verify build runs after every change. Plan architecture before coding. No em dashes. No native alerts.

## Architecture

### File layout
```
ha-google-fonts/
├── hacs.json
├── package.json
├── tsconfig.json
├── rollup.config.mjs
├── README.md
├── src/
│   ├── ha-google-fonts.ts       (entry: registers customCards card + bootstrap injector)
│   ├── font-catalog.ts          (Google Fonts API loader + localStorage cache)
│   ├── font-injector.ts         (writes <link> + <style> into document.head and shadow DOMs)
│   ├── settings-dialog.ts       (Lit modal: API key, search, preview, apply)
│   ├── floating-button.ts       (gear button anchored to ha-panel-lovelace)
│   ├── ha-storage.ts            (frontend.get_user_data / set_user_data WS wrapper)
│   └── styles.ts                (HA-themed CSS variables)
└── dist/
    └── ha-google-fonts.js       (built artifact, committed for HACS)
```

### Runtime flow
1. **Load:** module imported as Lovelace resource. On `DOMContentLoaded`:
   - Wait for `home-assistant` element (HA's root) and grab `hass.connection`.
   - Read `frontend.get_user_data(key='ha_google_fonts')` → `{ fontFamily, apiKey }`.
   - If `fontFamily` set, run injector immediately.
2. **Inject:** append `<link rel="stylesheet">` for the chosen font to `document.head`. Inject a `<style>` block setting `--primary-font-family` and `font-family` on:
   - `:root`
   - inside `home-assistant-main` shadow root
   - inside `ha-panel-lovelace` → `hui-root` shadow root
   The shadow-DOM walk is needed because HA uses native shadow roots that don't inherit `document` styles for some properties.
3. **Re-apply on navigation:** subscribe to HA's `location-changed` event (or `popstate`) to re-run injector when the user opens a different dashboard.
4. **Floating button:** on first paint of `ha-panel-lovelace`, attach a small gear button (position: fixed, bottom-right, low z-index so it doesn't fight `more-info` dialogs).
5. **Settings dialog:** Lit-based modal:
   - First-run: prompt for Google Fonts API key, store in user_data.
   - Search box → filters cached catalog client-side.
   - Preview rows render each font name in its own font (lazy-load `<link>` per visible row).
   - Apply → writes `{ fontFamily }` to user_data, re-runs injector, closes.

### HA APIs used
- `customElements.define()` — register the floating button + dialog as web components.
- `hass.connection.sendMessagePromise({ type: 'frontend/get_user_data', key })` and `frontend/set_user_data` — per-user persistence (no backend code needed).
- DOM walk into shadow roots to set styles where `document.head` doesn't reach.

### Out of scope for v1 (potential v0.2+)
- Self-hosting fonts on HA for offline/privacy.
- Sidebar / settings pages / dialogs scope.
- Font weight, size scale, per-element overrides.
- Admin-wide global default.

## Steps
- [ ] **1. Scaffold project + tooling** — npm init, install lit + typescript + rollup, build script outputs single `dist/ha-google-fonts.js`. Add tsconfig, .gitignore.
- [ ] **2. Write hacs.json + manifest** — root manifest with name, filename, render_readme, min HA version.
- [ ] **3. Build font catalog loader** — Google Fonts API fetch + 24h localStorage cache + search.
- [ ] **4. Implement global font injector** — `<link>` + `<style>` injection into document head and target shadow DOMs; re-apply on nav.
- [ ] **5. Build settings dialog (Lit)** — floating gear button + modal with API key input, searchable list, live preview, apply.
- [ ] **6. Walk through Google Cloud API key flow** — README section + screenshots.
- [ ] **7. Write README + screenshots** — install instructions, scope, troubleshooting.
- [ ] **8. Test on user's HA OS instance** — push to GitHub, install via HACS Custom repo, verify font applies, persists, per-user.
- [ ] **9. Tag v0.1.0 release on GitHub** — commit dist/, GitHub release with semver tag.

## Status
Phase 0 (planning) complete. Ready to begin Step 1.

## Resolved
- GitHub user: `yshaish1` (gh CLI auth) → `github.com/yshaish1/ha-google-fonts`.
- License: MIT.
- First install: do not apply any font until user picks one. Dashboard looks identical to stock HA on fresh install.

## Open questions
_(none)_
