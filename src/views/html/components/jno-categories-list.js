import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import '@dile/dile-button-icon/dile-button-icon.js';
import './jno-category.js';
import './jno-category-add.js';
import './jno-category-insert.js';
import './jno-category-edit.js';
import './jno-category-delete.js';
import { UserType } from '../../../models/UserTypes.js';

export class JnoCategoriesList extends UpdateAtModelChangedMixin(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static get properties() {
        return {
            elements: { type: Array },
            userState: { type: Object }
        };
    }

    constructor() {
        super();
        this.elements = [];
        this.userState = {};
    }

    render() {
        return html`
            ${this.template}
        `;
    }

    get template() {
        if (this.userState.getCurrentUserType() === UserType.TEACHER) {

            return html`
            <dile-button-icon 
                    @click=${this.addCategory}
                    >
                    Añadir
                </dile-button-icon>
            ${repeat(this.elements, (element) => html`
                    <jno-category
                     .category="${element}"
                     .userState="${this.userState}"
                     .actionOptions="${["Seleccionar", "Editar", "Eliminar"]}"
                     @insert-category=${this.insertCategory}
                     @edit-category=${this.editCategory}
                     @delete-category=${this.deleteCategory}
                     >
                    </jno-category>
            `)}
            <jno-category-add></jno-category-add>
            <jno-category-insert></jno-category-insert>
            <jno-category-edit></jno-category-edit>
            <jno-category-delete></jno-category-delete>
            `;
        }
        return html`
            ${repeat(this.elements, (element) => html`
            <jno-category
                     .category="${element}"
                     .userState="${this.userState}"
                     .actionOptions="${["Seleccionar"]}"
                     >
                    </jno-category>
            `)}
        `;
    }
    insertCategory(e) {
        this.shadowRoot.querySelector('jno-category-insert').insert(e.detail);
    }
    editCategory(e) {
        this.shadowRoot.querySelector('jno-category-edit').edit(e.detail);
    }
    deleteCategory(e) {
        this.shadowRoot.querySelector('jno-category-delete').delete(e.detail, this.elements);
    }
    addCategory(e) {
        this.shadowRoot.querySelector('jno-category-add').add(this.elements);
    }

}
customElements.define('jno-categories-list', JnoCategoriesList);

