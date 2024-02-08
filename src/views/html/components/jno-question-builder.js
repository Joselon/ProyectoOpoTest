import { LitElement, html, css } from 'lit';
import '@dile/dile-radio-group/dile-radio-group.js';
import '@dile/dile-radio-group/dile-radio.js';
import { repeat } from 'lit/directives/repeat.js';



export class JnoQuestionBuilder extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-modal-width: 90%;
                --dile-modal-close-icon-size: 32px;
                --dile-modal-close-icon-top: 20px;
                --dile-modal-close-icon-color: red;
            }
            h2 {
                margin-top: 0;
            }
            dile-radio {
                border: 1px solid red;
                border-radius:5px;
            }
        `
    ];
    static get properties() {
        return {
            category: { type: Object },
            concept: { type: Object },
            questionTypes: { type: Array },
            statementTargets: { type: Array },
            enabled: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.category = {};
        this.concept = {};
        this.questionTypes = [];
        this.statementTargets = [];
        this.questionTypeTitles = [];
        this.statementTargetsTitles = [];
        this.enabled = false;
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elform = this.shadowRoot.getElementById('elform');
        this.elstatement = this.shadowRoot.getElementById('statement');
    }
    render() {
        return html`
        <dile-modal id="elmodal" showCloseIcon blocking>
                <h2>Nueva Pregunta</h2>
                <form id="elform">
                <dile-radio-group
                 id="target"
                 name="statement-target"
                 label="Propuestas de Enunciado:"
                 @dile-radio-selected="${this.updateTypes}"
                 >
                    ${repeat(this.statementTargets, (group, indexGroup) => html`
                      ${repeat(this.statementTargets[indexGroup], (item, index) => html`
                    <dile-radio
                         .label="${this.statementTargetsTitles[indexGroup][index]}"
                         .name="${this.statementTargetsTitles[indexGroup][index]}"
                         .value="${item}"
                         ></dile-radio>
                         
                     `)}
                    `)}
                </dile-radio-group>
                <dile-radio-group 
                    id="type"
                    name="question-type"
                    label="Tipo de Pregunta Disponibles:"
                    @dile-radio-group-changed="${this.enabledAdd}"
                >
                    ${repeat(this.questionTypes, (item, index) => html`
                    <dile-radio
                     label="${this.questionTypeTitles[index]}"
                     value="${item}"
                     ></dile-radio>
                    `)}
                </dile-radio-group>
                <dile-input label="Enunciado" name="statement" id="statement" placeholder="Copie el tipo de enunciado" ></dile-input>
                </form>
                <button type="button" @click=${this.insertQuestion} ?disabled=${!this.enabled}>Añadir</button>
            </dile-modal>
        `;
    }

    newQuestion(userState) {
        this.elstatement.value = '';
        this.userState = userState;
        this.category = this.userState.getCurrentCategory();
        this.concept = this.userState.getCurrentConcept();
        this.userState.setQuestionBuilder();
        this.questionBuilder = this.userState.getQuestionBuilder();
        this.statementTargets = [];
        this.statementTargetsTitles = [];
        [this.statementTargets, this.statementTargetsTitles] = this.questionBuilder.getStatementsAvailablesInConcept();
       // this.statementTargets = [...this.statementTargets];
        this.elmodal.open();
    }

    updateTypes(e) {
        this.questionTypes = [];
        this.questionTypeTitles = [];
        this.questionBuilder.setStatementImplementor(e.detail.value);
        this.elstatement.value = e.detail.label;
        [this.questionTypes,this.questionTypeTitles] = this.questionBuilder.getQuestionTypesAvailable();
        this.questionTypes = [...this.questionTypes];
    }

    enabledAdd(e) {
        this.enabled = true;
    }

    insertQuestion() {
        this.category.addQuestion(
            this.questionBuilder.create(
                this.shadowRoot.getElementById('type').value,
                this.category.getConceptKey(this.concept),
                this.elstatement.value)
        );
        this.dispatchModelChangedEvent();
        this.shadowRoot.getElementById('statement').value = '';
        this.elmodal.close();
    }

    dispatchModelChangedEvent() {
        this.dispatchEvent(new CustomEvent('model-changed', {
            bubbles: true,
            composed: true,
            detail: 'model-changed'
        }));
    }

}
customElements.define('jno-question-builder', JnoQuestionBuilder);
