import { DynamicMenu, IterativeQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';
import { InIntervalDialog } from "../utils/view/Dialog.js";

//Teacher Options
class AddCategoryOption extends Option {
    #categories;

    constructor(categories) {
        super("Añadir Categoría");
        this.#categories = categories;
    }

    interact() {
        let cat = console.readString(`
        Escribe la categoría:`);
        let catIndex = console.readNumber(`Escribe la categoría a la que pertenece (0 default): `)
        this.#categories.addCategory(cat, catIndex);
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
        return `${super.getTitle()}: ${this.#categories.getName(this.#index)} -(${this.#categories.getName(this.#index).length})`;
    }

    interact() {
        super.interact();
        this.#state.setCurrentCategory(this.#index);
    }

}

// ModelMenus

class CategoryMenu extends DynamicMenu {

    #categories;
    #state;

    constructor(state, categories) {
        super("Seleccione una categoría...");
        this.#categories = categories;
        this.#state = state;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#categories.size(); i++) {
            this.add(new SelectCategoryOption(this.#categories, i, this.#state));
        }
        for (let i = 0; i < this.#categories.size(); i++)
            if (this.#categories.get(i).subcategoriesSize() > 0) {
                this.add(new OpenMenuOption(`--- Ver Subcategorías de ${i+1}-${this.#categories.getName(i)} ->`, new CategoryMenu(this.#state , this.#categories.get(i).getSubcategories())));
                //for (let j = 0; j < this.#categories.get(i).subcategoriesSize(); j++) {
            }
        if (this.#state.getCurrentType() === 0) {
            this.add(new AddCategoryOption(this.#categories));
        }
    }

}

class CategoriesMenu extends IterativeQuitMenu {

    #model;
    #state;
    #stateTitle;
    #selectCatMenu;

    constructor(state, model) {
        super("Menú de Categorías");
        this.#model = model;
        this.#state = state;
        this.#selectCatMenu = new CategoryMenu(this.#state, this.#model);
    }

    addOptions() {
        this.add(new OpenMenuOption("Añadir o Cambiar de Categoría...", this.#selectCatMenu));
    }

    addStateTitle() {
        this.#stateTitle = "Categoría actual: " + this.#model.getName(this.#state.getCurrentCategory());
    }

    interact() {
        do {
            this.removeOptions();
            this.addStateTitle();
            this.addOptions();
            this.interact_();
        } while (!this.isExecutedquitOption());
    }

    showState() {
        console.writeln(this.#stateTitle);
    }

    interact_() {
        this.showTitles();
        this.showState();
        this.execChoosedOption();
    }

}

export { CategoriesMenu }