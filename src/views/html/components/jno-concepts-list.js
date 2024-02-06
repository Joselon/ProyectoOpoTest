import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-concept.js';
import './jno-concept-edit.js';
import './jno-concept-delete.js';
import './jno-concept-add.js';

export class JnoConceptsList extends UpdateAtModelChangedMixin(LitElement) {
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
            userState: { type: Object },
        };
    }

    constructor() {
        super();
        this.elements = new Map();
        this.userState = {};
    }
    render() {
        return html`
            ${this.template}
        `;
    }

    get template() {
        if (this.userState.getCurrentCategory().getName() === '---') {
            return html`<p>Debe seleccionar una categoría</p>`;
        }
        this.elements = this.userState.getCurrentCategory().getConceptsArray();
        return html`
            <p>Contenidos en la categoría <b>${this.userState.getCurrentCategory().getName()}</b> (sin subcategorías):</p>
            <dile-button-icon 
                   @click=${this.addConcept}
                 >
                 Añadir
                 </dile-button-icon>
            ${repeat(this.elements, (element) => {
                return html`
                    <jno-concept 
                        .concept="${element}"
                        .userState="${this.userState}"
                        @edit-concept=${this.editConcept}
                        @delete-concept=${this.deleteConcept}
                    ></jno-concept>
            `})}
            <jno-concept-edit></jno-concept-edit>
            <jno-concept-delete></jno-concept-delete>
            <jno-concept-add></jno-concept-add>
        `;
    }
    editConcept(e) {
        this.shadowRoot.querySelector('jno-concept-edit').edit(e.detail, this.userState.getCurrentCategory());
    }
    deleteConcept(e) {
        this.shadowRoot.querySelector('jno-concept-delete').delete(e.detail,this.userState.getCurrentCategory());
    }
    addConcept() {
        this.shadowRoot.querySelector('jno-concept-add').add(this.userState.getCurrentCategory());
    }
}
customElements.define('jno-concepts-list', JnoConceptsList);
