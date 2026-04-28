import "./settings-dialog.js";
import "./floating-button.js";
import { waitForHass, loadPrefs } from "./ha-storage.js";
import { applyFont, reapplyToNewRoots } from "./font-injector.js";
import type { Hass } from "./types.js";

const VERSION = "0.1.2";

declare global {
  interface Window {
    __haGoogleFontsBooted?: boolean;
  }
}

function logBanner(): void {
  // eslint-disable-next-line no-console
  console.info(
    `%c HA-GOOGLE-FONTS %c v${VERSION} `,
    "color:#fff;background:#03a9f4;font-weight:700;border-radius:3px 0 0 3px;padding:2px 4px;",
    "color:#03a9f4;background:#fff;border:1px solid #03a9f4;border-radius:0 3px 3px 0;padding:2px 4px;"
  );
}

async function boot(): Promise<void> {
  if (window.__haGoogleFontsBooted) return;
  window.__haGoogleFontsBooted = true;
  logBanner();

  const hass = await waitForHass();
  const prefs = await loadPrefs(hass);
  applyFont(prefs.fontFamily);

  mountFloatingButton(hass);
  watchForReinjection(prefs.fontFamily);
}

function mountFloatingButton(hass: Hass): void {
  if (document.querySelector("ha-google-fonts-button")) return;
  const btn = document.createElement("ha-google-fonts-button") as HTMLElement & { hass?: Hass };
  btn.hass = hass;
  document.body.appendChild(btn);
}

function watchForReinjection(_initialFamily: string | undefined): void {
  let scheduled = false;

  const reapply = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      reapplyToNewRoots();
    });
  };

  window.addEventListener("location-changed", reapply);
  window.addEventListener("popstate", reapply);

  // Each new card mount creates fresh shadow roots; re-walk and adopt the shared
  // stylesheet into them. Coalesced via rAF so a burst of mutations runs the walker once.
  const observer = new MutationObserver(reapply);
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
