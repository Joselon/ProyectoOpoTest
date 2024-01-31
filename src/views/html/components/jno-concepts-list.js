import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-concept.js';

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
