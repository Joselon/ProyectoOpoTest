import { LitElement, html } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-question-teacher.js';
import './jno-question-builder.js';

export class JnoQuestionsTeacherList extends UpdateAtModelChangedMixin(LitElement) {

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
            this.elements = this.userState.getCurrentCategory().getQuestions();
            message = html`<p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> (sin subcategorías)</p>`;
            return html`<p>Debe seleccionar un concepto para añadir preguntas</p>
            ${message}
            ${this.questionsTemplate}
            `;
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
        let actionOptions = ["Desactivar"];
        let extraActionHtml = html`<jno-question-builder></jno-question-builder>`;
        return html`
            ${repeat(this.elements, (element) => html`
                    <jno-question-teacher 
                        .element="${element}"
                        .userState="${this.userState}"
                        .actionOptions="${actionOptions}"
                        @insert-answer= ${this.insertAnswer}
                        >
                    </jno-question-teacher>
            `)}
            ${extraActionHtml}
        `;
    }

    newQuestion() {
        this.shadowRoot.querySelector('jno-question-builder').newQuestion(this.userState);
    }
}
customElements.define('jno-questions-teacher-list', JnoQuestionsTeacherList);
