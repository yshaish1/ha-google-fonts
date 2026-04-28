export interface HassConnection {
  sendMessagePromise<R = unknown>(msg: { type: string; [k: string]: unknown }): Promise<R>;
  subscribeEvents(cb: (ev: unknown) => void, eventType: string): Promise<() => void>;
}

export interface HassPanel {
  url_path: string;
  title?: string | null;
  component_name?: string;
}

export interface Hass {
  connection: HassConnection;
  user?: { id: string; name: string };
  panels?: Record<string, HassPanel>;
}

export interface HomeAssistantElement extends HTMLElement {
  hass?: Hass;
}

export interface UserPrefs {
  apiKey?: string;
  fonts?: Record<string, string>;
  /** @deprecated retained only for migration from <0.2.0 */
  fontFamily?: string;
}

export interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
}

export interface GoogleFontsCatalog {
  fetchedAt: number;
  items: GoogleFont[];
}
