import { IterativeMenu, ModelOption } from "../utils/view/Menu.js";
import { UserTypesMenu } from "./UserTypesMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";

//MainOptions

class UserTypeOption extends ModelOption {
    #model

    constructor(modelUsermenu, model) {
        super("Seleccionar Tipo de usuario...", modelUsermenu);
        this.#model = model;
    }

    interact() {
        new UserTypesMenu(this.#model).interact();
    }
}

class ShowCategoriesMenuOption extends ModelOption {
    #model

    constructor(modelCatsmenu, model) {
        super("Ir a Menú de Categorías...", modelCatsmenu);
        this.#model = model;
    }

    interact() {
        new CategoriesMenu(this.#model).interact();
    }

}

class MainMenu extends IterativeMenu {
    #userTypes;
    #usersModelMenu;
    #categories;
    #categoriesModelMenu;

    constructor(userTypes, categories) {
        super("ElaboraTest Menú");
        this.#userTypes = userTypes;
        this.#usersModelMenu = new UserTypesMenu(this.#userTypes);
        this.#categories = categories;
        this.#categoriesModelMenu = new CategoriesMenu();
    }

    addOptions() {
        this.add(new UserTypeOption(this.#usersModelMenu,this.#userTypes));
        this.add(new ShowCategoriesMenuOption(this.#categoriesModelMenu, this.#categories));
    }

}


export { MainMenu };