import { LitElement, html, css } from 'lit';
import { DileFormMixin } from '@dile/dile-form-mixin';

export class JnoCategoryForm extends DileFormMixin(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
            <dile-input label="Nombre" name="name" id="name"></dile-input>
        `;
    }

}
customElements.define('jno-category-form', JnoCategoryForm);