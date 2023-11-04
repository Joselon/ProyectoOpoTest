import { DynamicMenu, IterativeQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';


class SelectModelOption extends Option {
    #model
    #index;
    #state;

    constructor(model, index, state) {
        super("Seleccionar ", model);
        this.#model = model;
        this.#index = index;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#model.get(this.#index)} -(${this.#model.get(this.#index).length})`;
    }

    interact() {
        this.#state.setCurrentCategory(this.#index);
    }

}

// ModelMenus

class CategoryMenu extends DynamicMenu {

    #model;
    #state;

    constructor(state, model) {
        super("Seleccione una categoría...");
        this.#model = model;
        this.#state = state;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectModelOption(this.#model, i, this.#state));
        }
    }

}

class CategoriesMenu extends IterativeQuitMenu {

    #model;
    #state;
    #stateTitle;
    #selectCatMenu

    constructor(state, model) {
        super("Menú de Categorías");
        this.#model = model;
        this.#state = state;
        this.#selectCatMenu = new CategoryMenu(this.#state, this.#model);
    }

    addOptions() {
        this.add(new OpenMenuOption("Cambiar categoría", this.#selectCatMenu));
    }

    addStateTitle() {
        this.#stateTitle = "Categoría actual: " + this.#model.get(this.#state.getCurrentCategory());
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