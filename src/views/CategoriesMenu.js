import { DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { ConceptsMenu, AddConceptOption } from "./ConceptsMenu.js";
import { Concept } from "../models/Concept.js";
import { console } from '../utils/view/console.js';
import { Category } from "../models/Category.js";

//import { InIntervalDialog } from "../utils/view/Dialog.js";

class AddCategoryOption extends Option {
    #categories;

    constructor(categories) {
        super("Añadir Categoría / Subcategoría");
        this.#categories = categories;
    }

    interact() {
        let name = console.readString(`
        Escribe el nombre de la categoría:`);
        let index = console.readNumber(`Escribe la categoría a la que pertenece (0 default): `)
        if (index === 0)
            if (this.#categories.length > 0) {
                this.#categories.push(new Category(name, this.#categories[0].getAncestor()));
            }
            else {
                this.#categories.push(new Category(name));
            }
        else
            this.#categories[index - 1].addSubcategory(new Category(name, this.#categories[index - 1]))
    }
}

class SelectCategoryOption extends Option {
    #category
    #state;

    constructor(category, state) {
        super("Seleccionar ");
        this.#category = category;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#category.getName()} -(${this.#category.subcategoriesSize()}/${this.#category.conceptsSize()}/${this.#category.questionsSize()})`;
    }

    interact() {
        super.interact();
        this.#state.setCurrentCategory(this.#category);
        this.#state.setCurrentConcept(new Concept("---"));
    }

}

class SelectCategoryAndShowConceptsOption extends OpenMenuOption {
    #category
    #state;

    constructor(menu, category, state) {
        super(`Seleccionar Concepto de ${category.getName()} `, menu);
        this.#category = category;
        this.#state = state;
    }

    interact() {
        super.interact();
        this.#state.setCurrentCategory(this.#category);
    }
}

class CategoriesMenu extends DynamicMenu {

    #categories;
    #state;

    constructor(state, categories) {
        super("Menú de Categorías - (Subcategorías / Conceptos / Preguntas)");
        this.#categories = categories;
        this.#state = state;
    }

    addOptions() {
        for (let i = 0; i < this.#categories.length; i++) {
            this.add(new SelectCategoryOption(this.#categories[i], this.#state));
        }
        for (let i = 0; i < this.#categories.length; i++) {
            if (this.#categories[i].subcategoriesSize() > 0)
                this.add(new OpenMenuOption(`--- Ver Subcategorías de ${i + 1}-${this.#categories[i].getName()} ...`, new CategoriesMenu(this.#state, this.#categories[i].getSubcategories())));
        }

        if (this.#state.getCurrentType() === 0) {
            for (let i = 0; i < this.#categories.length; i++) {
                if (this.#categories[i].getConcepts().length > 0)
                    this.add(new SelectCategoryAndShowConceptsOption(new ConceptsMenu(this.#state, this.#categories[i].getConcepts()), this.#categories[i], this.#state));
            }
            this.add(new AddCategoryOption(this.#categories));
            this.add(new AddConceptOption(this.#state.getCurrentCategory().getConcepts()))
        }
    }

}

export { CategoriesMenu }