import { LitElement, html, css } from 'lit';

export class JnoConcept extends LitElement {
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
        `
    ];

    static get properties() {
        return {
            concept: { type: Object },
            userState: { type: Object },
            actionOptions: { type: Array },
            selectedOption: { type: String },
        };
    }

    constructor() {
        super();
        this.actionOptions = ["Seleccionar", "Editar*"];
        this.selectedAction = "";
        this.userState = {};
        this.concept = {};
    }


    render() {
        return html`
        <section>
            <jno-event-menu
                title='${this.concept.getKeyword()}'
                .options=${this.actionOptions} 
                selectedOption=${this.selectedOption}
                @jno-event-menu-changed=${this.changeSelectedOption}
                ></jno-event-menu>
            <ul>
                <li><b>Número de Definiciones</b>: ${this.concept.getDefinitions().length}</a></li>
                <li><b>Número de Relaciones</b>: ${this.concept.getRelations().length}</a></li>
            </ul>
        </section>
        `;
    }

    changeSelectedOption(e) {
        this.selectedAction = e.detail.selectedOption;
        this.doAction(this.selectedAction);
    }

    doAction(action) {
        if (action === "Seleccionar") {
            this.userState.setCurrentConcept(this.concept);
            this.dispatchModelChangedEvent();
            this.showFeedbackSuccess(`CONCEPTO SELECCIONADO: ${this.concept.getKeyword()} `);
        }
        else {
            this.showFeedbackError("ERROR: Aún no disponible...");
            // console.log("mostrar definiciones" + this.concept.getDefinitions());
        }
    }
    showFeedbackError(msg) {
        this.dispatchEvent(new CustomEvent('error-feedback', {
            bubbles: true,
            composed: true,
            detail: msg
        }));
    }
    showFeedbackSuccess(data) {
        this.dispatchEvent(new CustomEvent('success-feedback', {
            bubbles: true,
            composed: true,
            detail: data
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
customElements.define('jno-concept', JnoConcept);
