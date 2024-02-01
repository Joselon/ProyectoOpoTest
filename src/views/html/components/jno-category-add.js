import { LitElement, html, css } from 'lit';
import { Category } from '../../../models/Category.js';
import './jno-category-form.js';

export class JnoCategoryAdd extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-modal-width: 90%;
                --dile-modal-close-icon-size: 32px;
                --dile-modal-close-icon-top: 20px;
                --dile-modal-close-icon-color: red;
            }
            h2 {
                margin-top: 0;
            }
        `
    ];

    static get properties() {
        return {
            categories: { type: Object }
        };
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elform = this.shadowRoot.getElementById('elform');
    }

    render() {
        return html`
            <dile-modal id="elmodal" showCloseIcon blocking>
                <h2>Nueva Categoría</h2>
                <jno-category-form id="elform"></jno-category-form>
                <button type="button" @click=${this.insertCategory}>Añadir</button>
            </dile-modal>
        `;
    }

    add(categories) {
        this.categories = categories;
        this.elmodal.open();
    }

    insertCategory() {
        let data = this.elform.getData();
        this.categories.push(new Category(data.name))
        this.dispatchModelChangedEvent();
        this.elform.clearData();
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
customElements.define('jno-category-add', JnoCategoryAdd);