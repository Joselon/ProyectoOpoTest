import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { listIcon } from '@dile/icons';
import './jno-contents-list';

export class JnoConcept extends UpdateAtModelChangedMixin(LitElement) {
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
            #definitions {
                display: none;
            }
            #relations {
                display: none;
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
        this.actionOptions = ["Seleccionar", "Editar","Eliminar"];
        this.selectedAction = "";
        this.userState = {};
        this.concept = {};
    }

    firstUpdated() {
        this.definitionsDiv = this.shadowRoot.getElementById("definitions");
        this.relationsDiv = this.shadowRoot.getElementById("relations");
    }
    render() {
        return html`
        <section>
            <jno-event-menu
                title=${this.concept.getKeyword()}
                .options=${this.actionOptions} 
                selectedOption=${this.selectedOption}
                @jno-event-menu-changed=${this.changeSelectedOption}
                >
                <span slot="subtitle">
                    <b>Definiciones</b>: ${this.concept.getDefinitions().length}
                 / <b> Relaciones</b>: ${this.concept.getRelations().length}</span>
                 <dile-button-icon 
                    slot="extraAction"
                    .icon=${listIcon}
                    @click=${() => this.toggleDiv(this.definitionsDiv)}
                    ?disabled=${this.concept.getDefinitions().length === 0}
                    >
                    Definiciones: ${this.concept.getDefinitions().length}
                </dile-button-icon>
                <dile-button-icon 
                    slot="extraAction"
                    .icon=${listIcon}
                    @click=${() => this.toggleDiv(this.relationsDiv)}
                    ?disabled=${this.concept.getRelations().length === 0}
                    >
                    Relaciones: ${this.concept.getRelations().length}
                </dile-button-icon>
            </jno-event-menu>
            <div id="definitions">
                ${this.definitionsTemplate}
            </div>
            <div id="relations">
                ${this.relationsTemplate}
            </div>
        </section>
        `;
    }

    get definitionsTemplate() {
        return html`
            <jno-contents-list 
             .elements=${this.concept.getDefinitions()}
             .userState=${this.userState}
             ></jno-contents-list>
        `
    }

    get relationsTemplate() {
        return html`
        <jno-contents-list 
             .elements=${this.concept.getRelations()}
             .userState=${this.userState}
             ></jno-contents-list>
        `
    }
    toggleDiv(div) {
        if (div.style.display === 'block')
            div.style.display = 'none';
        else
            div.style.display = 'block';
    }
    changeSelectedOption(e) {
        this.selectedAction = e.detail.selectedOption;
        this.doAction(this.selectedAction);
    }

    doAction(action) {
        switch (action) {
            case "Seleccionar":
                this.userState.setCurrentConcept(this.concept);
                this.dispatchModelChangedEvent();
                this.showFeedbackSuccess(`CONCEPTO SELECCIONADO: ${this.concept.getKeyword()} `);
                break;
            case "Editar":
                this.edit();
                break;
            case "Eliminar":
                this.delete();
                this.showFeedbackError(`Eliminar: ${this.concept.getKeyword()}`);
                break;
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }
    edit() {
        this.dispatchEvent(new CustomEvent('edit-concept', {
            detail: this.concept
        }));
    }
    delete() {
        this.dispatchEvent(new CustomEvent('delete-concept', {
            detail: this.concept
        }));
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
