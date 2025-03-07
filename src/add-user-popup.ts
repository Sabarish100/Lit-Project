import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { User } from "./types";

@customElement("add-user-popup")
export class AddUserPopup extends LitElement {
  @property({ type: Boolean }) showPopup = false;

  @state() firstName = "";
  @state() lastName = "";
  @state() email = "";
  @state() phone = "";
  @state() role = "User"; // Default role

  @state() errors: { [key: string]: string } = {}; // Object to store validation errors

  static styles = css`
    .popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      width: 300px;
      z-index: 1000;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
    input, select {
      width: 100%;
      padding: 8px;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      padding: 10px;
      margin: 5px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
    .add-btn {
      background: #28a745;
      color: white;
    }
    .cancel-btn {
      background: #dc3545;
      color: white;
    }
    .error {
      color: red;
      font-size: 12px;
      margin-top: -5px;
      text-align: left;
    }

    
  `;

  private validateForm() {
    this.errors = {};

    if (!this.firstName.trim()) {
      this.errors.firstName = "First Name is required";
    }

    if (!this.lastName.trim()) {
      this.errors.lastName = "Last Name is required";
    }

    if (!this.email.trim()) {
      this.errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errors.email = "Invalid email format";
    }

    if (!this.phone.trim()) {
      this.errors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(this.phone)) {
      this.errors.phone = "Phone number must be at least 10 digits";
    }

    return Object.keys(this.errors).length === 0;
  }

  private handleAddUser() {
    if (!this.validateForm()) {
      this.requestUpdate(); // Re-render component to show errors
      return;
    }

    const newUser: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.firstName.toLowerCase() + this.lastName.toLowerCase(),
      email: this.email,
      phone: this.phone,
      role: this.role, // Get selected role
      image: "https://via.placeholder.com/40",
    };

    this.dispatchEvent(new CustomEvent("user-added", { detail: { user: newUser }, bubbles: true, composed: true }));
    this.closePopup();
  }

  private closePopup() {
    this.dispatchEvent(new CustomEvent("close-popup", { bubbles: true, composed: true }));
  }

  render() {
    if (!this.showPopup) return html``;

    return html`
      <div class="overlay" @click="${this.closePopup}"></div>
      <div class="popup">
        <h3>Add New User</h3>

        <input type="text" placeholder="First Name" 
          @input="${(e: any) => (this.firstName = e.target.value)}" />
        ${this.errors.firstName ? html`<div class="error">${this.errors.firstName}</div>` : ""}

        <input type="text" placeholder="Last Name" 
          @input="${(e: any) => (this.lastName = e.target.value)}" />
        ${this.errors.lastName ? html`<div class="error">${this.errors.lastName}</div>` : ""}

        <input type="email" placeholder="Email" 
          @input="${(e: any) => (this.email = e.target.value)}" />
        ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ""}

        <input type="tel" placeholder="Phone" 
          @input="${(e: any) => (this.phone = e.target.value)}" />
        ${this.errors.phone ? html`<div class="error">${this.errors.phone}</div>` : ""}

        <select @change="${(e: any) => (this.role = e.target.value)}">
          <option value="User" selected>User</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>

        <button class="add-btn" @click="${this.handleAddUser}">Add User</button>
        <button class="cancel-btn" @click="${this.closePopup}">Cancel</button>
      </div>
    `;
  }
}
