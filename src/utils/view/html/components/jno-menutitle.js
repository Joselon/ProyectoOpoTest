import { LitElement, html, css } from 'lit';


export class JnoMenuTitle extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                background-color: #735555a0;
                border:1px white solid;
                border-radius:25px;
                padding:1%;
                width: 50%;
                margin: 1% 25% 1%;
            }

            h3 {
                text-align: center;
            }
        `
    ];

    static get properties() {
        return {
            title: { type: String },
        };
    }

    constructor() {
        super();
        this.title = 'default';
    }

    render() {
        return html`
        <h3>${this.title}</h3>
        `;
    }
}
customElements.define('jno-menutitle', JnoMenuTitle);
