const LINK_ID = "ha-google-fonts-link";
const OWN_TAGS = new Set(["ha-google-fonts-dialog", "ha-google-fonts-button"]);

let sharedSheet: CSSStyleSheet | null = null;
let currentFamily: string | undefined;
const adoptedRoots = new WeakSet<ShadowRoot>();

export function applyFont(fontFamily: string | undefined): void {
  currentFamily = fontFamily;
  if (!fontFamily) {
    removeFont();
    return;
  }
  injectFontLink(fontFamily);
  ensureSheet(fontFamily);
  adoptIntoDashboard();
}

export function reapplyToNewRoots(): void {
  if (!currentFamily || !sharedSheet) return;
  adoptIntoDashboard();
}

export function removeFont(): void {
  document.getElementById(LINK_ID)?.remove();
  if (sharedSheet) {
    const sheet = sharedSheet;
    walkAllShadowRoots((root) => {
      if (root.adoptedStyleSheets.includes(sheet)) {
        root.adoptedStyleSheets = root.adoptedStyleSheets.filter((s) => s !== sheet);
      }
    });
    sharedSheet = null;
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
    :host {
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
    * { font-family: ${stack} !important; }
  `;
}

function ensureSheet(family: string): void {
  if (!sharedSheet) sharedSheet = new CSSStyleSheet();
  sharedSheet.replaceSync(buildCss(family));
}

function adoptIntoDashboard(): void {
  if (!sharedSheet) return;
  const viewRoot = findDashboardViewRoot();
  if (!viewRoot) return;
  walkBelow(viewRoot, (root) => {
    if (adoptedRoots.has(root)) return;
    if (!root.adoptedStyleSheets.includes(sharedSheet!)) {
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sharedSheet!];
    }
    adoptedRoots.add(root);
  });
}

function findDashboardViewRoot(): Element | null {
  const ha = document.querySelector("home-assistant");
  if (!ha?.shadowRoot) return null;
  const main = ha.shadowRoot.querySelector("home-assistant-main");
  if (!main?.shadowRoot) return null;
  const resolver = main.shadowRoot.querySelector("partial-panel-resolver");
  const panel = resolver?.querySelector("ha-panel-lovelace") as HTMLElement | null;
  if (!panel?.shadowRoot) return null;
  const huiRoot = panel.shadowRoot.querySelector("hui-root") as HTMLElement | null;
  if (!huiRoot?.shadowRoot) return null;
  // Prefer the view container so the toolbar/header in hui-root stays untouched.
  return (huiRoot.shadowRoot.querySelector("#view, hui-view") ?? huiRoot) as Element;
}

function walkBelow(start: Element, fn: (root: ShadowRoot) => void): void {
  const visited = new WeakSet<ShadowRoot>();

  const walk = (node: Element | ShadowRoot) => {
    if (node instanceof Element && node.shadowRoot && !visited.has(node.shadowRoot)) {
      const tag = node.tagName.toLowerCase();
      if (!OWN_TAGS.has(tag)) {
        visited.add(node.shadowRoot);
        fn(node.shadowRoot);
      }
      walk(node.shadowRoot);
    }
    const children = (node as ParentNode).children;
    if (children) {
      for (const child of Array.from(children)) {
        walk(child);
      }
    }
  };

  walk(start);
}

function walkAllShadowRoots(fn: (root: ShadowRoot) => void): void {
  const visited = new WeakSet<ShadowRoot>();

  const walk = (node: Element | ShadowRoot) => {
    if (node instanceof Element && node.shadowRoot && !visited.has(node.shadowRoot)) {
      visited.add(node.shadowRoot);
      fn(node.shadowRoot);
      walk(node.shadowRoot);
    }
    const children = (node as ParentNode).children;
    if (children) {
      for (const child of Array.from(children)) {
        walk(child);
      }
    }
  };

  walk(document.documentElement);
}
