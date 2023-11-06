import { DynamicMenu,  Option } from "../utils/view/Menu.js";

class SelectUserTypeOption extends Option {
    #model;
    #index;
    #state;

    constructor(model, index, state) {
        super("Seleccionar ");
        this.#model = model;
        this.#index = index;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#model.get(this.#index)}`;
    }

    interact() {
        super.interact();
        this.#state.setCurrentType(this.#index);
        
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
            this.add(new SelectUserTypeOption(this.#model, i, this.#state));
        }
    }

}

export { TypeMenu }