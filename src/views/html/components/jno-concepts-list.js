import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './jno-concept.js';

export class JnoConceptsList extends LitElement {
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
            category: { type: Object }
        };
    }

    constructor() {
        super();
        this.elements = [];
        this.userState = {};
        this.category = {};
    }

    firstUpdated() {
        this.interval = setInterval(() => {
            this.requestUpdate();
            console.log("timer concepts actualizado")
        }, 1000);
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
        this.elements = this.userState.getCurrentCategory().getAllConcepts();
        return html`
            <p>Contenidos en ${this.userState.getCurrentCategory().getName()} y sus subcategorías:</p>
            ${repeat(this.elements, (element) => html`
                    <jno-concept .concept="${element}" .userState="${this.userState}"></jno-concept>
            `)}
        `;
    }
}
customElements.define('jno-concepts-list', JnoConceptsList);
