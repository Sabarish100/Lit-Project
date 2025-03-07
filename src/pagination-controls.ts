import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("pagination-controls")
export class PaginationControls extends LitElement {
  @property({ type: Number }) currentPage = 1;
  @property({ type: Number }) totalPages = 1;

  static styles = css`
    .pagination { display: flex; justify-content: center; gap: 10px; }
  `;

  render() {
    return html`
      <div class="pagination">
        <button @click="${() => this.dispatchEvent(new Event("prev-page", { bubbles: true, composed: true }))}" ?disabled="${this.currentPage === 1}">Previous</button>
        <span>Page ${this.currentPage} of ${this.totalPages}</span>
        <button @click="${() => this.dispatchEvent(new Event("next-page", { bubbles: true, composed: true }))}" ?disabled="${this.currentPage >= this.totalPages}">Next</button>
      </div>
    `;
  }
}
