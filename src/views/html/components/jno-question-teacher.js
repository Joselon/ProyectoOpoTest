import { html, css } from 'lit';
import { JnoModelElement } from './jno-model-element.js'
import { listIcon } from '@dile/icons';
import './jno-answers-list.js';
import './jno-answer-evaluate.js';

export class JnoQuestionTeacher extends JnoModelElement {
    static styles = [
        JnoModelElement.styles,
        css`
            #answers {
                display: none;
            }
        `
    ];

    static get properties() {
        return {
            userState: { type: Object },
        };
    }

    constructor() {
        super();
        this.userState = {};

    }
    firstUpdated() {
        this.answersDiv = this.shadowRoot.getElementById("answers");
    }

    getTitle() {
        return `¿${this.element.getStatement()}?`;
    }

    get _infoTemplate() {
        return html`
        <span slot="subtitle">
            <b>Objetivo</b>: ${this.element.getTarget()}
            /<b> Tipo de Pregunta</b>: ${this.element.getType()}
            /<b> Concepto</b>: ${this.userState.getCurrentCategory().getConcept(this.element.getConceptKey()).getKeyword()}
        </span>
        `;
    }

    get _subCardsButtonTemplate() {
        return html`
            <dile-button-icon 
                slot="subCardsButton"
                .icon=${listIcon}
                @click=${() => this.toggleDiv(this.answersDiv)}
                ?disabled=${this.element.getAnswers().length === 0}
                >
                Respuestas: ${this.element.getAnswers().length}
            </dile-button-icon>
        `;
    }
    get _subElementsTemplate() {
        return html`
        <div slot="subCards" id='answers' @evaluate-answer='${this.evaluate}'>
            <jno-answers-list
             .elements=${this.element.getAnswers()}
             .userState=${this.userState}
             ></jno-answers-list>
             <jno-answer-evaluate></jno-answer-evaluate>
        </div>
        `
    }

    evaluate(e) {
        this.shadowRoot.querySelector('jno-answer-evaluate').initEvaluation(e.detail, this.element, this.userState.getCurrentUserName());
    }

    _doAction(action) {
        switch (action) {
            case "Evaluar":
                this.showFeedbackSuccess(`Evaluando respuesta...`);
            break;
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }

}
customElements.define('jno-question-teacher', JnoQuestionTeacher);
