import { LitElement, html, css } from 'lit';
import '@dile/dile-button-icon/dile-button-icon.js';

export class JnoEventMenu extends LitElement {
    static styles = [
        css`
             :host {
                display: block;
                margin-bottom: 1rem;
            }
        `
    ];

    static get properties() {
        return {
            title: {type: String},
            options: { type: Array },
            selectedOption: {
                type: String,
            },
        };
    }

    constructor() {
        super();
        this.title = '';
        this.options = [];
        this.selectedOption = 0;
    }

    render() {
        return html`
        <h3> ${this.title} </h3>
                ${this.options.map(option => html`
                    <dile-button-icon
                        @click=${() => this.setOption(option)}
                    >${option}</dile-button-icon>
                `)}
        `;
    }
    setOption(option) {
        this.selectedOption = option;
        this.dispatchEvent(new CustomEvent('jno-event-menu-changed', {
            bubbles: true,
            composed: true,
            detail: {
                selectedOption: this.selectedOption,
            }
        }));
    }
}
customElements.define('jno-event-menu', JnoEventMenu);
