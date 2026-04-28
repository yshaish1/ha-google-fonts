import type { GoogleFont, GoogleFontsCatalog } from "./types.js";

const CACHE_KEY = "ha_google_fonts_catalog";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const ENDPOINT = "https://www.googleapis.com/webfonts/v1/webfonts";

export async function loadCatalog(apiKey: string, force = false): Promise<GoogleFont[]> {
  if (!force) {
    const cached = readCache();
    if (cached) return cached.items;
  }
  const url = `${ENDPOINT}?key=${encodeURIComponent(apiKey)}&sort=popularity`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Fonts API error ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { items: GoogleFont[] };
  const items = data.items.map((f) => ({
    family: f.family,
    category: f.category,
    variants: f.variants,
    subsets: f.subsets,
  }));
  writeCache({ fetchedAt: Date.now(), items });
  return items;
}

export function searchFonts(items: GoogleFont[], query: string, limit = 50): GoogleFont[] {
  const q = query.trim().toLowerCase();
  if (!q) return items.slice(0, limit);
  return items.filter((f) => f.family.toLowerCase().includes(q)).slice(0, limit);
}

function readCache(): GoogleFontsCatalog | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GoogleFontsCatalog;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(catalog: GoogleFontsCatalog): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(catalog));
  } catch {
    // localStorage full or unavailable; non-fatal
  }
}

export function clearCatalogCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // non-fatal
  }
}
