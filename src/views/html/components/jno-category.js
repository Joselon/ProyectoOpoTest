import { html, css } from 'lit';
import { JnoModelElement } from './jno-model-element.js'
import './jno-categories-list.js'
import { listIcon } from '@dile/icons';


export class JnoCategory extends JnoModelElement {
    static styles = [
        JnoModelElement.styles,
        css`
            #subcategories {
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
        this.subcategoriesDiv = this.shadowRoot.getElementById("subcategories");
    }

    getTitle() {
        return this.element.getName();
    }

    get _infoTemplate() {
        return html`
        <span slot="subtitle">
            <b> Preguntas Contenidas</b>: ${this.element.getAllQuestions().length}
        </span>
        `;
    }

    get _extraActionsTemplate() {
        return html`
        <dile-button-icon 
            slot="extraAction"
            .icon=${listIcon}
            @click=${() => this.toggleDiv(this.subcategoriesDiv)}
            ?disabled=${this.element.getSubcategories().length === 0}
         >
        Subcategorias: ${this.element.getSubcategories().length}
        </dile-button-icon>
        `;
    }

    get _subElementsTemplate() {
        return html`
        <div id="subcategories">
            <jno-categories-list
             .elements=${this.element.getSubcategories()}
             .userState=${this.userState}
             ></jno-categories-list>
        </div>
        `
    }

    _doAction(action) {
        switch (action) {
            case "Seleccionar":
                this.userState.setCurrentCategory(this.element);
                this.userState.resetConceptSelected();
                this.dispatchModelChangedEvent();
                this.showFeedbackSuccess(`Cargados CONCEPTOS y PREGUNTAS`);
                break;
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }

}
customElements.define('jno-category', JnoCategory);
