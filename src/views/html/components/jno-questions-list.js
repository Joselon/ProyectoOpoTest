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
            userState: { type: Object },
            category: { type: Object }
        };
    }

    constructor() {
        super();
        this.elements = [];
        this.userState = {};
        this.category = {};
    }

    firstUpdated() {
        this.interval = setInterval(() => {
            this.requestUpdate();
            console.log("timer questions actualizado")
        }, 1000);
    }

    render() {
        return html`
            ${this.template}
        `;
    }

    get template() {
        if (this.userState.getCurrentCategory().getName() === '---') {
            return html`<p>Debe seleccionar una categoría</p>`;
        }
        this.elements = this.userState.getCurrentCategory().getQuestions();
        return html`
            <p>Contenidas en ${this.userState.getCurrentCategory().getName()} y sus subcategorías</p>
            ${repeat(this.elements, (element) => html`
                    <jno-question .question="${element}" .userState="${this.userState}"></jno-question>
            `)}
        `;
    }
}
customElements.define('jno-questions-list', JnoQuestionsList);
