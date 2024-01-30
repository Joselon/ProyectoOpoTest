import { LitElement, html, css } from 'lit';
import '@dile/dile-toast/dile-toast';

export class JnoFeedback extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    constructor() {
        super();
        document.addEventListener('error-feedback', this.showError.bind(this));
        document.addEventListener('success-feedback', this.showSuccess.bind(this));
    }
    
    firstUpdated() {
        this.toastElement = this.shadowRoot.getElementById('notificacion');
    }

    render() {
        return html`
            <dile-toast id="notificacion" duration="3000"></dile-toast>
        `;
    }

    showError(e) {
        this.toastElement.open(e.detail, 'error');
    }

    showSuccess(e) {
        this.toastElement.open(e.detail, 'success');
    }
}
customElements.define('jno-feedback', JnoFeedback);