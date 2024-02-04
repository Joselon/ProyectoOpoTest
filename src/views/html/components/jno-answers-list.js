import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './jno-answer.js';

export class JnoAnswersList extends LitElement {
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
            userState: { type: Object },
        };
    }

    constructor() {
        super();
        this.elements = [];
        this.userState = {};
    }
    render() {
        return html`
            ${this.template}
            `;
    }
    get template() {
        return html`
            ${repeat(this.elements, (element) => html`
                    <jno-answer .answer=${element}></jno-answer>
            `)}
        `;
    }
}
customElements.define('jno-answers-list', JnoAnswersList);