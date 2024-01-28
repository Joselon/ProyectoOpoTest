import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './jno-category.js';

export class JnoCategoriesList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static get properties() {
        return {
            categories: { type: Array },
        };
    }

    constructor() {
        super();
        this.categories = [];
    }

    render() {
        return html`
            ${this.template}
        `;
    }

    get template() {
        return html`
            ${repeat(this.categories, (category) => html`
                    <jno-category .category="${category}"></jno-category>
            `)}
        `;
    }
}
customElements.define('jno-categories-list', JnoCategoriesList);

