import {  html, css, LitElement } from 'lit';
import '../../../utils/view/html/components/jno-event-menu.js';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { doneIcon, clearIcon, priorityHighIcon } from '@dile/icons';

export class JnoAnswer extends UpdateAtModelChangedMixin(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
            }
            section {
                background-color: #f5f5f573;
                padding: 0 1rem;
                border: 2px solid #ccc;
            }
            .pending {
                --dile-icon-color: #b0ed09;
            }
            .ok {
                --dile-icon-color: #1aed3aaa;
            }
            .ko {
                --dile-icon-color: #9a1b1b91;
            } 
        `,
    ];

    static get properties() {
        return {
            element: { type: Object },
            actionOptions: { type: Array },
            icons: { type: Array },
            selectedOption: { type: String },
        };
    }

    constructor() {
        super();
        this.element = {};
        this.actionOptions = [];
        this.icons = [];
        this.selectedAction = "";
    }

    render() {
        return html`
        <section>
            <jno-event-menu
                title="${this.getTitle()}"
                .options=${this.actionOptions}
                .icons=${this.icons}
                selectedOption=${this.selectedOption}
                @jno-event-menu-changed=${this.changeSelectedOption}
                >
                 ${this._infoTemplate}
            </jno-event-menu>
        </section>
        `;
    }

    getTitle() {
        return this.element.getContent();
    }

    get _infoTemplate() {
        return html`
        <span slot="subtitle">
        ${this.element.isEvaluated() ?
                html`${(this.element.getEvaluation() ?
                    html`<dile-icon class='ok' .icon=${doneIcon}></dile-icon>`
                    : html`<dile-icon class='ko' .icon=${clearIcon}></dile-icon>`
                )}<b> (Corregido en:</b> ${this.element.getEvaluatedDateString()})`
                : html`
                    <dile-icon class='pending' .icon=${priorityHighIcon}></dile-icon>
                     <b>(Respondido en: ${this.element.getCreatedDateString()})</b>`}
                
                   <b> / Estudiante: ${this.element.getStudentName()} </b>
            
        </span>
        `;
    }

    changeSelectedOption(e) {
        this.selectedAction = e.detail.selectedOption;
        this._doAction(this.selectedAction);
    }

    _doAction(action) {
        switch (action) {
            case "Evaluar":
                this.evaluate();
                break;
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }

    evaluate() {
        this.dispatchEvent(new CustomEvent('evaluate-answer', {
            bubbles: true,
            composed: true,
            detail: this.element
        }));
    }
}
customElements.define('jno-answer', JnoAnswer);
