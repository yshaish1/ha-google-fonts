const STYLE_ID = "ha-google-fonts-style";
const LINK_ID = "ha-google-fonts-link";

export function applyFont(fontFamily: string | undefined): void {
  if (!fontFamily) {
    removeFont();
    return;
  }
  injectFontLink(fontFamily);
  injectStyles(fontFamily);
}

export function removeFont(): void {
  document.getElementById(LINK_ID)?.remove();
  document.getElementById(STYLE_ID)?.remove();
  for (const root of collectShadowRoots()) {
    root.getElementById(STYLE_ID)?.remove();
  }
}

function injectFontLink(family: string): void {
  const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@300;400;500;600;700&display=swap`;
  let link = document.getElementById(LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = LINK_ID;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.href !== href) link.href = href;
}

function buildCss(family: string): string {
  const stack = `"${family}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
  return `
    :root, :host {
      --paper-font-common-base_-_font-family: ${stack} !important;
      --paper-font-body1_-_font-family: ${stack} !important;
      --paper-font-subhead_-_font-family: ${stack} !important;
      --paper-font-headline_-_font-family: ${stack} !important;
      --paper-font-title_-_font-family: ${stack} !important;
      --paper-font-caption_-_font-family: ${stack} !important;
      --primary-font-family: ${stack} !important;
      --mdc-typography-font-family: ${stack} !important;
      --ha-card-header-font-family: ${stack} !important;
    }
    ha-panel-lovelace, hui-root, hui-view, hui-section,
    ha-card, .card-header, .card-content,
    ha-card *, .ha-card *,
    hui-grid-card, hui-vertical-stack-card, hui-horizontal-stack-card {
      font-family: ${stack} !important;
    }
  `;
}

function injectStyles(family: string): void {
  const css = buildCss(family);
  upsertStyle(document.head, css);
  for (const root of collectShadowRoots()) {
    upsertStyle(root, css);
  }
}

function upsertStyle(parent: Document | ShadowRoot | HTMLElement, css: string): void {
  const root = parent as { getElementById?: (id: string) => HTMLElement | null };
  const existing = root.getElementById?.(STYLE_ID) as HTMLStyleElement | null | undefined;
  if (existing) {
    if (existing.textContent !== css) existing.textContent = css;
    return;
  }
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  (parent as Node).appendChild(style);
}

function collectShadowRoots(): ShadowRoot[] {
  const roots: ShadowRoot[] = [];
  const ha = document.querySelector("home-assistant");
  if (!ha?.shadowRoot) return roots;
  roots.push(ha.shadowRoot);

  const main = ha.shadowRoot.querySelector("home-assistant-main");
  if (main?.shadowRoot) {
    roots.push(main.shadowRoot);
    const resolver = main.shadowRoot.querySelector("partial-panel-resolver");
    const lovelace = resolver?.querySelector("ha-panel-lovelace") as HTMLElement | null;
    if (lovelace?.shadowRoot) {
      roots.push(lovelace.shadowRoot);
      const huiRoot = lovelace.shadowRoot.querySelector("hui-root") as HTMLElement | null;
      if (huiRoot?.shadowRoot) roots.push(huiRoot.shadowRoot);
    }
  }
  return roots;
}
