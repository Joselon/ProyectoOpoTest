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
        document.addEventListener('success-feedback', this.stateUpdate.bind(this));
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
        this.elements = this.userState.getCurrentCategory().getAllQuestions();
        return html`
            <p>Contenidas en ${this.userState.getCurrentCategory().getName()} y sus subcategorías</p>
            ${repeat(this.elements, (element) => html`
                    <jno-question .question="${element}" .userState="${this.userState}"></jno-question>
            `)}
        `;
    }

    stateUpdate(e) {
        this.requestUpdate();
    }
}
customElements.define('jno-questions-list', JnoQuestionsList);
