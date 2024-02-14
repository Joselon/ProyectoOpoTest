import { html, css } from 'lit';
import { JnoModelElement } from './jno-model-element.js';
import { listIcon } from '@dile/icons';
import './jno-contents-list';

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
    get _extraActionsTemplate() {
        return html`
                 <dile-button-icon 
                    slot="extraAction"
                    .icon=${listIcon}
                    @click=${() => this.toggleDiv(this.definitionsDiv)}
                    ?disabled=${this.element.getDefinitions().length === 0}
                    >
                    Definiciones: ${this.element.getDefinitions().length}
                </dile-button-icon>
                <dile-button-icon 
                    slot="extraAction"
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
            <div id="definitions">
                <small>Definiciones</small>
                ${this.definitionsTemplate}
            </div>
            <div id="relations">
            <small>Relaciones</small>
                ${this.relationsTemplate}
            </div>
        </section>
        `;
    }

    get definitionsTemplate() {
        return html`
            <jno-contents-list 
             .elements=${this.element.getDefinitions()}
             .userState=${this.userState}
             ></jno-contents-list>
        `
    }

    get relationsTemplate() {
        return html`
        <jno-contents-list 
             .elements=${this.element.getRelations()}
             .userState=${this.userState}
             ></jno-contents-list>
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
                this.showFeedbackSuccess(`Cargadas PREGUNTAS`);
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
