import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './User-Management';
import './Product-Management';

@customElement('my-dashboard')
export class Dashboard extends LitElement {
  @property() private selectedSystem: string | null = null;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      gap: 10px;
      text-align: center;
      font-family: Arial, sans-serif;
    }

    header, footer {
      background: #333;
      color: white;
      padding: 20px;
      font-size: 20px;
      font-weight: bold;
    }

    main {
      flex-grow: 1;
      background: #f4f4f4;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-container {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 20rem;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      opacity: 0.8;
      transition: transform 0.3s ease-in-out, opacity 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
    }

    .card:hover {
      transform: scale(1.05);
      opacity: 1;
    }

    .card img {
      width: 100%;
      border-radius: 8px;
      margin-top: 10px;
    }
  `;

  private systems = [
    { key: 'user-management', label: 'User Management System', img: './src/photos/4393.jpg' },
    { key: 'product-management', label: 'Product Management System', img: './src/photos/1329.webp' }
  ];

  render() {
    return html`
      <header>Dashboard</header>
      <main>
        ${this.selectedSystem === 'user-management'
          ? html`<user-management @back="${this.resetSelection}"></user-management>`
          : this.selectedSystem === 'product-management'
          ? html`<product-management @back="${this.resetSelection}"></product-management>`
          : this.renderSelection()}
      </main>
      <footer>Footer</footer>
    `;
  }

  private renderSelection() {
    return html`
      <div class="card-container">
        ${this.systems.map(
          ({ key, label, img }) => html`
            <div class="card" @click="${() => (this.selectedSystem = key)}">
              ${label}
              <img src="${img}" alt="${label}">
            </div>
          `
        )}
      </div>
    `;
  }

  private resetSelection() {
    this.selectedSystem = null;
  }
}
