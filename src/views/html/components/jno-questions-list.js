import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-question.js';
import './jno-answer-insert.js';
import { UserType } from '../../../models/UserTypes.js';

export class JnoQuestionsList extends UpdateAtModelChangedMixin(LitElement) {
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
        this.elements = [];
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
        this.elements = this.userState.getCurrentCategory().getAllQuestions();
        let actionOptions = ["Responder"];
        let message = html`<p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> y en sus subcategorías</p>`;
        if (this.userState.getCurrentUserType() === UserType.TEACHER) {
            actionOptions = ["Desactivar"];
            message = html`<p>Contenidas en <b>${this.userState.getCurrentCategory().getName()}</b> (sin subcategorías)</p>`;
            this.elements = this.userState.getCurrentCategory().getQuestions();
        }
        return html`
            ${message}
            ${repeat(this.elements, (element) => html`
                    <jno-question 
                        .question="${element}"
                        .userState="${this.userState}"
                        .actionOptions="${actionOptions}"
                        @insert-answer= ${this.insertAnswer}
                        >
                    </jno-question>
            `)}
            <jno-answer-insert></jno-answer-insert>
        `;
    }
    insertAnswer(e) {
        this.shadowRoot.querySelector('jno-answer-insert').insert(e.detail);
    }
}
customElements.define('jno-questions-list', JnoQuestionsList);
