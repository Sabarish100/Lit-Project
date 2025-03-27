import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { User } from "./types";

@customElement("user-table")
export class UserTable extends LitElement {
  @property({ type: Array }) users: User[] = [];
  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) usersPerPage = 5;

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin-top: 20px;
      font-size: 14px;
      box-shadow: 0px 0px 7px 9px #fefefe;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
      word-wrap: break-word;
    }
    th {
      background: #f4f4f4;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .pagination {
      margin-top: 10px;
    }
    .page-btn {
      background: #2196f3;
      color: white;
      border: none;
      padding: 6px 10px;
      cursor: pointer;
      border-radius: 4px;
      margin: 0 5px;
    }
    .disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `;

  private nextPage() {
    if (this.currentPage < Math.ceil(this.users.length / this.usersPerPage)) {
      this.currentPage++;
    }
  }

  private prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  render() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    const paginatedUsers = this.users.slice(startIndex, endIndex);

    return html`
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
          </tr>
        </thead>
        <tbody>
          ${paginatedUsers.map(
            (user) => html`
              <tr> 
                <td><img src="${user.image}"/></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.role}</td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <div class="pagination">
        <button class="page-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                ?disabled="${this.currentPage === 1}" 
                @click="${this.prevPage}">Previous</button>
        <span> Page ${this.currentPage} of ${Math.ceil(this.users.length / this.usersPerPage)} </span>
        <button class="page-btn ${this.currentPage >= Math.ceil(this.users.length / this.usersPerPage) ? 'disabled' : ''}" 
                ?disabled="${this.currentPage >= Math.ceil(this.users.length / this.usersPerPage)}" 
                @click="${this.nextPage}">Next</button>
      </div>
    `;
  }
}
