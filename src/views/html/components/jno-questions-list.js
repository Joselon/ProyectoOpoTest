import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-question.js';
import './jno-question-builder.js';
import { UserType } from '../../../models/UserTypes.js';

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
            ${this.optionsTemplate}
        `;
    }

    get optionsTemplate() {
        let message = html``;
        if (this.userState.getCurrentCategory().getName() === '---') {
            return html`<p>Debe seleccionar una categoría</p>`;
        }
        else if (this.userState.getCurrentConcept().getKeyword() === '---') {
            if (this.userState.getCurrentUserType() === UserType.TEACHER) {
                this.elements = this.userState.getCurrentCategory().getQuestions();
                message = html`<p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> (sin subcategorías)</p>`;
                return html`<p>Debe seleccionar un concepto para añadir preguntas</p>
                ${message}
                ${this.questionsTemplate}
                `;
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
        else {
            this.elements = this.userState.getCurrentCategory().getConceptQuestions(this.userState.getCurrentConceptKey());
            return html`
            <p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> y relacionadas con el Concepto: <b>${this.userState.getCurrentConcept().getKeyword()}</b></p>
            <dile-button-icon @click=${this.newQuestion}>Añadir</dile-button-icon>
            ${this.questionsTemplate}
            `;
        }
    }

    get questionsTemplate() {
        let actionOptions = ["Responder"];
        let extraActionHtml = html`<jno-answer-insert></jno-answer-insert>`;
        if (this.userState.getCurrentUserType() === UserType.TEACHER) {
            actionOptions = ["Desactivar"];
            extraActionHtml = html`<jno-question-builder></jno-question-builder>`;
        }
        return html`
            ${repeat(this.elements, (element) => html`
                    <jno-question 
                        .question="${element}"
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

    newQuestion() {
        this.shadowRoot.querySelector('jno-question-builder').newQuestion(this.userState);
    }
}
customElements.define('jno-questions-list', JnoQuestionsList);
