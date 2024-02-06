import { LitElement, html, css } from 'lit';
import './jno-concept-form.js';

export class JnoConceptEdit extends LitElement {
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
            concept: { type: Object }
        };
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elform = this.shadowRoot.getElementById('elform');
    }

    render() {
        return html`
            <dile-modal id="elmodal" showCloseIcon blocking>
                <h2>Editar</h2>
                <jno-concept-form id="elform"></jno-concept-form>
                <button type="button" @click=${this.updateConcept}>Actualizar</button>
                <small> Este cambio requiere Salir de la aplicación </small>
            </dile-modal>
        `;
    }

    edit(concept, category) {
        this.elform.setData(concept.formatConceptObject());
        this.concept = concept;
        this.category = category;
        this.elmodal.open();
    }

    updateConcept() {
        let data = this.elform.getData();
        this.category.updateConcept(this.concept,data.keyword);
        this.dispatchModelChangedEvent();
        this.elform.clearData();
        this.elmodal.close();
        location.reload();
    }

    dispatchModelChangedEvent() {
        this.dispatchEvent(new CustomEvent('model-changed', {
            bubbles: true,
            composed: true,
            detail: 'model-changed'
        }));
    }

}
customElements.define('jno-concept-edit', JnoConceptEdit);