import { html } from 'lit';
import { JnoCategory } from './jno-category.js';
import './jno-categories-teacher-list.js'

export class JnoCategoryTeacher extends JnoCategory {

    get _infoTemplate() {
        return html`
        <span slot="subtitle">
            <b>Conceptos</b>: ${this.element.getConceptsArray().length}
            / <b> Preguntas</b>: ${this.element.getQuestions().length}
        </span>
        `;
    }
    get _subElementsTemplate() {
        return html`
        <div id="subcategories">
            <jno-categories-teacher-list
             .elements=${this.element.getSubcategories()}
             .userState=${this.userState}
             hasAncestor
             ></jno-categories-teacher-list>
        </div>
        `
    }

    _doAction(action) {
        switch (action) {
            case "Seleccionar":
                this.userState.setCurrentCategory(this.element);
                this.userState.resetConceptSelected();
                this.dispatchModelChangedEvent();
                this.showFeedbackSuccess(`Cargados CONCEPTOS y PREGUNTAS`);
                break;
            case "Añadir":
                this.insert();
                break;
            case "Editar":
                this.edit();
                break;
            case "Eliminar":
                this.delete();
                break;
            default:
                this.showFeedbackError(`ERROR: Aún no disponible...`);
        }
    }

    insert() {
        this.dispatchEvent(new CustomEvent('insert-category', {
            detail: this.element
        }));
    }

    edit() {
        this.dispatchEvent(new CustomEvent('edit-category', {
            detail: this.element
        }));
    }

    delete() {
        this.dispatchEvent(new CustomEvent('delete-category', {
            detail: this.element
        }));
    }
}
customElements.define('jno-category-teacher', JnoCategoryTeacher);
