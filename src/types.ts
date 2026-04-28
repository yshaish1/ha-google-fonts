export interface HassConnection {
  sendMessagePromise<R = unknown>(msg: { type: string; [k: string]: unknown }): Promise<R>;
  subscribeEvents(cb: (ev: unknown) => void, eventType: string): Promise<() => void>;
}

export interface Hass {
  connection: HassConnection;
  user?: { id: string; name: string };
}

export interface HomeAssistantElement extends HTMLElement {
  hass?: Hass;
}

export interface UserPrefs {
  fontFamily?: string;
  apiKey?: string;
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
