import { LitElement, html, css } from 'lit';
import '@dile/dile-confirm/dile-confirm';

export class JnoConceptDelete extends LitElement {
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
            concept: { type: Object },
            concepts: { type: Object }
        };
    }

    constructor() {
        super();
        this.concept = {};
        this.keyword = '';
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
                @dile-confirm-accepted=${this.deleteConcept}
            >
                <p>
                    ¿De verdad deseas borrar este Concepto: <b>${this.keyword}</b>?
                </p>
            </dile-confirm> 
        `;
    }

    delete(concept, concepts) {
        this.concept = concept;
        this.concepts = concepts;
        this.keyword = concept.getKeyword();
        this.elmodal.open();
    }

    deleteConcept() {
        this.concepts.splice(this.concepts.indexOf(this.concept), 1);
        this.dispatchModelChangedEvent();
        //TODO: Evento para borrar preguntas relacionadas y actualizar indice del resto
        this.elmodal.close();
    }

    dispatchModelChangedEvent() {
        this.dispatchEvent(new CustomEvent('model-changed', {
            bubbles: true,
            composed: true,
            detail: {
                msg: 'model-changed-concept-delete',
                concept: this.concept
            }
        }));
    }

}
customElements.define('jno-concept-delete', JnoConceptDelete);