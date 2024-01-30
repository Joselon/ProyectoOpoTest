import { LitElement, html, css } from 'lit';

export class JnoQuestion extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
            }
            section {
                background-color: #f5f5f5;
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
        this.actionOptions = ["Responder", "Mostrar Respuestas"];
        this.selectedAction = "";
        this.userState = {};
        this.question = {};
    }


    render() {
        return html`
        <section>
            <jno-event-menu
                title='¿${this.question.getStatement()}?'
                .options=${this.actionOptions} 
                selectedOption=${this.selectedOption}
                @jno-event-menu-changed=${this.changeSelectedOption}
                ></jno-event-menu>
            <ul>
                <li><b>Número de Respuestas</b>: ${this.question.getAnswers().length}</a></li>
                <li><b>Objetivo</b>: ${this.question.getTarget()}</li>
                <li><b>Tipo de Pregunta</b>: ${this.question.getType()}</li>
                <li><b>Indice del Concepto en la Categoría</b>: ${this.question.getConceptIndex() + 1}</li>
            </ul>
        </section>
        `;
    }
    changeSelectedOption(e) {
        this.selectedAction = e.detail.selectedOption;
        this.doAction(this.selectedAction);
    }

    doAction(action) {
        if(action==="x"){
            //this.question...
        }
        else {
            this.showFeedbackError("Botón deshabilitado");
        }
    }

    showFeedbackError(msg) {
        this.dispatchEvent(new CustomEvent('error-feedback', {
            bubbles: true,
            composed: true,
            detail: msg
        }));
    }
}
customElements.define('jno-question', JnoQuestion);
