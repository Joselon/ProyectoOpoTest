import { DynamicMenu, Option } from "../utils/view/Menu.js";
import { console } from "../utils/view/console.js";

class SelectUserOption extends Option {
    #array;
    #index;
    #userState;

    constructor(array, index, userState) {
        super("Seleccionar ");
        this.#array = array;
        this.#index = index;
        this.#userState = userState;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#array[this.#index]}`;
    }

    interact() {
        super.interact();
        this.#userState.setCurrentType(this.#index);
        let userName = console.readString(`Escribe nombre de usuario: `);
        this.#userState.setCurrentUserName(userName);
    }

}

// ModelMenus

class UserMenu extends DynamicMenu {
    #userState;
    #array;

    constructor(userState) {
        super("Seleccione un tipo de usuario...");
        this.#userState = userState;
        this.#array = this.#userState.getTypes();
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#array.length; i++) {
            this.add(new SelectUserOption(this.#array, i, this.#userState));
        }
    }

}

export { UserMenu }