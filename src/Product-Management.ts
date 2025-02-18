import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('product-management')
export class ProductManagement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h2 {
      margin-bottom: 20px;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      background: white;
      padding: 10px;
      margin: 5px 0;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    button {
      margin-top: 20px;
      padding: 10px 15px;
      border: none;
      background: #007bff;
      color: white;
      cursor: pointer;
      border-radius: 5px;
    }

    button:hover {
      background: #0056b3;
    }
  `;

  render() {
    return html`
      <h2>Product Management System</h2>
      <ul>
        <li>Add Product</li>
        <li>Delete Product</li>
        <li>Display All Products</li>
      </ul>
      <button @click="${this.goBack}">Back</button>
    `;
  }

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }
}
