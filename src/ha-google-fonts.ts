import "./settings-dialog.js";
import "./floating-button.js";
import { waitForHass, loadPrefs, currentDashboardId, isOnDashboard } from "./ha-storage.js";
import { applyFont, reapplyToNewRoots } from "./font-injector.js";
import type { Hass, UserPrefs } from "./types.js";

const VERSION = "0.2.0";

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

interface ButtonElement extends HTMLElement {
  hass?: Hass;
  active: boolean;
  hidden: boolean;
}

async function boot(): Promise<void> {
  if (window.__haGoogleFontsBooted) return;
  window.__haGoogleFontsBooted = true;
  logBanner();

  const hass = await waitForHass();
  const prefs = await loadPrefs(hass);

  const button = mountFloatingButton(hass);

  const sync = () => {
    const id = currentDashboardId();
    const family = prefs.fonts?.[id];
    applyFont(family);
    button.active = Boolean(family);
    button.hidden = !isOnDashboard();
  };

  sync();
  watchForReinjection(prefs, sync);
}

function mountFloatingButton(hass: Hass): ButtonElement {
  let btn = document.querySelector("ha-google-fonts-button") as ButtonElement | null;
  if (!btn) {
    btn = document.createElement("ha-google-fonts-button") as ButtonElement;
    document.body.appendChild(btn);
  }
  btn.hass = hass;
  return btn;
}

function watchForReinjection(prefs: UserPrefs, sync: () => void): void {
  let scheduled = false;

  const onMutation = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      reapplyToNewRoots();
    });
  };

  const onNav = () => {
    sync();
  };

  window.addEventListener("location-changed", onNav);
  window.addEventListener("popstate", onNav);

  // ha-google-fonts:changed fires from the dialog when user applies/resets.
  // detail: { dashboardId, family }
  document.addEventListener("ha-google-fonts:changed", (e: Event) => {
    const detail = (e as CustomEvent<{ dashboardId: string; family: string | undefined }>).detail;
    prefs.fonts = { ...(prefs.fonts ?? {}) };
    if (detail.family) prefs.fonts[detail.dashboardId] = detail.family;
    else delete prefs.fonts[detail.dashboardId];
    sync();
  });

  const observer = new MutationObserver(onMutation);
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
