import { DynamicMenu, IterativeQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';


class SelectModelOption extends Option {
    #model
    #index;

    constructor(model, index) {
        super("Seleccionar ", model);
        this.#model = model;
        this.#index = index;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#model.get(this.#index)} -(${this.#model.get(this.#index).length})`;
    }

    interact() {
        this.#model.setSelectedCat(this.#index);
    }

}

// ModelMenus

class CategoryMenu extends DynamicMenu {

    #model;

    constructor(model) {
        super("Seleccione una categoría...");
        this.#model = model;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectModelOption(this.#model, i));
        }
    }

}

class CategoriesMenu extends IterativeQuitMenu {

    #model;
    #state;
    #selectCatMenu

    constructor(model) {
        super("Menú de Categorías");
        this.#model = model;
        this.#selectCatMenu = new CategoryMenu(this.#model);
    }

    addOptions() {
        this.add(new OpenMenuOption("Cambiar categoría", this.#selectCatMenu));
    }

    addState() {
        this.#state = "Categoría actual: " + this.#model.get(this.#model.getSelectedCat());
    }

    interact() {
        do {
            this.removeOptions();
            this.addState();
            this.addOptions();
            this.interact_();
        } while (!this.isExecutedquitOption());
    }

    showState() {
        console.writeln(this.#state);
    }

    interact_() {
        this.showTitles();
        this.showState();
        this.execChoosedOption();
    }

}

export { CategoriesMenu }