import { LitElement, html, css } from 'lit';
import { DileFormMixin } from '@dile/dile-form-mixin';

export class JnoConceptForm extends DileFormMixin(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
            <dile-input label="Palabra Clave" name="keyword" id="keyword"></dile-input>
            <dile-input label="Definiciones" name="definitions" id="definitions"></dile-input>
        `;
    }

}
customElements.define('jno-concept-form', JnoConceptForm);