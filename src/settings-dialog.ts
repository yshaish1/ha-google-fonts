import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GoogleFont, Hass, UserPrefs } from "./types.js";
import { loadCatalog, searchFonts, clearCatalogCache } from "./font-catalog.js";
import { loadPrefs, savePrefs, currentDashboardId, dashboardTitle } from "./ha-storage.js";
import { applyFont } from "./font-injector.js";

const PREVIEW_TEXT = "The quick brown fox 0123";

@customElement("ha-google-fonts-dialog")
export class HaGoogleFontsDialog extends LitElement {
  @property({ attribute: false }) hass?: Hass;
  @state() private _open = false;
  @state() private _prefs: UserPrefs = { fonts: {} };
  @state() private _fonts: GoogleFont[] = [];
  @state() private _query = "";
  @state() private _selected: string | undefined;
  @state() private _apiKeyInput = "";
  @state() private _loading = false;
  @state() private _error: string | undefined;
  @state() private _dashId = "";
  private _previewedFamilies = new Set<string>();
  private _io?: IntersectionObserver;

  async open(): Promise<void> {
    if (!this.hass) return;
    this._open = true;
    this._error = undefined;
    this._dashId = currentDashboardId();
    this._prefs = await loadPrefs(this.hass);
    this._selected = this._prefs.fonts?.[this._dashId];
    this._apiKeyInput = this._prefs.apiKey ?? "";
    if (this._prefs.apiKey) await this._fetchCatalog(this._prefs.apiKey);
  }

  close(): void {
    this._open = false;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._io?.disconnect();
    this._io = undefined;
  }

  updated(): void {
    if (!this._open) return;
    const list = this.renderRoot.querySelector(".font-list");
    if (!list) return;
    if (!this._io) {
      this._io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const family = (entry.target as HTMLElement).dataset.family;
            if (family) {
              this._ensurePreviewLoaded(family);
              this._io?.unobserve(entry.target);
            }
          }
        },
        { root: list, rootMargin: "200px 0px" }
      );
    }
    for (const row of list.querySelectorAll<HTMLElement>("li.row")) {
      const family = row.dataset.family;
      if (family && !this._previewedFamilies.has(family)) {
        this._io.observe(row);
      }
    }
  }

  render() {
    if (!this._open) return nothing;
    const dashName = dashboardTitle(this.hass, this._dashId);
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <header>
            <div>
              <h2>Dashboard font</h2>
              <div class="subtitle">for: ${dashName}</div>
            </div>
            <button class="icon" @click=${this.close} title="Close">×</button>
          </header>
          ${!this._prefs.apiKey ? this._renderApiKeyGate() : this._renderPicker()}
          ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
        </div>
      </div>
    `;
  }

  private _renderApiKeyGate() {
    return html`
      <section class="gate">
        <p>This plugin uses the free Google Fonts API. Paste your API key to load the font catalog.</p>
        <ol>
          <li>Open <a href="https://console.cloud.google.com/apis/library/webfonts.googleapis.com" target="_blank" rel="noopener">Google Cloud Console → Web Fonts Developer API</a></li>
          <li>Click <strong>Enable</strong></li>
          <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener">Credentials</a> → <strong>Create credentials → API key</strong></li>
          <li>Paste it below</li>
        </ol>
        <input
          type="text"
          placeholder="AIzaSy..."
          .value=${this._apiKeyInput}
          @input=${(e: InputEvent) => (this._apiKeyInput = (e.target as HTMLInputElement).value)}
        />
        <div class="actions">
          <button class="primary" ?disabled=${this._loading || !this._apiKeyInput} @click=${this._saveApiKey}>
            ${this._loading ? "Loading…" : "Save & Load Fonts"}
          </button>
        </div>
      </section>
    `;
  }

  private _renderPicker() {
    const visible = searchFonts(this._fonts, this._query);
    const current = this._prefs.fonts?.[this._dashId];
    return html`
      <section class="picker">
        <input
          type="search"
          placeholder="Search ${this._fonts.length || "Google"} fonts…"
          .value=${this._query}
          @input=${(e: InputEvent) => (this._query = (e.target as HTMLInputElement).value)}
        />
        <div class="count">
          ${this._loading
            ? "Loading catalog…"
            : `${visible.length} of ${this._fonts.length} fonts`}
        </div>
        <ul class="font-list">
          ${this._loading
            ? html`<li class="muted">Loading catalog…</li>`
            : visible.length === 0
              ? html`<li class="muted">No fonts match "${this._query}"</li>`
              : visible.map((f) => this._renderFontRow(f))}
        </ul>
        <div class="actions">
          <button class="ghost" ?disabled=${!current} @click=${this._reset}>
            Reset to default
          </button>
          <button class="ghost" @click=${this._refreshCatalog} ?disabled=${this._loading}>
            Refresh catalog
          </button>
          <button
            class="primary"
            ?disabled=${!this._selected || this._selected === current}
            @click=${this._apply}
          >
            Apply
          </button>
        </div>
      </section>
    `;
  }

  private _renderFontRow(font: GoogleFont) {
    const checked = this._selected === font.family;
    return html`
      <li
        class=${checked ? "row selected" : "row"}
        data-family=${font.family}
        @click=${() => (this._selected = font.family)}
      >
        <div class="row-name" style="font-family: '${font.family}', sans-serif;">${font.family}</div>
        <div class="row-preview" style="font-family: '${font.family}', sans-serif;">${PREVIEW_TEXT}</div>
      </li>
    `;
  }

  private _ensurePreviewLoaded(family: string): void {
    if (this._previewedFamilies.has(family)) return;
    this._previewedFamilies.add(family);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`;
    link.dataset.haGoogleFontsPreview = "1";
    document.head.appendChild(link);
  }

  private _onOverlayClick = () => this.close();

  private async _saveApiKey(): Promise<void> {
    if (!this.hass) return;
    this._loading = true;
    this._error = undefined;
    try {
      await this._fetchCatalog(this._apiKeyInput);
      this._prefs = { ...this._prefs, apiKey: this._apiKeyInput };
      await savePrefs(this.hass, this._prefs);
    } catch (e) {
      this._error = (e as Error).message;
    } finally {
      this._loading = false;
    }
  }

  private async _fetchCatalog(apiKey: string): Promise<void> {
    this._loading = true;
    try {
      this._fonts = await loadCatalog(apiKey);
    } finally {
      this._loading = false;
    }
  }

  private async _refreshCatalog(): Promise<void> {
    if (!this._prefs.apiKey) return;
    clearCatalogCache();
    this._error = undefined;
    try {
      await this._fetchCatalog(this._prefs.apiKey);
    } catch (e) {
      this._error = (e as Error).message;
    }
  }

  private async _apply(): Promise<void> {
    if (!this.hass || !this._selected) return;
    const fonts = { ...(this._prefs.fonts ?? {}), [this._dashId]: this._selected };
    const next: UserPrefs = { ...this._prefs, fonts };
    await savePrefs(this.hass, next);
    this._prefs = next;
    applyFont(this._selected);
    document.dispatchEvent(
      new CustomEvent("ha-google-fonts:changed", {
        detail: { dashboardId: this._dashId, family: this._selected },
      })
    );
    this.close();
  }

  private async _reset(): Promise<void> {
    if (!this.hass) return;
    const fonts = { ...(this._prefs.fonts ?? {}) };
    delete fonts[this._dashId];
    const next: UserPrefs = { ...this._prefs, fonts };
    await savePrefs(this.hass, next);
    this._prefs = next;
    this._selected = undefined;
    applyFont(undefined);
    document.dispatchEvent(
      new CustomEvent("ha-google-fonts:changed", {
        detail: { dashboardId: this._dashId, family: undefined },
      })
    );
    this.close();
  }

  static styles = css`
    :host { font-family: var(--primary-font-family, sans-serif); }
    .overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
      width: min(560px, 92vw); max-height: 86vh;
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.4);
      display: flex; flex-direction: column; overflow: hidden;
    }
    header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 1px solid var(--divider-color, #e0e0e0);
      gap: 12px;
    }
    h2 { margin: 0; font-size: 18px; font-weight: 500; }
    .subtitle { font-size: 12px; color: var(--secondary-text-color, #555); margin-top: 2px; }
    .icon {
      background: none; border: none; font-size: 24px; cursor: pointer;
      color: var(--secondary-text-color, #555); padding: 0 4px;
    }
    section { padding: 16px 20px; overflow-y: auto; }
    .gate p { margin: 0 0 12px; color: var(--secondary-text-color, #555); }
    .gate ol { padding-left: 20px; line-height: 1.6; color: var(--secondary-text-color, #555); }
    .gate a { color: var(--primary-color, #03a9f4); }
    input[type="text"], input[type="search"] {
      width: 100%; box-sizing: border-box;
      padding: 10px 12px; font-size: 14px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #000);
      margin-bottom: 12px;
    }
    .count {
      font-size: 12px; color: var(--secondary-text-color, #555);
      margin: -6px 0 8px; text-align: right;
    }
    .font-list {
      list-style: none; padding: 0; margin: 0 0 12px;
      height: 60vh; max-height: 60vh; overflow-y: auto;
      border: 1px solid var(--divider-color, #e0e0e0); border-radius: 8px;
      contain: content;
    }
    .row {
      padding: 10px 14px; cursor: pointer;
      border-bottom: 1px solid var(--divider-color, #f0f0f0);
      transition: background 120ms;
      contain: layout paint;
    }
    .row:last-child { border-bottom: none; }
    .row:hover { background: var(--secondary-background-color, #f5f5f5); }
    .row.selected { background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent); }
    .row-name { font-size: 16px; font-weight: 500; }
    .row-preview { font-size: 13px; color: var(--secondary-text-color, #555); margin-top: 2px; }
    .muted { padding: 16px; color: var(--secondary-text-color, #555); text-align: center; }
    .actions {
      display: flex; gap: 8px; justify-content: flex-end;
      padding-top: 4px; flex-wrap: wrap;
    }
    button.primary, button.ghost {
      padding: 8px 16px; border-radius: 8px; cursor: pointer;
      font-size: 14px; font-weight: 500; border: none;
    }
    button.primary {
      background: var(--primary-color, #03a9f4); color: var(--text-primary-color, #fff);
    }
    button.primary:disabled { opacity: 0.5; cursor: not-allowed; }
    button.ghost {
      background: transparent; color: var(--primary-text-color, #000);
      border: 1px solid var(--divider-color, #ccc);
    }
    button.ghost:disabled { opacity: 0.5; cursor: not-allowed; }
    .error {
      margin: 0 20px 16px; padding: 10px 12px;
      background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent);
      color: var(--error-color, #db4437);
      border-radius: 8px; font-size: 13px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-google-fonts-dialog": HaGoogleFontsDialog;
  }
}
