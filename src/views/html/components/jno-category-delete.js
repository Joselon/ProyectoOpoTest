import { LitElement, html, css } from 'lit';
import '@dile/dile-confirm/dile-confirm';
import './jno-category-form.js';
import { Category } from '../../../models/Category.js';

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
                    ¿De verdad deseas borrar esta Categoría?
                </p>
            </dile-confirm> 
        `;
    }

    delete(category, categories) {
        this.category = category;
        this.categories = categories;
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
            detail: 'model-changed'
        }));
    }

}
customElements.define('jno-category-delete', JnoCategoryDelete);