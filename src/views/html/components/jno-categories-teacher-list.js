import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import { radioCheckedIcon, addIcon, editIcon, deleteIcon } from '@dile/icons';
import './jno-category-teacher.js';
import './jno-category-add.js';
import './jno-category-insert.js';
import './jno-category-edit.js';
import './jno-category-delete.js';

export class JnoCategoriesTeacherList extends UpdateAtModelChangedMixin(LitElement) {

    static get properties() {
        return {
            elements: { type: Array },
            userState: { type: Object },
            hasAncestor: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.elements = [];
        this.userState = {};
        this.hasAncestor = false;
    }

    render() {
        return html`
            ${this.headerTemplate}
            ${this.mainTemplate}
        `;
    }

    get headerTemplate() {
        let buttonHTML = '';
        if (this.elements.length !== 0 || !this.hasAncestor) {
            buttonHTML = html`
             <dile-button-icon 
              .icon = "${addIcon}"
               @click=${this.addCategory}
             >
             Añadir
             </dile-button-icon>`;
        }
        return html`${buttonHTML}`
    }

    get mainTemplate() {
        return html`
        ${repeat(this.elements, (element) => {
            return html`
                <jno-category-teacher
                 .element="${element}"
                 .userState="${this.userState}"
                 .actionOptions="${this.getActionOptions(element.getSubcategories().length)}"
                 .icons="${this.getActionIcons(element.getSubcategories().length)}"
                 @insert-category=${this.insertCategory}
                 @edit-category=${this.editCategory}
                 @delete-category=${this.deleteCategory}
                 >
                </jno-category-teacher>
            `;
        })}
        <jno-category-add></jno-category-add>
        <jno-category-insert></jno-category-insert>
        <jno-category-edit></jno-category-edit>
        <jno-category-delete></jno-category-delete>
        `;
    }

    getActionOptions(numberOfSubElements) {
        let actionOptions = [];
        if (numberOfSubElements === 0) {
            actionOptions = ["Seleccionar", "Añadir", "Editar", "Eliminar"];
        }
        else {
            actionOptions = ["Seleccionar", "Editar", "Eliminar"];
        }
        return actionOptions;
    }
    getActionIcons(numberOfSubElements) {
        let actionIcons = [];
        if (numberOfSubElements === 0) {
            actionIcons = [radioCheckedIcon, addIcon, editIcon, deleteIcon];;
        }
        else {
            actionIcons = [radioCheckedIcon, editIcon, deleteIcon];;
        }
        return actionIcons;
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
    addCategory() {
        this.shadowRoot.querySelector('jno-category-add').add(this.elements);
    }

}
customElements.define('jno-categories-teacher-list', JnoCategoriesTeacherList);

