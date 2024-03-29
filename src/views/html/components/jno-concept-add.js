import { LitElement, html, css } from 'lit';
import { Concept } from '../../../models/Concept.js';
import './jno-concept-form.js';

export class JnoConceptAdd extends LitElement {
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
            category: { type: Object }
        };
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elform = this.shadowRoot.getElementById('elform');
    }

    render() {
        return html`
            <dile-modal id="elmodal" showCloseIcon blocking>
                <h2>Nuevo Concepto</h2>
                <jno-concept-form id="elform"></jno-concept-form>
                <button type="button" @click=${this.insertConcept}>Añadir</button>
            </dile-modal>
        `;
    }

    add(category) {
        this.category = category;
        this.elmodal.open();
    }

    insertConcept() {
        let data = this.elform.getData();
        //Redefinir para concepto con definiciones, relaciones y sinonimos
        this.category.addConcept(new Concept(data.keyword));
        
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
customElements.define('jno-concept-add', JnoConceptAdd);