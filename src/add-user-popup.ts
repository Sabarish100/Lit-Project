import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { User } from "./types";

@customElement("add-user-popup")
export class AddUserPopup extends LitElement {
  @property({ type: Boolean }) showPopup = false;
  @property({ type: Boolean }) showSuccessPopup = false;
  @property() firstName = "";
  @property() lastName = "";
  @property() email = "";
  @property() phone = "";
  @property() role = "User";
  @property() avatar = "";
  @property() errors: Record<string, string> = {};

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
    input, select, button {
      width: 80%;
      padding: 8px;
      margin: 5px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    button {
      cursor: pointer;
    }
    .add-btn { background: #28a745; color: white; }
    .cancel-btn { background: #dc3545; color: white; }
    .error { color: red; font-size: 12px; }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
    .success-popup {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #4CAF50;
      color: white;
      padding: 10px;
      border-radius: 5px;
      animation: fadeOut 2s ease-in-out;
    }
    @keyframes fadeOut {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
    .avatar-preview {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      margin: 10px auto;
    }
  `;

  validateForm(): boolean {
    this.errors = {
      ...(this.firstName.trim() ? {} : { firstName: "First Name is required" }),
      ...(this.lastName.trim() ? {} : { lastName: "Last Name is required" }),
      ...(/\S+@\S+\.\S+/.test(this.email) ? {} : { email: "Valid Email is required" }),
      ...(/^\d{10,}$/.test(this.phone) ? {} : { phone: "Valid Phone number is required" })
    };
    this.requestUpdate();
    return !Object.keys(this.errors).length;
  }

  handleAddUser() {
    if (!this.validateForm()) return;
    const newUser: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: `${this.firstName.toLowerCase()}${this.lastName.toLowerCase()}`,
      email: this.email,
      phone: this.phone,
      role: this.role,
      image: this.avatar || "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    };
    this.dispatchEvent(new CustomEvent("user-added", { detail: { user: newUser }, bubbles: true, composed: true }));
    this.showSuccessPopup = true;
    setTimeout(() => this.showSuccessPopup = false, 3000);
    this.closePopup();
  }

  handleAvatarUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => { this.avatar = reader.result as string; this.requestUpdate(); };
      reader.readAsDataURL(file);
    } else {
      this.errors.avatar = "Only image files are allowed.";
      this.requestUpdate();
    }
  }

  closePopup() {
    this.showPopup = false;
    this.avatar = "";
    this.dispatchEvent(new CustomEvent("close-popup", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      ${this.showSuccessPopup ? html`<div class="success-popup">User added successfully!</div>` : ""}
      ${this.showPopup ? html`
        <div class="overlay" @click="${this.closePopup}"></div>
        <div class="popup">
          <h3>Add New User</h3>
          <input type="text" placeholder="First Name" @input="${(e: any) => this.firstName = e.target.value}" />
          ${this.errors.firstName ? html`<div class="error">${this.errors.firstName}</div>` : ""}
          <input type="text" placeholder="Last Name" @input="${(e: any) => this.lastName = e.target.value}" />
          ${this.errors.lastName ? html`<div class="error">${this.errors.lastName}</div>` : ""}
          <input type="email" placeholder="Email" @input="${(e: any) => this.email = e.target.value}" />
          ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ""}
          <input type="tel" placeholder="Phone" @input="${(e: any) => this.phone = e.target.value}" />
          ${this.errors.phone ? html`<div class="error">${this.errors.phone}</div>` : ""}
          <input type="file" accept="image/*" @change="${this.handleAvatarUpload}" />
          ${this.errors.avatar ? html`<div class="error">${this.errors.avatar}</div>` : ""}
          ${this.avatar ? html`<img src="${this.avatar}" class="avatar-preview" />` : ""}
          <select @change="${(e: any) => this.role = e.target.value}">
            <option value="User">User</option>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
          </select>
          <button class="add-btn" @click="${this.handleAddUser}">Add User</button>
          <button class="cancel-btn" @click="${this.closePopup}">Cancel</button>
        </div>
      ` : ""}
    `;
  }
}