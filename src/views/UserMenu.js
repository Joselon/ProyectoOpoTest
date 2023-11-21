import { DynamicMenu, Option } from "../utils/view/Menu.js";
import { UserType } from "../models/UserTypes.js";
import { console } from "../utils/view/console.js";

class SelectUserAndReadNameOption extends Option {
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
        return `${super.getTitle()}: ${this.#array[this.#index].toString()}`;
    }

    interact() {
        super.interact();
        this.#userState.setCurrentUserType(this.#array[this.#index]);
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
        this.#array = UserType.values();
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#array.length; i++) {
            this.add(new SelectUserAndReadNameOption(this.#array, i, this.#userState));
        }
    }

}

export { UserMenu }