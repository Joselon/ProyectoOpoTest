import { DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { ConceptsMenu, AddConceptOption } from "./ConceptsMenu.js";
import { console } from '../utils/view/console.js';
import { Category } from "../models/Category.js";

//import { InIntervalDialog } from "../utils/view/Dialog.js";

class AddCategoryOption extends Option {
    #categories;

    constructor(categories) {
        super("Añadir Categoría");
        this.#categories = categories;
    }

    interact() {
        let name = console.readString(`
        Escribe el nombre de la categoría:`);
        let index = console.readNumber(`Escribe la categoría a la que pertenece (0 default): `)
        if (index === 0)
            this.#categories.push(new Category(name, this.#categories[0].getAncestor()));
        else
            this.#categories[index - 1].addSubcategory(new Category(name, this.#categories[index - 1]))
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