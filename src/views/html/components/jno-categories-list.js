import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-category.js';
import './jno-category-insert.js';
import './jno-category-edit.js';
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
            return html`${repeat(this.elements, (element) => html`
                    <jno-category
                     .category="${element}"
                     .userState="${this.userState}"
                     .actionOptions="${["Seleccionar", "Añadir", "Editar", "Eliminar"]}"
                     @insert-category=${this.insertCategory}
                     @edit-category=${this.editCategory}
                     >
                    </jno-category>
            `)}
            <jno-category-insert></jno-category-insert>
            <jno-category-edit></jno-category-edit>
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
}
customElements.define('jno-categories-list', JnoCategoriesList);

