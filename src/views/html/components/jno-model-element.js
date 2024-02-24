import { LitElement, html, css } from 'lit';
import '../../../utils/view/html/components/jno-event-menu.js';


export class JnoModelElement extends LitElement {
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
           
            div {
                border: 1px solid #ddd;
                background-color: #abaaaa73;
                padding: 0 1rem;
            }
        `
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

    firstUpdated() {
        this.subelementsDiv = this.shadowRoot.getElementById("subelements");
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
                 ${this._extraActionsTemplate}
            </jno-event-menu>
            ${this._subElementsTemplate}
        </section>
        `;
    }

    getTitle() {
        return 'title';
    }

    get _infoTemplate() {
        return html`
        <span slot="subtitle">
            Info
        </span>
        `;
    }

    get _extraActionsTemplate() {
        return html`
        <dile-button-icon 
                    slot="extraAction"
                    @click=${() => this.toggleDiv(this.subelementsDiv)}
                    >
                    Subelements
                </dile-button-icon>
        `;
    }
    get _subElementsTemplate() {
        return html`
        <div id="subelements">
            Subelements
        </div>
        `
    }
    changeSelectedOption(e) {
        this.selectedAction = e.detail.selectedOption;
        this._doAction(this.selectedAction);
    }

    _doAction(action) {
        switch (action) {
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }

    toggleDiv(div) {
        if (div.style.display === 'block')
            div.style.display = 'none';
        else {
            div.style.display = 'block';
            window.scrollTo({
                top: div.offsetTop,
                left: 0,
                behavior: "smooth",
            });
        }
    }

    showFeedbackError(msg) {
        this.dispatchEvent(new CustomEvent('error-feedback', {
            bubbles: true,
            composed: true,
            detail: msg
        }));
    }
    showFeedbackSuccess(data) {
        this.dispatchEvent(new CustomEvent('success-feedback', {
            bubbles: true,
            composed: true,
            detail: data
        }));
    }

    dispatchModelChangedEvent() {
        this.dispatchEvent(new CustomEvent('model-changed', {
            bubbles: true,
            composed: true,
            detail: 'model-changed'
        }));
    }
}
customElements.define('jno-model-element', JnoModelElement);
