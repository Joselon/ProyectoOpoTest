import { LitElement, html, css } from 'lit';

export class JnoConcept extends LitElement {
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
        console.log('Ejecutar ' + action);
        if (action === "Seleccionar") {
            this.userState.setCurrentConcept(this.concept);
            console.log('set ' + this.concept.getKeyword());
        }
        else {
            console.log("mostrar definiciones" + this.concept.getDefinitions());
        }
    }
}
customElements.define('jno-concept', JnoConcept);
