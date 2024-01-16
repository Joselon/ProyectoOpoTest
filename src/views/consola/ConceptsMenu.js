import { DynamicMenu, Option, QuitOption } from "../../utils/view/consola/Menu.js";
import { Concept } from '../../models/Concept.js';
import { console } from '../../utils/view/consola/console.js';

class AddConceptOption extends Option {
    #concepts;
    #userState;

    constructor(title, concepts, userState) {
        super(title);
        this.#concepts = concepts;
        this.#userState = userState;
    }

    interact() {
        let keyword = console.readString(`
        Escribe la palabra clave del concepto:`);
        this.#concepts.push(new Concept(keyword));
        this.#userState.setCurrentConcept(this.#concepts[this.#concepts.length - 1]);
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
        return `${super.getTitle()}: ${this.#concept.getKeyword()} -(${this.#concept.getNumberOfDefinitions()}/${this.#concept.getNumberOfRelations()})`;
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
            console.writeln(`- "${definition.getContent()}" - ${definition.isFake() ? "Falsa" : "OK"}`);
        console.writeln("Relaciones:");
        for (let relation of this.#concept.getRelations())
            console.writeln(`- "${relation.getContent()}"`);
        console.writeln("Palabras clave falsas relacionadas:");
        for (let fakeKeyword of this.#concept.getFakeKeywords())
            console.writeln(`- "${fakeKeyword}"`);
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


class ConceptsMenu extends DynamicMenu {
    #userState;

    constructor(userState) {
        super(`Menú de Conceptos de la Categoría - (Definiciones / Relaciones)`);
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
        this.add(new AddConceptOption(`-- Añadir Concepto a ${this.#userState.getCurrentCategory().getName()}`, concepts, this.#userState));
        if (this.#userState.getCurrentConcept().getKeyword() !== '---') {
            this.add(new ModifyConceptOption(`* Modificar Concepto Seleccionado: ${this.#userState.getCurrentConcept().getKeyword()}`, this.#userState.getCurrentConcept()));
        }

        this.add(new QuitOption());
    }

}

export { ConceptsMenu, AddConceptOption }