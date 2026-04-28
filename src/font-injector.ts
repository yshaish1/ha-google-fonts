const STYLE_ID = "ha-google-fonts-style";
const LINK_ID = "ha-google-fonts-link";

let sharedSheet: CSSStyleSheet | null = null;
let currentFamily: string | undefined;

export function applyFont(fontFamily: string | undefined): void {
  currentFamily = fontFamily;
  if (!fontFamily) {
    removeFont();
    return;
  }
  injectFontLink(fontFamily);
  applyStyles(fontFamily);
}

export function reapplyToNewRoots(): void {
  if (!currentFamily) return;
  applyStyles(currentFamily);
}

export function removeFont(): void {
  document.getElementById(LINK_ID)?.remove();
  document.getElementById(STYLE_ID)?.remove();
  if (sharedSheet) {
    forEachShadowRoot((root) => {
      root.adoptedStyleSheets = root.adoptedStyleSheets.filter((s) => s !== sharedSheet);
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
    * { font-family: ${stack} !important; }
  `;
}

function applyStyles(family: string): void {
  const css = buildCss(family);

  if (!sharedSheet) {
    if ("adoptedStyleSheets" in Document.prototype) {
      sharedSheet = new CSSStyleSheet();
    }
  }
  if (sharedSheet) {
    sharedSheet.replaceSync(css);
  }

  upsertDocStyle(css);

  forEachShadowRoot((root) => {
    if (sharedSheet && !root.adoptedStyleSheets.includes(sharedSheet)) {
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sharedSheet];
    } else if (!sharedSheet) {
      upsertStyleInRoot(root, css);
    }
  });
}

function upsertDocStyle(css: string): void {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
}

function upsertStyleInRoot(root: ShadowRoot, css: string): void {
  let style = root.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    root.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
}

function forEachShadowRoot(fn: (root: ShadowRoot) => void): void {
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
