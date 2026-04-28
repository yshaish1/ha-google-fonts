import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Hass } from "./types.js";

@customElement("ha-google-fonts-button")
export class HaGoogleFontsButton extends LitElement {
  @property({ attribute: false }) hass?: Hass;

  render() {
    return html`
      <button title="Dashboard font" @click=${this._open}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13z"/>
        </svg>
      </button>
    `;
  }

  private async _open(): Promise<void> {
    let dialog = document.querySelector("ha-google-fonts-dialog") as
      | (HTMLElement & { open: () => Promise<void>; hass?: Hass })
      | null;
    if (!dialog) {
      dialog = document.createElement("ha-google-fonts-dialog") as HTMLElement & {
        open: () => Promise<void>;
        hass?: Hass;
      };
      document.body.appendChild(dialog);
    }
    dialog.hass = this.hass;
    await dialog.open();
  }

  static styles = css`
    :host {
      position: fixed; right: 16px; bottom: 16px;
      z-index: 1000;
    }
    button {
      width: 40px; height: 40px;
      border-radius: 50%;
      border: none; cursor: pointer;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #444);
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      display: inline-flex; align-items: center; justify-content: center;
      opacity: 0.65; transition: opacity 150ms, transform 150ms;
    }
    button:hover { opacity: 1; transform: scale(1.05); }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-google-fonts-button": HaGoogleFontsButton;
  }
}
