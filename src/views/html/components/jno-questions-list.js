import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './jno-question.js';

export class JnoQuestionsList extends LitElement {
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
                    <jno-question .question="${element}" .userState="${this.userState}"></jno-question>
            `)}
        `;
    }
}
customElements.define('jno-questions-list', JnoQuestionsList);
