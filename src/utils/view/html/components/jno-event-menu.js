import { LitElement, html, css } from 'lit';

export class JnoEventMenu extends LitElement {
    static styles = [
        css`
             :host {
                display: block;
                margin-bottom: 1rem;
            }
            ul {
                display: flex;
                margin: 0;
                padding: 0;
            }
            li {
                padding: 0.5em;
                border: 1px solid #ccc;
                background-color: #eee;
                list-style-type: none;
                margin-right: 0.5em;
                min-width: 1em;
                text-align: center;
            }               
            li.selected {
                background-color: #6033dd;
                color: #fff;
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
        <ul>
                ${this.options.map(option => html`
                    <li 
                        @click=${() => this.setOption(option)}
                        class="${this.selectedOption == option ? 'selected' : ''}"
                    >${option}</li>
                `)}
            </ul>
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
