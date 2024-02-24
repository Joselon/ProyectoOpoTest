import { LitElement, html } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import { radioCheckedIcon, addIcon, editIcon, deleteIcon } from '@dile/icons';
import './jno-concept.js';
import './jno-concept-add.js';
import './jno-concept-edit.js';
import './jno-concept-delete.js';

export class JnoConceptsList extends UpdateAtModelChangedMixin(LitElement) {

    static get properties() {
        return {
            elements: { type: Array },
            userState: { type: Object },
        };
    }

    constructor() {
        super();
        this.elements = [];
        this.userState = {};
    }

    render() {
        return html`
            ${this.headerTemplate}
            ${this.mainTemplate}
        `;
    }

    get headerTemplate() {
        if (this.userState.getCurrentCategory().getName() === '---') {
            return html`<p>Debe seleccionar una categoría</p>`;
        }
        return html`
            <p>Contenidos en la categoría <b>${this.userState.getCurrentCategory().getName()}</b> (sin subcategorías):</p>
            <dile-button-icon 
                    .icon = "${addIcon}"
                   @click=${this.addConcept}
                 >
                 Añadir
            </dile-button-icon>
        `;
    }

    get mainTemplate() {
        return html`
            ${repeat(this.elements, (element) => {
            return html`
                    <jno-concept 
                        .element="${element}"
                        .userState="${this.userState}"
                        .actionOptions="${this.getActionOptions()}"
                        .icons = "${this.getActionIcons()}"
                        @edit-concept=${this.editConcept}
                        @delete-concept=${this.deleteConcept}
                    ></jno-concept>
            `})}
            <jno-concept-edit></jno-concept-edit>
            <jno-concept-delete></jno-concept-delete>
            <jno-concept-add></jno-concept-add>
        `;
    }
    getActionOptions() {
        return ["Seleccionar", "Editar", "Eliminar"];
    }
    getActionIcons() {
        return [radioCheckedIcon, editIcon, deleteIcon];
    }
    addConcept() {
        this.shadowRoot.querySelector('jno-concept-add').add(this.userState.getCurrentCategory());
    }
    editConcept(e) {
        this.shadowRoot.querySelector('jno-concept-edit').edit(e.detail, this.userState.getCurrentCategory());
    }
    deleteConcept(e) {
        this.shadowRoot.querySelector('jno-concept-delete').delete(e.detail, this.userState.getCurrentCategory());
    }
    stateUpdate(e) {
        this.elements = this.userState.getCurrentCategory().getConceptsArray();
        //super.stateUpdate(e);
    }
}
customElements.define('jno-concepts-list', JnoConceptsList);
