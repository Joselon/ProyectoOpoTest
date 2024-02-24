import { LitElement, html, css } from 'lit';
import '@dile/dile-radio-group/dile-radio-group.js';
import '@dile/dile-radio-group/dile-radio.js';

export class JnoAnswerEvaluate extends LitElement {
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
        `
    ];

    static get properties() {
        return {
            answerContent: { type: String },
        };
    }

    constructor() {
        super();
        this.answer = {};
        this.question = {};
        this.username = 'username';
        this.answerContent = '';
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elinput = this.shadowRoot.getElementById('elinput');
        this.elevalutaion = this.shadowRoot.getElementById('evaluation');
        this.eladdToConcept = this.shadowRoot.getElementById('addtoconcept');
    }



    render() {
        return html`
        <dile-modal id="elmodal" showCloseIcon blocking>
                <h2>Evaluar</h2>
                <p>Pregunta: <u>¿${this.statement}?</u></p>
                <p>Respuesta: <b>${this.answerContent}</b></p>
                <form id="elform">
                <dile-radio-group id="evaluation" name="evaluation" label="¿Es correcta?">
                    <dile-radio label="Sí" value="true"></dile-radio>
                    <dile-radio label="No" value="false"></dile-radio>
                </dile-radio-group>
                <dile-radio-group id="addtoconcept" name="addTo" label="¿Desea guardar la respuesta como posible solución?">
                    <dile-radio label="Sí" value="true"></dile-radio>
                    <dile-radio label="No" value="false"></dile-radio>
                </dile-radio-group>
                <dile-input label="Contenido (separado por comas si son varios)" name="answer" id="elinput"></dile-input>
                </form>
                <button type="button" @click=${this.evaluate}>Aceptar</button>
            </dile-modal>
            `;
    }
    initEvaluation(answer, question, username) {
        this.answer = answer;
        this.question = question;
        this.username = username;
        this.answerContent = this.answer.getContent();
        this.elinput.value = this.answerContent;
        this.statement = this.question.getStatement();
        this.elmodal.open();
    }
    evaluate() {
        this.answer.evaluate(this.elevalutaion.value === 'true', new Date(), this.username);
        if (this.eladdToConcept.value === 'true')
            this.question.addToConcept(this.elinput.value, !(this.elevalutaion.value === 'true'));
        this.dispatchModelChangedEvent();
        this.elinput.value = '';
        this.elevalutaion.value = '';
        this.addToConceptvalue = '';
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
customElements.define('jno-answer-evaluate', JnoAnswerEvaluate);
