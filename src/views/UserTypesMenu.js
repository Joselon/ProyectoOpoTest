import { DynamicMenu, IterativeQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';

class SelectAndOpenMenuOption extends Option {
    #menu;
    #model;
    #index;

    constructor(menu, model, index) {
        super("Seleccionar ", model);
        this.#model = model;
        this.#index = index;
        this.#menu = menu;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#model.get(this.#index)}`;
    }

    interact() {
        this.#model.setSelectedType(this.#index);
        this.#menu.interact();
    }

}

// ModelMenus

class TypeMenu extends DynamicMenu {

    #model;

    constructor(model) {
        super("Seleccione un tipo de usuario...");
        this.#model = model;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectAndOpenMenuOption(new UserTypesMenu(this.#model), this.#model, i));
        }
    }

}

class UserTypesMenu extends IterativeQuitMenu {

    #model;
    #state;

    constructor(model) {
        super("Menú de Usuarios");
        this.#model = model;
    }

    addOptions() {
        this.add(new OpenMenuOption("Cambiar tipo", this.#model));
    }

    addState() {
        this.#state = "Actual: " + this.#model.get(this.#model.getSelectedType());
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

export { TypeMenu }