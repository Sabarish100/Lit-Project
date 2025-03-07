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
      justify-content: center;
      user-select: none;
    }

    .card:hover, .card:focus {
      transform: scale(1.05);
      opacity: 1;
    }

    .card img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-top: 10px;
    }

    .card[role="button"] {
      outline: none;
    }

    footer {
      font-size: 16px;
    }
  `;

  render() {
    return html`
      <header>Dashboard</header>
      <main>
        ${this.selectedSystem === null 
          ? this.renderSelection() 
          : this.renderSystemDetails()}
      </main>
      <footer>Footer</footer>
    `;
  }

  private renderSelection() {
    return html`
      <div class="card-container">
        <div 
          class="card" 
          role="button" 
          tabindex="0" 
          @click="${this.selectUserManagement}" 
          @keydown="${this.handleKeydown}">
          User Management System
          <img src="./src/photos/4393.jpg" alt="User Management">
        </div>
        <div 
          class="card" 
          role="button" 
          tabindex="0" 
          @click="${this.selectProductManagement}" 
          @keydown="${this.handleKeydown}">
          Product Management System
          <img src="./src/photos/1329.webp" alt="Product Management">
        </div>
      </div>
    `;
  }

  private renderSystemDetails() {
    return this.selectedSystem === 'user-management'
      ? html`<user-management @back="${this.resetSelection}"></user-management>`
      : html`<product-management @back="${this.resetSelection}"></product-management>`;
  }

  private resetSelection() {
    this.selectedSystem = null;
  }

  private selectUserManagement() {
    this.selectedSystem = 'user-management';
  }

  private selectProductManagement() {
    this.selectedSystem = 'product-management';
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      (event.currentTarget as HTMLElement).click();
    }
  }
}
