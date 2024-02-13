import { html, css } from 'lit';
import { JnoModelElement } from './jno-model-element.js'
import './jno-answer-insert.js';

export class JnoQuestion extends JnoModelElement {
    static styles = [
        JnoModelElement.styles,
        css`
            #answers {
                display: none;
            }
        `
    ];

    static get properties() {
        return {
            userState: { type: Object },
        };
    }

    constructor() {
        super();
        this.userState = {};

    }

    getTitle() {
        return `¿${this.element.getStatement()}?`;
    }

    get _infoTemplate() {
        return html``;
    }

    get _extraActionsTemplate() {
        return html`
        `;
    }
    get _subElementsTemplate() {
        return html``;
    }

    _doAction(action) {
        if (action === "Responder") {
            this.insert();
        }
        else {
            this.showFeedbackError("PENDIENTE HABILITAR FUNCIONALIDAD");
        }
    }

    insert() {
        this.dispatchEvent(new CustomEvent('insert-answer', {
            detail: this.element
        }));
    }
}
customElements.define('jno-question', JnoQuestion);
