import { DynamicQuitMenu, Option } from "../utils/view/Menu.js";
import { Concept } from '../models/Concept.js';
import { console } from '../utils/view/console.js';

class AddConceptOption extends Option {
    #concepts;

    constructor(title, concepts) {
        super(title);
        this.#concepts = concepts;
    }

    interact() {
        let keyword = console.readString(`
        Escribe la palabra clave del concepto:`);
        this.#concepts.push(new Concept(keyword));

    }
}

class SelectConceptOption extends Option {
    #concept
    #userState;

    constructor(concept, userState) {
        super("Seleccionar ");
        this.#concept = concept;
        this.#userState = userState;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#concept.getKeyword()} -(${this.#concept.getNumberOfDefinitions()}/${this.#concept.getNumberOfRelations()}/${this.#concept.getNumberOfQuestions()})`;
    }

    interact() {
        super.interact();
        this.#userState.setCurrentConcept(this.#concept);
    }

}

class ShowConceptOption extends Option {
    #concept

    constructor(title, concept) {
        super(title);
        this.#concept = concept;
    }

    interact() {
        super.interact();
        console.writeln("\nDefiniciones:");
        for (let definition of this.#concept.getDefinitions())
            console.writeln(`- "${definition.getContent()}" - ${definition.isFake() ? "Falsa" : ""}`);
        console.writeln("Relaciones:");
        for (let relation of this.#concept.getRelations())
            console.writeln(`- "${relation.getContent()}"`);
    }

}

class ModifyConceptOption extends Option {
    #concept

    constructor(title, concept) {
        super(title);
        this.#concept = concept;
    }

    interact() {
        super.interact();
        console.writeln("\nDefiniciones:");
        for (let definition of this.#concept.getDefinitions())
            console.writeln(`- "${definition.getContent()}" - ${definition.isFake() ? "Falsa" : ""}`);
        console.writeln("Relaciones:");
        for (let relation of this.#concept.getRelations())
            console.writeln(`- "${relation.getContent()}"`);
    }

}


class ConceptsMenu extends DynamicQuitMenu {
    #userState;

    constructor(userState) {
        super("Menú de Conceptos - (Definiciones / Relaciones / Preguntas)");
        this.#userState = userState;
    }

    addOptions() {
        let concepts = this.#userState.getCurrentCategory().getConcepts();
        for (let i = 0; i < concepts.length; i++) {
            this.add(new SelectConceptOption(concepts[i], this.#userState));
            if (concepts[i].getNumberOfDefinitions() > 0 || concepts[i].getNumberOfRelations() > 0) {
                this.add(new ShowConceptOption(`- Mostrar Concepto ${concepts[i].getKeyword()}...`, concepts[i]));
            }
        }
        this.add(new AddConceptOption(`Añadir Concepto a ${this.#userState.getCurrentCategory().getName()}`, concepts));
        if (this.#userState.getCurrentConcept().getKeyword() !== '---') {
            this.add(new ModifyConceptOption(`* Modificar Concepto Seleccionado: ${this.#userState.getCurrentConcept().getKeyword()}`, this.#userState.getCurrentConcept()));
        }
    }

}

export { ConceptsMenu, AddConceptOption }