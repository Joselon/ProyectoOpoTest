import {  html, css, LitElement } from 'lit';
import '@dile/dile-action-card/dile-action-card.js';
import { UpdateAtModelChangedMixin } from '../mixins/UpdateAtModelChangedMixin.js';
import { doneIcon, clearIcon, priorityHighIcon } from '@dile/icons';

export class JnoAnswer extends UpdateAtModelChangedMixin(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
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
        this.selectedOption = '';
    }

    render() {
        return html`
            <dile-action-card
                title="${this.getTitle()}"
                .options=${this.actionOptions}
                .icons=${this.icons}
                selectedOption=${this.selectedOption}
                @dile-action-card-option-selected=${this.changeSelectedOption}
                >
                 ${this.infoTemplate}
            </dile-action-card>
        `;
    }

    getTitle() {
        return this.element.getContent();
    }

    get infoTemplate() {
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
        this.selectedOption = e.detail.selectedOption;
        this.doAction(this.selectedOption);
    }

    doAction(action) {
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
