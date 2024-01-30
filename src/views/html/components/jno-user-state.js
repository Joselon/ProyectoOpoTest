import { LitElement, html, css } from 'lit';

export class JnoUserState extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    static get properties() {
        return {
            userState: { type: Object },
        };
    }

    firstUpdated() {
        this.interval = setInterval(() => {
            this.requestUpdate();
            //console.log("timer actualizado")
        }, 100);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.interval);
    }

    render() {
        return html`
            <p>Usuario: ${this.userState.getCurrentUserName()} ${this.userState.getCurrentUserTypeName()}</p>
            <p>Categoría: ${this.userState.getCurrentCategory().getName()}</p>
            <p>Concepto: ${this.userState.getCurrentConcept().getKeyword()}</p>
        `;
    }
}
customElements.define('jno-user-state', JnoUserState);
