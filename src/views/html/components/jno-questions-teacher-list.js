import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import { filterIcon } from '@dile/icons';
import './jno-question-teacher.js';
import './jno-question-builder.js';

export class JnoQuestionsTeacherList extends UpdateAtModelChangedMixin(LitElement) {

    static styles = [
        css`
            :host {
                display: block;
            }
            .clicked {
                --dile-button-background-color: #491449;
            }
            #filter {
                float:right;
            }
        `
    ];

    static get properties() {
        return {
            elements: { type: Array },
            userState: { type: Object },
            isFiltered: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.elements = [];
        this.userState = {};
        this.isFiltered = false;
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
            if(!this.isFiltered)
                this.elements = this.userState.getCurrentCategory().getQuestions();
            message = html`<p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> (sin subcategorías)</p>`;
            return html`<p>Debe seleccionar un concepto para añadir preguntas</p>
            ${message}
            ${this.questionsTemplate}
            `;
        }
        else {
            if(!this.isFiltered)
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
            <dile-button-icon id="filter" .icon=${filterIcon} @click="${this.filterQuestions}" class="${this.isFiltered?'clicked':''}">${this.isFiltered?'Eliminar filtro':'Filtrar Pendientes'}</dile-button-icon>
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

    filterQuestions(e) {
        if (!this.isFiltered) {
            this.isFiltered = true;
            let pendingReviewQuestions = [];
            for (let question of this.elements) {
                for (let answer of question.getAnswers()) {
                    if (!answer.isEvaluated() && !pendingReviewQuestions.includes(question)) {
                        pendingReviewQuestions.push(question);
                    }
                }
            }
            this.elements = pendingReviewQuestions;
        }
        else {
            this.elements = [...this.elements];
            this.isFiltered = false;
        }
    }

    newQuestion(e) {
        this.shadowRoot.querySelector('jno-question-builder').newQuestion(this.userState);
    }
    stateUpdate(e) {
        this.isFiltered = false;
        super.stateUpdate(e);
    }
}
customElements.define('jno-questions-teacher-list', JnoQuestionsTeacherList);
