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
    }

    main {
      flex-grow: 1;
      background: #f4f4f4;
      padding: 20px;

    }

    .card-container {
      display: flex;
      gap: 20px;
      margin: 10px;
      justify-content: center;
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
      opacity:80%;
    }

    .card:hover {
      transform: scale(1.025);
      transition: 0.3s ease-in-out;
      opacity:100%;
    }

    .card img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-top: 10px;
    }

    
  `;

  private selectSystem(system: string) {
    this.selectedSystem = system;
  }

  render() {
    return html`
      <header>Dashboard</header>
      <main>
      ${this.selectedSystem === null ? html`
        <div class="card-container">
          <div class="card" @click="${() => this.selectSystem('user-management')}">
            User Management System
            <img src="./src/photos/4393.jpg" alt="User Management Image">
          </div>
          <div class="card"  @click="${() => this.selectSystem('product-management')}">
            Product Management System
            <img src="./src/photos/1329.webp" alt="Product Management Image">
          </div>
        </div>
        ` : this.renderSystemDetails()}
      </main>
      <footer>Footer</footer>
    `;
  }

  private renderSystemDetails() {
    if (this.selectedSystem === 'user-management') {
      return html`<user-management @back="${() => this.selectedSystem = null}"></user-management>`;
    } else if (this.selectedSystem === 'product-management') {
      return html`<product-management @back="${() => this.selectedSystem = null}"></product-management>`;
    }
    return html``;
  }
}
