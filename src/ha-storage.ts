import type { Hass, HomeAssistantElement, UserPrefs } from "./types.js";

const USER_DATA_KEY = "ha_google_fonts";

export async function waitForHass(timeoutMs = 30000): Promise<Hass> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const el = document.querySelector("home-assistant") as HomeAssistantElement | null;
    if (el?.hass?.connection) return el.hass;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error("ha-google-fonts: hass not ready after 30s");
}

export async function loadPrefs(hass: Hass): Promise<UserPrefs> {
  let raw: UserPrefs | null = null;
  try {
    const res = await hass.connection.sendMessagePromise<{ value: UserPrefs | null }>({
      type: "frontend/get_user_data",
      key: USER_DATA_KEY,
    });
    raw = res.value;
  } catch {
    return { fonts: {} };
  }
  if (!raw) return { fonts: {} };

  // Migrate <0.2.0 shape: { fontFamily, apiKey } -> { apiKey, fonts: { [currentDashboard]: fontFamily } }
  if (raw.fontFamily && !raw.fonts) {
    const migrated: UserPrefs = {
      apiKey: raw.apiKey,
      fonts: { [currentDashboardId()]: raw.fontFamily },
    };
    try {
      await savePrefs(hass, migrated);
    } catch {
      // best-effort; the in-memory shape is still correct
    }
    return migrated;
  }

  return { apiKey: raw.apiKey, fonts: raw.fonts ?? {} };
}

export async function savePrefs(hass: Hass, prefs: UserPrefs): Promise<void> {
  const stripped: UserPrefs = { apiKey: prefs.apiKey, fonts: prefs.fonts ?? {} };
  await hass.connection.sendMessagePromise({
    type: "frontend/set_user_data",
    key: USER_DATA_KEY,
    value: stripped,
  });
}

export function currentDashboardId(): string {
  const segments = window.location.pathname.split("/").filter(Boolean);
  return segments[0] ?? "lovelace";
}

export function isOnDashboard(): boolean {
  // Heuristic: dashboards live under url paths registered as panels of component_name 'lovelace'.
  // Simpler check: not on the obvious non-dashboard panels.
  const id = currentDashboardId();
  return !["config", "developer-tools", "history", "logbook", "map", "media-browser", "todo", "calendar", "energy", "profile"].includes(id);
}

export function dashboardTitle(hass: Hass | undefined, id: string): string {
  const panel = hass?.panels?.[id];
  if (panel?.title) return panel.title;
  return id === "lovelace" ? "Overview" : id;
}
