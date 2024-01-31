import { LitElement, html, css } from 'lit';
import { UserType } from '../../../models/UserTypes';
export class JnoUserState extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            span {
                background-color: white;
                border-radius: 5px;
                padding:5px;
            }
        `
    ];

    static get properties() {
        return {
            userState: { type: Object },
        };
    }

    constructor() {
        super();
        document.addEventListener('success-feedback', this.stateUpdate.bind(this));
    }

    render() {
        return html`
            <p>Usuario: <span><i>${this.userState.getCurrentUserTypeName()}</i> <b>${this.userState.getCurrentUserName()}</b></span></p>
            <p>Categoría: <span>${this.userState.getCurrentCategory().getName()}</span></p>
            ${this.teacherTemplate}
        `;
    }

    get teacherTemplate() {
        if (this.userState.getCurrentUserType() === UserType.TEACHER) {
            return html`<p>Concepto: <span>${this.userState.getCurrentConcept().getKeyword()}</span></p>`
        }
        return html``;
    }

    stateUpdate(e) {
        this.requestUpdate();
    }

}
customElements.define('jno-user-state', JnoUserState);
