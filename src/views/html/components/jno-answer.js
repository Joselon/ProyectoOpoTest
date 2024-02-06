import { LitElement, html, css } from 'lit';
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
                background-color: #b0ed09;
            }
            .ok {
                background-color: #1aed3aaa;
            }
            .ko {
                background-color: #9a1b1b91;
            }
            
        `
    ];

    static get properties() {
        return {
            answer: { type: Object },
        };
    }

    constructor() {
        super();
        this.answer = {};
    }
    //Dar formato y poner botones corregir
    render() {
        return html`
        <section>
            <main class=${this.answer.isEvaluated() ? (this.answer.getEvaluation() ? 'ok' : 'ko') : 'pending'}>
                ${this.answer.getContent()}
            </main>
            <aside>
                ${this.answer.isEvaluated() ?
                html`${(this.answer.getEvaluation() ?
                    html`${doneIcon}`
                    : html`${clearIcon}`
                )}<small> (Corregido en: ${this.answer.getEvaluatedDateString()})</small>`
                : html`
                    ${priorityHighIcon}<button @click=${this.evaluate}>EVALUAR</button>
                     <small>(Respondido en: ${this.answer.getCreatedDateString()})</small>`}
                
                   <small> / Estudiante: ${this.answer.getStudentName()} </small>
                
            </aside>
        </section>
        `;
    }

    evaluate() {
        this.dispatchEvent(new CustomEvent('evaluate-answer', {
            bubbles: true,
            composed: true,
            detail: this.answer
        }));
    }
}
customElements.define('jno-answer', JnoAnswer);
