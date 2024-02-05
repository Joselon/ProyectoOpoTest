import { LitElement, html, css } from 'lit';
import './jno-category-form.js';

export class JnoAnswerInsert extends LitElement {
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
        question: { type: Object },
        username: { type: String }
      };
    }

    firstUpdated() {
        this.elmodal = this.shadowRoot.getElementById('elmodal');
        this.elinput = this.shadowRoot.getElementById('elinput');
    }

    render() {
        return html`
            <dile-modal id="elmodal" showCloseIcon blocking>
                <h2>Respuesta:</h2>
                <dile-input id="elinput"></dile-input>
                <button type="button" @click=${this.insertAnswer}>Guardar</button>
            </dile-modal>
        `;
    }

    insert(question, username) {
        this.question = question;
        this.username = username;
        this.elmodal.open();
    }

    insertAnswer() {
        this.question.addAnswer(this.username, this.elinput.value);
        this.dispatchModelChangedEvent();
        this.elinput.value='';
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
customElements.define('jno-answer-insert', JnoAnswerInsert);