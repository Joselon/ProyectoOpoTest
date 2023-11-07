import { DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';
import { Category } from "../models/Category.js";
import { InIntervalDialog } from "../utils/view/Dialog.js";

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

class SelectCategoryOption extends Option {
    #categories
    #index;
    #state;

    constructor(categories, index, state) {
        super("Seleccionar ");
        this.#categories = []
        for (let category of categories)
            this.#categories.push(category);
        this.#index = index;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#categories[this.#index].getName()} -(${this.#categories[this.#index].conceptsSize()})`;
    }

    interact() {
        super.interact();
        this.#state.setCurrentCategory(this.#categories[this.#index]);
    }

}

// ModelMenus

class CategoriesMenu extends DynamicMenu {

    #categories;
    #state;
    #stateTitle;

    constructor(state, categories) {
        super("Menú de Categorías");
        this.#categories = categories;
        this.#state = state;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#categories.length; i++) {
            this.add(new SelectCategoryOption(this.#categories, i, this.#state));
        }
        for (let i = 0; i < this.#categories.length; i++)
            if (this.#categories[i].subcategoriesSize() > 0) {
                this.add(new OpenMenuOption(`--- Ver Subcategorías de ${i + 1}-${this.#categories[i].getName()} ...`, new CategoriesMenu(this.#state, this.#categories[i].getSubcategories())));
            }
        if (this.#state.getCurrentType() === 0) {
            this.add(new AddCategoryOption(this.#categories));
        }
    }
    addStateTitle() {
        this.#stateTitle = "Categoría actual: " + this.#state.getCurrentCategoryName();
    }

    interact() {
        super.interact();
        this.addStateTitle();
    }

    showState() {
        console.writeln(this.#stateTitle);
    }

    interact_() {
        super.interact_();
        this.addStateTitle();
    }

}

export { CategoriesMenu }