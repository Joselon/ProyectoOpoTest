import { LitElement, html, css } from 'lit';
import '../../../utils/view/html/components/dile-action-card.js';


export class JnoModelElement extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin-bottom: 1rem;
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
        this.selectedOption = "";
    }

    firstUpdated() {
        this.subelementsDiv = this.shadowRoot.getElementById("subelements");
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
                 ${this._infoTemplate}
                 ${this._subCardsButtonTemplate}
                 ${this._subElementsTemplate}
            </dile-action-card>
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

    get _subCardsButtonTemplate() {
        return html`
        <dile-button-icon 
                    slot="subCardsButton"
                    @click=${() => this.toggleDiv(this.subelementsDiv)}
                    >
                    ToogleSubelements
        </dile-button-icon>
            
        `;
    }
    get _subElementsTemplate() {
        return html`
        <div slot="subCards" id="subelements">
            Subelements
        </div>
        `
    }

    changeSelectedOption(e) {
        e.preventDefault();
        e.stopPropagation();
        this.selectedOption = e.detail.selectedOption;
        this._doAction(this.selectedOption);
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
