import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { autoAwesomeIcon } from '@dile/icons';

import './jno-answer.js';

export class JnoAnswersList extends LitElement {
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
        this.icons = [];
        this.userState = {};
    }
    render() {
        return html`
            ${this.template}
            `;
    }
    get template() {
        return html`
            ${repeat(this.elements, (element) => html`
                    <jno-answer
                     .element=${element}
                     .actionOptions="${this.getActionOptions(element.isEvaluated())}"
                     .icons="${this.icons}"
                     ></jno-answer>
            `)}
        `;
    }
    getActionOptions(isEvaluated) {
        if (!isEvaluated) {
            this.icons = [autoAwesomeIcon];
            return ["Evaluar"];
        }
        return [];

    }

}
customElements.define('jno-answers-list', JnoAnswersList);
