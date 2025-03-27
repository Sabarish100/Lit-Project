import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('success-popup')
export class SuccessPopup extends LitElement {
  static styles = css`
    .popup {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #4CAF50;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      animation: fadeOut 2s ease-in-out;
    }
    @keyframes fadeOut {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;

  render() {
    return html`<div class="popup">User added successfully!</div>`;
  }
}

