import { DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';
import { Category } from "../models/Category.js";
import { Concept } from '../models/Concept.js'
//import { InIntervalDialog } from "../utils/view/Dialog.js";

//Teacher Options
class AddCategoryOption extends Option {
    #categories;

    constructor(categories) {
        super("Añadir Categoría");
        this.#categories = categories;
    }

    interact() {
        super.interact();
        let name = console.readString(`
        Escribe el nombre de la categoría:`);
        let index = console.readNumber(`Escribe la categoría a la que pertenece (0 default): `)
        if (index === 0)
            this.#categories.push(new Category(name, this.#categories[0].getAncestor()));
        else
            this.#categories[index - 1].addSubcategory(new Category(name, this.#categories[index - 1]))
    }
}

class AddConceptOption extends Option {
    #concepts;

    constructor(concepts) {
        super("Añadir Concepto");
        this.#concepts = concepts;
    }

    interact() {
        super.interact();
        let keyword = console.readString(`
        Escribe la palabra clave del concepto:`);
        this.#concepts.push(new Concept(keyword));

    }
}

class SelectCategoryOption extends Option {
    #categories
    #index;
    #state;

    constructor(categories, index, state) {
        super("Seleccionar ");
        this.#categories = categories;
        this.#index = index;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#categories[this.#index].getName()} -(${this.#categories[this.#index].subcategoriesSize()}/${this.#categories[this.#index].conceptsSize()}/${this.#categories[this.#index].questionsSize()})`;
    }

    interact() {
        super.interact();
        this.#state.setCurrentCategory(this.#categories[this.#index]);
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
        if (this.#state.getCurrentType() === 0) {
            this.add(new Option("Añadir Pregunta"));
        }
    }

}

class CategoriesMenu extends DynamicMenu {

    #categories;
    #state;

    constructor(state, categories) {
        super("Menú de Categorías - (Subcategorías / Conceptos / Preguntas)");
        this.#categories = categories;
        this.#state = state;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#categories.length; i++) {
            this.add(new SelectCategoryOption(this.#categories, i, this.#state));
        }
        for (let i = 0; i < this.#categories.length; i++) {
            if (this.#categories[i].subcategoriesSize() > 0)
                this.add(new OpenMenuOption(`--- Ver Subcategorías de ${i + 1}-${this.#categories[i].getName()} ...`, new CategoriesMenu(this.#state, this.#categories[i].getSubcategories())));
        }
        for (let i = 0; i < this.#categories.length; i++) {
            if (this.#categories[i].getConcepts().length > 0)
                this.add(new OpenMenuOption(`--- Ver Conceptos de ${i + 1}-${this.#categories[i].getName()} ...`, new ConceptsMenu(this.#state, this.#categories[i].getConcepts())));
        }
        if (this.#state.getCurrentType() === 0) {
            this.add(new AddCategoryOption(this.#categories));
            this.add(new AddConceptOption(this.#state.getCurrentCategory().getConcepts()))
        }
    }

}

export { CategoriesMenu }