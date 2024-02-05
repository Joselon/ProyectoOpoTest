import { LitElement, html, css } from 'lit';
import { DileFormMixin } from '@dile/dile-form-mixin';
//Importar contents-list para mostrar definicions

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
          <dile-input label="Definiciones" name="definitions" id="definitions" disabled></dile-input>
        `;
  }

  getData() {
    let data = {};
    this.allNodeElements.forEach(node => {
      data[node.getAttribute('name')] = node.value;
    });
    return data;
  }

  //Redefinir para concepto con definiciones, relaciones y sinonimos
  setData(data) {
    this.allNodeElements.forEach(node => {
      if (data[node.getAttribute('name')] !== undefined) {
        if (typeof node.set === "function") {
          node.set(data[node.getAttribute('name')]);
        } else {
          node.value = data[node.getAttribute('name')];
        }

      }
    });
  }

}
customElements.define('jno-concept-form', JnoConceptForm);