import { LitElement, html, css } from 'lit';
import { UserType } from '../../../models/UserTypes.js';
import { listIcon } from '@dile/icons';
import './jno-answers-list.js';
import './jno-answer-insert.js';
import './jno-answer-evaluate.js';

export class JnoQuestion extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
            }
            section {
                background-color: #f5f5f573;
                padding: 1rem;
                border: 2px solid #ccc;
            }
            ul {
                margin: 0;
                padding: 0;
                list-style-type: none;
            }
            li {
                margin-bottom: 0.5rem;
            }
            div {
                border: 1px solid #ddd;
                background-color: #def;
                padding: 0 1rem;
            }
            #answers {
                display: none;
            }
        `
    ];

    static get properties() {
        return {
            question: { type: Object },
            userState: { type: Object },
            actionOptions: { type: Array },
            selectedOption: { type: String },
        };
    }

    constructor() {
        super();
        this.actionOptions = [];
        this.selectedAction = "";
        this.userState = {};
        this.question = {};
    }
    firstUpdated() {
        this.answersDiv = this.shadowRoot.getElementById("answers");
    }

    render() {
        return html`
        <section>
            <jno-event-menu
                title='¿${this.question.getStatement()}?'
                .options=${this.actionOptions} 
                selectedOption=${this.selectedOption}
                @jno-event-menu-changed=${this.changeSelectedOption}
                >
                ${this.infoTemplate}

            </jno-event-menu>
        </section>
        ${this.answerTemplate}
        `;
    }
    get infoTemplate() {
        let infoHTML = html``;
        if (this.userState.getCurrentUserType() === UserType.TEACHER) {
            infoHTML = html`
                    <span slot="subtitle">
                        <b>Objetivo</b>: ${this.question.getTarget()}
                        /<b> Tipo de Pregunta</b>: ${this.question.getType()}
                        /<b> Concepto</b>: ${this.userState.getCurrentCategory().getConcept(this.question.getConceptKey()).getKeyword()}
                    </span>
                    <dile-button-icon 
                    slot="extraAction"
                    .icon=${listIcon}
                    @click=${this.toggleAnswersDiv}
                    ?disabled=${this.question.getAnswers().length === 0}
                    >
                    Respuestas: ${this.question.getAnswers().length}
                </dile-button-icon>
                    `;
        }
        return infoHTML;
    }
    get answerTemplate() {
        if (this.userState.getCurrentUserType() !== UserType.TEACHER) {
            return html``;
        }
        return html`
        <div id='answers' @evaluate-answer='${this.evaluate}'>
            <jno-answers-list
             .elements=${this.question.getAnswers()}
             .userState=${this.userState}
             ></jno-answers-list>
        </div>
        <jno-answer-evaluate></jno-answer-evaluate>
        `
    }

    toggleAnswersDiv() {
        if (this.answersDiv.style.display === 'block')
            this.answersDiv.style.display = 'none';
        else
            this.answersDiv.style.display = 'block';
    }
    changeSelectedOption(e) {
        this.selectedAction = e.detail.selectedOption;
        this.doAction(this.selectedAction);
    }

    doAction(action) {
        if (action === "Responder") {
            this.insert();
        }
        else {
            this.showFeedbackError("PENDIENTE HABILITAR FUNCIONALIDAD");
        }
    }

    insert() {
        this.dispatchEvent(new CustomEvent('insert-answer', {
            detail: this.question
        }));
    }

    evaluate(e) {
        this.shadowRoot.querySelector('jno-answer-evaluate').initEvaluation(e.detail, this.question, this.userState.getCurrentUserName());
    }

    showFeedbackError(msg) {
        this.dispatchEvent(new CustomEvent('error-feedback', {
            bubbles: true,
            composed: true,
            detail: msg
        }));
    }

    dispatchModelChangedEvent() {
        this.dispatchEvent(new CustomEvent('model-changed', {
            bubbles: true,
            composed: true,
            detail: 'model-changed'
        }));
    }
}
customElements.define('jno-question', JnoQuestion);
