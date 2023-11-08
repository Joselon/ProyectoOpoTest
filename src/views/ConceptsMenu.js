import { DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { Concept } from '../models/Concept.js';
import { console } from '../utils/view/console.js';

class AddConceptOption extends Option {
    #concepts;

    constructor(concepts) {
        super("Añadir Concepto");
        this.#concepts = concepts;
    }

    interact() {
        let keyword = console.readString(`
        Escribe la palabra clave del concepto:`);
        this.#concepts.push(new Concept(keyword));

    }
}

class SelectConceptOption extends Option {
    #concepts
    #index;
    #state;

    constructor(concepts, index, state) {
        super("Seleccionar ");
        this.#concepts = concepts;
        this.#index = index;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#concepts[this.#index].getKeyword()} -(${this.#concepts[this.#index].questionsSize()})`;
    }

    interact() {
        super.interact();
        this.#state.setCurrentConcept(this.#concepts[this.#index]);
    }

}


class ConceptsMenu extends DynamicMenu {

    #concepts;
    #state;

    constructor(state, concepts) {
        super("Menú de Conceptos - (Definiciones / Relaciones / Preguntas)");
        this.#concepts = concepts;
        this.#state = state;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#concepts.length; i++) {
            this.add(new SelectConceptOption(this.#concepts, i, this.#state));
        }
    }

}

export { ConceptsMenu, AddConceptOption }