import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-question.js';

export class JnoQuestionsList extends UpdateAtModelChangedMixin(LitElement) {
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
        if (this.userState.getCurrentCategory().getName() === '---') {
            return html`<p>Debe seleccionar una categoría</p>`;
        }
        this.elements = this.userState.getCurrentCategory().getAllQuestions();
        return html`
            <p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> y sus subcategorías</p>
            ${repeat(this.elements, (element) => html`
                    <jno-question .question="${element}" .userState="${this.userState}"></jno-question>
            `)}
        `;
    }
}
customElements.define('jno-questions-list', JnoQuestionsList);
