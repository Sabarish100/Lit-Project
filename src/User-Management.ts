import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./user-table";
import "./add-user-popup";
import { User } from "./types";

@customElement("user-management")
export class UserManagement extends LitElement {
  @property() users: User[] = [];
  @property() showPopup: boolean = false;

  static styles = css`
    :host {
      align-items: center;
      font-family: Arial, sans-serif;
    }
    .container {
      width: 80%;
      margin: auto;
      text-align: center;
      position: relative;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .add-user-btn, .back-btn {
      background: #28a745;
      color: white;
      padding: 8px 12px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      transition: background 0.3s;
    }
    .add-user-btn:hover {
      background: #218838;
    }
    .back-btn {
      background: #dc3545;
    }
    .back-btn:hover {
      background: #c82333;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchUsers();
  }

  async fetchUsers(): Promise<void> {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      this.users = data.users.map(
        (user: any): User => ({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role || "User",
          image: user.image || "https://via.placeholder.com/40",
        })
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  private handleUserAdded(event: CustomEvent) {
    this.users = [...this.users, event.detail.user];
    this.closePopup();
  }

  private openPopup() {
    this.showPopup = true;
    this.requestUpdate(); // Ensure reactivity updates
  }

  private closePopup() {
    this.showPopup = false;
    this.requestUpdate();
  }

  private goBack() {
    this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="container">
        <div class="top-bar">
          <button class="back-btn" @click="${this.goBack}">Back</button>
          <h2>User Management</h2>
          <button class="add-user-btn" @click="${this.openPopup}">Add User</button>
        </div>
        <user-table .users="${this.users}"></user-table>

        <add-user-popup
          .showPopup="${this.showPopup}"
          @close-popup="${this.closePopup}"
          @user-added="${this.handleUserAdded}">
        </add-user-popup>
      </div>
    `;
  }
}
