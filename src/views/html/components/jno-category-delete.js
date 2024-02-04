import { LitElement, html, css } from 'lit';
import '@dile/dile-confirm/dile-confirm';

export class JnoCategoryDelete extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-confirm-accept-button-color: red;
                --dile-confirm-cancel-text-button-color: #303030;
                --dile-confirm-cancel-button-color: transparent;
            }
        `
    ];

    static get properties() {
        return {
            category: { type: Object },
            categories: { type: Object }
        };
    }

    constructor(){
        super();
        this.category = {};
        this.categories = {};
        this.name = '';
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
    }

    render() {
        return html`
            <dile-confirm 
                id="elmodal" 
                cancelLabel="Cancelar"
                acceptLabel="Eliminar"
                @dile-confirm-accepted=${this.deleteCategory}
            >
                <p>
                    ¿De verdad deseas borrar esta Categoría: <b>${this.name}</b>?
                </p>
            </dile-confirm> 
        `;
    }

    delete(category, categories) {
        this.category = category;
        this.categories = categories;
        this.name = this.category.getName();
        this.elmodal.open();
    }

    deleteCategory() {
        this.categories.splice(this.categories.indexOf(this.category), 1);
        this.dispatchModelChangedEvent();
        this.elmodal.close();
    }

    dispatchModelChangedEvent() {
        this.dispatchEvent(new CustomEvent('model-changed', {
            bubbles: true,
            composed: true,
            detail: {msg:'model-changed-category-delete',
                    category:this.category
                    }
        }));
    }

}
customElements.define('jno-category-delete', JnoCategoryDelete);