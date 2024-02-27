import { html, css } from 'lit';
import { JnoModelElement } from './jno-model-element.js';
import { listIcon } from '@dile/icons';
import './jno-definitions-list.js';
import './jno-relations-list.js';

export class JnoConcept extends JnoModelElement {
    static styles = [
        JnoModelElement.styles,
        css`
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
            userState: { type: Object },
        };
    }

    constructor() {
        super();
        this.userState = {};
    }

    firstUpdated() {
        this.definitionsDiv = this.shadowRoot.getElementById("definitions");
        this.relationsDiv = this.shadowRoot.getElementById("relations");
    }

    getTitle() {
        return this.element.getKeyword();
    }
    get _infoTemplate() {
        return html`
                <span slot="subtitle">
                    <b>Definiciones</b>: ${this.element.getDefinitions().length}
                 / <b> Relaciones</b>: ${this.element.getRelations().length}
                </span>
                `;
    }
    get _subCardsButtonTemplate() {
        return html`
                 <dile-button-icon 
                    slot="subCardsButton"
                    .icon=${listIcon}
                    @click=${() => this.toggleDiv(this.definitionsDiv)}
                    ?disabled=${this.element.getDefinitions().length === 0}
                    >
                    Definiciones: ${this.element.getDefinitions().length}
                </dile-button-icon>
                <dile-button-icon 
                    slot="subCardsButton"
                    .icon=${listIcon}
                    @click=${() => this.toggleDiv(this.relationsDiv)}
                    ?disabled=${this.element.getRelations().length === 0}
                    >
                    Relaciones: ${this.element.getRelations().length}
                </dile-button-icon>
                `;
    }
    get _subElementsTemplate() {
        return html`
            <div slot="subCards" id="definitions">
                <small>Definiciones</small>
                ${this.definitionsTemplate}
            </div>
            <div slot="subCards" id="relations">
                <small>Relaciones</small>
                ${this.relationsTemplate}
            </div>
        </section>
        `;
    }

    get definitionsTemplate() {
        return html`
            <jno-definitions-list 
             .elements=${this.element.getDefinitions()}
             ></jno-definitions-list>
        `
    }

    get relationsTemplate() {
        return html`
        <jno-relations-list 
             .elements=${this.element.getRelations()}
             ></jno-relations-list>
        `
    }

    toggleDiv(div){
        if(div === this.relationsDiv)
            this.definitionsDiv.style.display = 'none';
        else 
        this.relationsDiv.style.display = 'none';
        super.toggleDiv(div);
    }

    _doAction(action) {
        switch (action) {
            case "Seleccionar":
                this.userState.setCurrentConcept(this.element);
                this.dispatchModelChangedEvent();
                this.showFeedbackSuccess(`Consulta PREGUNTAS`);
                break;
            case "Editar":
                this.edit();
                break;
            case "Eliminar":
                this.delete();
                break;
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }
    edit() {
        this.dispatchEvent(new CustomEvent('edit-concept', {
            detail: this.element
        }));
    }
    delete() {
        this.dispatchEvent(new CustomEvent('delete-concept', {
            detail: this.element
        }));
    }
}
customElements.define('jno-concept', JnoConcept);
