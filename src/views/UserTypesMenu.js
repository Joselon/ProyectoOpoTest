import { DynamicMenu, IterativeQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';
import { UserState } from "../models/UserState.js";

class SelectAndOpenMenuOption extends Option {
    #menu;
    #model;
    #index;
    #state;

    constructor(menu, model, index, state) {
        super("Seleccionar ", model);
        this.#model = model;
        this.#index = index;
        this.#menu = menu;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#model.get(this.#index)}`;
    }

    interact() {
        this.#state.setCurrentType(this.#index);
        this.#menu.interact();
    }

}

// ModelMenus

class TypeMenu extends DynamicMenu {
    #state;
    #model;

    constructor(state, model) {
        super("Seleccione un tipo de usuario...");
        this.#state = state;
        this.#model = model;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectAndOpenMenuOption(new UserTypesMenu(this.#state, this.#model), this.#model, i, this.#state));
        }
    }

}

class UserTypesMenu extends IterativeQuitMenu {

    #model;
    #state;
    #stateTitle;

    constructor(state, model) {
        super("Menú de Usuarios");
        this.#state = state;
        this.#model = model;
    }

    addOptions() {
        this.add(new OpenMenuOption("Cambiar tipo", this.#model));
    }

    addStateTitle() {
        this.#stateTitle = "Actual: " + this.#model.get(this.#state.getCurrentType());
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

export { TypeMenu }