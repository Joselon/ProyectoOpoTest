import { LitElement, html, css } from 'lit';
import '../../../utils/view/html/components/jno-event-menu.js';

export class JnoCategory extends LitElement {
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
            category: { type: Object },
            actionOptions: { type: Array },
            selectedOption: { type: String},
        };
    }

    constructor(){
        super();
        this.actionOptions = ["Seleccionar","Mostrar Subcategorias"];
        this.selectedOption = "";
    }

    render() {
        return html`
        <section>
            <jno-event-menu
                title=${this.category.getName()}
                .options=${this.actionOptions} 
                selectedOption=${this.selectedOption}
                @jno-event-menu-changed=${this.changeSelectedOption}
                ></jno-event-menu>
            <ul>
                <li><b>Número de Subcategorias</b>: ${this.category.getSubcategories().length}</a></li>
                <li><b>Número de Conceptos</b>: ${this.category.getConcepts().length}</li>
                <li><b>Número de Preguntas</b>: ${this.category.getQuestions().length}</li>
            </ul>
        </section>
        `;
    }

    changeSelectedOrder(e) {
        this.selectedOrder = e.detail.selectedOption;
        //this.doAction(this.selectedAction);
    }
}
customElements.define('jno-category', JnoCategory);
