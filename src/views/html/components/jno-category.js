import { LitElement, html, css } from 'lit';
import { Concept } from '../../../models/Concept.js'
import '../../../utils/view/html/components/jno-event-menu.js';
import './jno-categories-list.js'
import { listIcon } from '@dile/icons';

export class JnoCategory extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
            }
            section {
                background-color: #f5f5f573;
                padding: 0 1rem;
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

            #subcategories {
                display: none;
            }
        `
    ];

    static get properties() {
        return {
            category: { type: Object },
            userState: { type: Object },
            actionOptions: { type: Array },
            selectedOption: { type: String },
        };
    }

    constructor() {
        super();
        this.actionOptions = [];
        this.selectedAction = "";
    }

    firstUpdated() {
        this.subcategoriesDiv = this.shadowRoot.getElementById("subcategories");
    }

    render() {
        return html`
        <section>
            <jno-event-menu
                title=${this.category.getName()}
                .options=${this.actionOptions} 
                selectedOption=${this.selectedOption}
                @jno-event-menu-changed=${this.changeSelectedOption}
                >
                <span slot="subtitle">
                    <b>Conceptos</b>: ${this.category.getConcepts().length}
                 / <b> Preguntas</b>: ${this.category.getQuestions().length}</span>
                 
                <dile-button-icon 
                    slot="extraAction"
                    .icon=${listIcon}
                    @click=${this.toggleSubcategoriesDiv}
                    ?disabled=${this.category.getSubcategories().length === 0}
                    >
                    Subcategorias: ${this.category.getSubcategories().length}
                </dile-button-icon>
            </jno-event-menu>
            ${this.subcategoriesTemplate}
        </section>
        `;
    }
    get subcategoriesTemplate() {
        return html`
        <div id="subcategories">
            <jno-categories-list
             .elements=${this.category.getSubcategories()}
             .userState=${this.userState}
             hasAncestor
             ></jno-categories-list>
        </div>
        `
    }
    changeSelectedOption(e) {
        this.selectedAction = e.detail.selectedOption;
        this.doAction(this.selectedAction);
    }

    doAction(action) {
        switch (action) {
            case "Seleccionar":
                this.userState.setCurrentCategory(this.category);
                this.userState.setCurrentConcept(new Concept("---"));
                this.dispatchModelChangedEvent();
                this.showFeedbackSuccess(`CATEGORÍA SELECCIONADA: ${this.category.getName()}`);
                break;
            case "Añadir":
                this.insert();
                break;
            case "Editar":
                this.edit();
                break;
            case "Eliminar":
                this.delete();
                this.showFeedbackError(`Eliminar: ${this.category.getName()}`);
                break;
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }

    insert() {
        this.dispatchEvent(new CustomEvent('insert-category', {
            detail: this.category
        }));
    }

    edit() {
        this.dispatchEvent(new CustomEvent('edit-category', {
            detail: this.category
        }));
    }

    delete() {
        this.dispatchEvent(new CustomEvent('delete-category', {
            detail: this.category
        }));
    }

    toggleSubcategoriesDiv() {
        if (this.subcategoriesDiv.style.display === 'block')
            this.subcategoriesDiv.style.display = 'none';
        else
            this.subcategoriesDiv.style.display = 'block';
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
customElements.define('jno-category', JnoCategory);
