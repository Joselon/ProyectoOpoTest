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

    constructor(){
        super();
        document.addEventListener('success-feedback', this.stateUpdate.bind(this));
    }

    render() {
        return html`
            <p>Usuario: ${this.userState.getCurrentUserName()} ${this.userState.getCurrentUserTypeName()}</p>
            <p>Categoría: ${this.userState.getCurrentCategory().getName()}</p>
            <p>Concepto: ${this.userState.getCurrentConcept().getKeyword()}</p>
        `;
    }
    stateUpdate(e) {
        this.requestUpdate();
    }

}
customElements.define('jno-user-state', JnoUserState);
