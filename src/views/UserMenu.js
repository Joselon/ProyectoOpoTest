import { DynamicMenu, Option } from "../utils/view/Menu.js";
import { console } from "../utils/view/console.js";

class SelectUserOption extends Option {
    #array;
    #index;
    #state;

    constructor(array, index, state) {
        super("Seleccionar ");
        this.#array = array;
        this.#index = index;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#array[this.#index]}`;
    }

    interact() {
        super.interact();
        this.#state.setCurrentType(this.#index);
        let userName = console.readString(`Escribe nombre de usuario: `);
        this.#state.setCurrentUserName(userName);
    }

}

// ModelMenus

class UserMenu extends DynamicMenu {
    #state;
    #array;

    constructor(state, array) {
        super("Seleccione un tipo de usuario...");
        this.#state = state;
        this.#array = array;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#array.length; i++) {
            this.add(new SelectUserOption(this.#array, i, this.#state));
        }
    }

}

export { UserMenu }