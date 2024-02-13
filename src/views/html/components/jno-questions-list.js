import { LitElement, html } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-question.js';

export class JnoQuestionsList extends UpdateAtModelChangedMixin(LitElement) {

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
            ${this.optionsTemplate}
        `;
    }

    get optionsTemplate() {
        let message = html``;
        if (this.userState.getCurrentCategory().getName() === '---') {
            return html`<p>Debe seleccionar una categoría</p>`;
        }
        else {

            this.elements = this.userState.getCurrentCategory().getAllQuestions();
            message = html`<p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> y en sus subcategorías</p>`;
            return html`
                ${message}
                ${this.questionsTemplate}
                `;

        }
    }

    get questionsTemplate() {
        let actionOptions = ["Responder"];
        let extraActionHtml = html`<jno-answer-insert></jno-answer-insert>`;
        return html`
            ${repeat(this.elements, (element) => html`
                    <jno-question 
                        .element="${element}"
                        .userState="${this.userState}"
                        .actionOptions="${actionOptions}"
                        @insert-answer= ${this.insertAnswer}
                        >
                    </jno-question>
            `)}
            ${extraActionHtml}
        `;
    }
    insertAnswer(e) {
        this.shadowRoot.querySelector('jno-answer-insert').insert(e.detail, this.userState.getCurrentUserName());
    }

}
customElements.define('jno-questions-list', JnoQuestionsList);
