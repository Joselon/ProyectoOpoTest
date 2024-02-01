import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat.js';


export class JnoContentsList extends LitElement {
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
        return html`
        <ul></ul>
            ${repeat(this.elements, (element) => html`
                    <li>${element.getContent()} <b style="color:red;">${!element.isFake()?'':'Fake'}</b></li>
            `)}
        </ul>
        `;
    }
}
customElements.define('jno-contents-list', JnoContentsList);
