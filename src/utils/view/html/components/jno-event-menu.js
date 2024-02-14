import { LitElement, html, css } from 'lit';
import '@dile/dile-button-icon/dile-button-icon.js';

export class JnoEventMenu extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
            }
            #header {
                display: flex;
                justify-content: flex-start;
                align-content: flex-start;
                flex-wrap: wrap;
                flex-direction: column-reverse;
            }
            ::slotted(span) {
                font-size: small;
            }
            ::slotted(dile-button-icon) {
                --dile-button-border-color: #666;
                --dile-button-hover-border-color: #ff910f;
                --dile-button-background-color: #491449;
                --dile-button-hover-background-color: #f3c6f3;
                --dile-button-text-color:  #fff; 
                --dile-button-hover-text-color:  #000; 
                --dile-button-font-weight: bold;
                --dile-button-ring-color: #cc5099;
                --dile-button-ring-offset-width: 2px;
                --dile-button-border-radius: 8px;
                --dile-button-text-transform: uppercase;
            }

            #buttons {
                margin-bottom:1rem;
                display: flex;
                flex-wrap: wrap;
            }

            dile-button-icon {
                --dile-button-border-radius: 15px;
                margin-left: 1px;
            }
        `
    ];

    static get properties() {
        return {
            title: { type: String },
            options: { type: Array },
            selectedOption: { type: String },
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
        <div id="header">
            <h3>${this.title}</h3>
            <slot name="subtitle"></slot>
        </div>
        <div id="buttons">
                ${this.options.map(option => html`
                    <dile-button-icon
                        @click=${() => this.setOption(option)}
                    >${option}</dile-button-icon>
                `)}
        </div>
        <slot name="extraAction"></slot>
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
