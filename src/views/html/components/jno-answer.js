import { LitElement, html, css } from 'lit';

export class JnoAnswer extends LitElement {
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
                background-color: transparent;
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

    constructor(){
        super();
        this.answer = {};
    }

    render() {
        return html`
        <section>
            <main class=${this.answer.isEvaluated()?(this.answer.getEvaluation()?'ok':'ko'):'pending'}>
                ${this.answer.getContent()}
            </main>
            <aside>
                <b>${this.answer.isEvaluated()?(this.answer.getEvaluation()?'OK':'MAL'):'Pendiente Evaluar'}</b>
            </aside>
        </section>
        `;
    }
}
customElements.define('jno-answer', JnoAnswer);
