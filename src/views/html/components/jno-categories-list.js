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
            elements: { type: Array },
            userState: { type: Object}
        };
    }

    constructor() {
        super();
        this.elements = [];
    }

    render() {
        return html`
            ${this.template}
        `;
    }

    get template() {
        return html`
            ${repeat(this.elements, (element) => html`
                    <jno-category .category="${element}" .userState="${this.userState}"></jno-category>
            `)}
        `;
    }
}
customElements.define('jno-categories-list', JnoCategoriesList);

