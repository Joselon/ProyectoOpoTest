import { LitElement, html, css } from 'lit';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { UserType } from '../../../models/UserTypes';
export class JnoUserState extends UpdateAtModelChangedMixin(LitElement) {
    static styles = [
        css`
            :host {
                display:flex; 
                flex-direction: column;
                flex-wrap: wrap;
                justify-content: flex-end;
            }

            p {
                margin:0.5rem;
            }
            span {
                background-color: white;
                border-radius: 0.5rem;
                padding:0.5rem;
            }
            @media (max-width: 500px){
               :host { 
                font-size: xx-small;
                flex-direction: row;
               }
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

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('success-feedback', this.stateUpdate.bind(this));
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
