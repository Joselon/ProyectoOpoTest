import { MenuDialog } from "../../utils/view/html/Dialog.js";
import { accountIcon } from '@dile/icons';
import { UserType } from "../../models/UserTypes.js";

class UserMenu extends MenuDialog {

    constructor(indexcallback) {
        super("app","Seleccione un tipo de usuario...", UserType.values(),indexcallback);
    }

/*
    interact() {
        super.interact();
        this.#userState.setCurrentUserType(this.#array[this.#index]);
        let userName = console.readString(`Escribe nombre de usuario: `);
        this.#userState.setCurrentUserName(userName);
    }*/
}

export { UserMenu }