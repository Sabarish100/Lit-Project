import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('user-management')
export class UserManagement extends LitElement {
  @property() users: any[] = [];
  @property() newUser = { firstName: '', lastName: '', username: '', email: '', phone: '', image: '', role: '' };
  @property() addingUser: boolean = false;

  static styles = css`
    :host {
      align-items: center;
      font-family: Arial, sans-serif;
      height: 100%;
      background-color: #2596be;
    }

    .container {
      width: 80%;
      margin: auto;
      text-align: center;
    }

    .back-button {
      position: absolute;
      left: 20px;
      top: 20px;
      background: #4caf50;
      color: white;
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .add-button {
      background: #2196f3;
      color: white;
      padding: 5px 10px;
      border: none;
      cursor: pointer;
    }

    .add-btn {
      background: rgb(33, 150, 243);
      color: white;
      padding: 6px 12px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      width: fit-content;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      box-shadow: 0px 0px 7px 9px #fefefe;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 10px;
    }

    th {
      background: #f4f4f4;
    }

    input {
      width: fit-content;
      padding: 5px;
      border: none;
      border-radius: 3px;
    }
  `;

  render() {
    return html`
      <div class="container">
        <button class="back-button" @click="${this.goBack}">Back</button>
        <h2>User Management</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.users.map(user => html`
              <tr>
                <td>${user.image}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.role}</td>
                <td></td>
              </tr>
            `)}
            ${this.addingUser ? html`
              <tr>
                <td>+</td>
                <td><input type="text" placeholder="First Name" @input="${(e: InputEvent) => this.updateNewUser('firstName', e)}" /></td>
                <td><input type="text" placeholder="Last Name" @input="${(e: InputEvent) => this.updateNewUser('lastName', e)}" /></td>
                <td><input type="text" placeholder="Username" @input="${(e: InputEvent) => this.updateNewUser('username', e)}" /></td>
                <td><input type="email" placeholder="Email" @input="${(e: InputEvent) => this.updateNewUser('email', e)}" /></td>
                <td><input type="text" placeholder="Phone" @input="${(e: InputEvent) => this.updateNewUser('phone', e)}" /></td>
                <td><input type="text" placeholder="Role" @input="${(e: InputEvent) => this.updateNewUser('role', e)}" /></td>
                <td><button class="add-btn" @click="${this.saveUser}">Save</button></td>
              </tr>
            ` : html`
              <tr>
                <td colspan="8" style="text-align: left;">
                  <button class="add-button" @click="${this.addRow}">+ Add User</button>
                </td>
              </tr>
            `}
          </tbody>
        </table>
      </div>
    `;
  }

  private addRow() {
    this.addingUser = true;
  }

  private updateNewUser(field: string, event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.newUser = { ...this.newUser, [field]: target.value };
  }

  private saveUser() {
    if (this.newUser.firstName && this.newUser.lastName && this.newUser.username && this.newUser.email && this.newUser.phone && this.newUser.role) {
      this.users = [...this.users, { ...this.newUser }];
      this.newUser = { firstName: '', lastName: '', username: '', email: '', phone: '', image: '', role: '' };
      this.addingUser = false;
    } else {
      alert('Please fill all fields before saving.');
    }
  }

  private goBack() {
    this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
  }
}
