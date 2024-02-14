import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';


export class JnoDefinitionsList extends UpdateAtModelChangedMixin(LitElement) {
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
        };
    }

    constructor() {
        super();
        this.elements = [];
    }
    render() {
        return html`
            ${this.template}
            `;
    }
    get template() {
        return html`
        <ul></ul>
            ${repeat(this.elements, (element) => html`
                    <li>${element.getContent()} <b style="color:red;">${!element.isFake()?'':'Fake'}</b></li>
            `)}
        </ul>
        `;
    }
}
customElements.define('jno-definitions-list', JnoDefinitionsList);
