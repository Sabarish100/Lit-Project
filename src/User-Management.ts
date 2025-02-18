import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('user-management')
export class UserManagement extends LitElement {
  @property() selectedSection: string = 'displayUsers';
  @state() users: any[] = [];
  @state() newUser = { name: '', email: '', username: '' };
  @state() updateUser = { id: '', name: '', email: '' };
  @state() deleteUserId: string = '';
  
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Arial, sans-serif;
      height: 100%;
    }

    .container {
      display: flex;
      width: 100%;
      height: 100%;
    }

    .left-section {
      width: 30%;
      background: #f8f8f8;
      padding: 20px;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .right-section {
      width: 70%;
      padding: 20px;
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
      cursor: pointer;
      font-size: medium;
    }

    li:hover {
      background: #ddd;
    }

    button {
      padding: 10px 15px;
      border: none;
      background: #b9b9b9;
      color: white;
      cursor: pointer;
      border-radius: 5px;
    }

    button:hover {
      background: #b4b4b4;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .user-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .user-card {
      background: #fff;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="left-section">
          <h3>User Management System</h3>
          <ul>
            <li @click="${() => this.changeSection('addUser')}">Add New User</li>
            <li @click="${() => this.changeSection('updateUser')}">Update User</li>
            <li @click="${() => this.changeSection('deleteUser')}">Delete User</li>
            <li @click="${() => this.changeSection('displayUsers')}">Display All Users</li>
          </ul>
        </div>
        <div class="right-section">
          ${this.renderSection()}
        </div>
      </div>
      <button @click="${this.goBack}">Back</button>
    `;
  }

  private changeSection(section: string) {
    this.selectedSection = section;
  }

  private renderSection() {
    switch (this.selectedSection) {
      case 'addUser':
        return html`
          <h3>Add New User</h3>
          <form @submit="${this.addUser}">
            <input type="text" placeholder="Name" .value="${this.newUser.name}" @input="${(e: any) => this.newUser.name = e.target.value}" required />
            <input type="email" placeholder="Email" .value="${this.newUser.email}" @input="${(e: any) => this.newUser.email = e.target.value}" required />
            <input type="text" placeholder="Username" .value="${this.newUser.username}" @input="${(e: any) => this.newUser.username = e.target.value}" required />
            <button type="submit">Add User</button>
          </form>`;

      case 'displayUsers':
        return html`
          <h3>All Users</h3>
          <button @click="${this.fetchUsers}">Load Users</button>
          <div class="user-list">
            ${this.users.map(user => html`
              <div class="user-card">
                <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
                <p><strong>Email:</strong> ${user.email}</p>
              </div>
            `)}
          </div>
        `;
      default:
        return html`<h3>Welcome to User Management System</h3>`;
    }
  }

  private async fetchUsers() {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      this.users = data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  private async addUser(event: Event) {
    event.preventDefault();
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newUser)
      });
      const data = await response.json();
      this.users = [...this.users, data];
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }
}
