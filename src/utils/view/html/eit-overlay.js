import { LitElement, html, css } from 'lit';

export class EitOverlay extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                position: relative;
            }

            .overlay {
                display: none;
                position: absolute;
                z-index:99;
                background-color: var(--eit-overlay-bg-color,beige);
                padding: 1rem;
                border: 1px solid #ddd;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                width: 100%;
                height:auto;
            }

            .opened {
                display: block;
            }

            ::slotted(div) {
                font-weight:bolder;
            }

            ::slotted(span) {
                font-weight: bolder;
                background-color: white;
            }
        `
    ];

    static get properties() {
        return {
            opened: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.opened = false;
        this.clickHandler = this.close.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.clickHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.clickHandler);
    }

    render() {
        return html`
        <span @click=${this.toggle}>
            <slot name="trigger"></slot>
        </span>
        <div class="overlay ${this.opened ? 'opened' : ''}">
            <slot name="overlay"></slot>
        </div>
        `;
    }

    toggle(e) {
        this.opened = !this.opened;
        e.stopPropagation();
        //e.preventDefault(); //Si fuera a href por ejemplo
    }

    close() {
        this.opened = false;
    }
}
customElements.define('eit-overlay', EitOverlay);
