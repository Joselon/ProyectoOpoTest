import { LitElement, html, css } from 'lit';
//import {unsafeHTML} from 'lit/directives/unsafe-html.js';

export class EitUser extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
            }
            section {
                background-color: #f5f5f5;
                padding: 1rem;
                border: 2px solid #ccc;
            }
            ul {
                margin: 0;
                padding: 0;
                list-style-type: none;
            }
            li {
                margin-bottom: 0.5rem;
            }
            div {
                border: 1px solid #ddd;
                background-color: #def;
                padding: 0 1rem;
            }
        `
    ];

    static get properties() {
        return {
            user: { type: Object }
        };
    }

    render() {
        return html`
        <section>
                <ul>
                    <li><b>Nombre</b>: ${this.user.name}</li>
                    <li><b>Email</b>: <a href="mailto: ${this.user.email}">${this.user.email}</a></li>
                    <li><b>Teléfono</b>: ${this.user.phone}</li>
                </ul>
            </section>
        `;
    }
}
customElements.define('eit-user', EitUser);
