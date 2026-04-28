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
  try {
    const res = await hass.connection.sendMessagePromise<{ value: UserPrefs | null }>({
      type: "frontend/get_user_data",
      key: USER_DATA_KEY,
    });
    return res.value ?? {};
  } catch {
    return {};
  }
}

export async function savePrefs(hass: Hass, prefs: UserPrefs): Promise<void> {
  await hass.connection.sendMessagePromise({
    type: "frontend/set_user_data",
    key: USER_DATA_KEY,
    value: prefs,
  });
}
