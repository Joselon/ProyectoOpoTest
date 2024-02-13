import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { repeat } from 'lit/directives/repeat.js';
import './jno-category.js';


export class JnoCategoriesList extends UpdateAtModelChangedMixin(LitElement) {

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
            ${this.mainTemplate}
        `;
    }

    get mainTemplate() {
        return html`
            ${repeat(this.elements, (element) => html`
            <jno-category
                     .element="${element}"
                     .userState="${this.userState}"
                     .actionOptions="${this.getActionOptions()}"
                     >
                    </jno-category>
            `)}
        `;
    }

    getActionOptions() {
        return ["Seleccionar"];
    }
}
customElements.define('jno-categories-list', JnoCategoriesList);

