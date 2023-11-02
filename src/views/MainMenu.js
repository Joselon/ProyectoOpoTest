import { DynamicQuitMenu , Option } from "../utils/view/Menu.js";
import { TypeMenu } from "./UserTypesMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { UserTypes } from "../models/UserTypes.js";
import { console } from "../utils/view/console.js";

//MainOptions
class ModelOption extends Option {

    model;

    constructor(string, model) {
        super(string);
        this.model = model;
    }

    interact() { };

}

class UserTypeOption extends ModelOption {
    #model;

    constructor(modelUsermenu, model) {
        super("Seleccionar Tipo de usuario...", modelUsermenu);
        this.#model = model;
    }

    interact() {
        new TypeMenu(this.#model).interact();
    }
}

class ShowCategoriesMenuOption extends ModelOption {
    #model;

    constructor(modelCatsmenu, model) {
        super("Ir a Menú de Categorías...", modelCatsmenu);
        this.#model = model;
    }

    interact() {
        new CategoriesMenu(this.#model).interact();
    }

}

class AddCategoryOption extends ModelOption {
    #model;

    constructor( model) {
        super("Añadir Categoría...",model);
        this.#model = model;
    }

    interact() {
        this.#model.addCategory(console.readString(`
        Escribe la categoría:`));
    }
}

class GenerateTestOption extends ModelOption {
    #model;

    constructor( model) {
        super("Generar Test de la categoría(1 por defecto)...",model);
        this.#model = model;
    }

    interact() {
        console.writeln(`
        Generando test de ${this.model.get(this.model.getSelectedCat())}...`)
    }
}

class MainMenu extends DynamicQuitMenu {
    #userTypes;
    #usersModelMenu;
    #categories;
    #categoriesModelMenu;

    constructor(userTypes, categories) {
        super("ElaboraTest Menú");
        this.#userTypes = userTypes;
        this.#usersModelMenu = new TypeMenu(this.#userTypes);
        this.#categories = categories;
        this.#categoriesModelMenu = new CategoriesMenu();
    }

    addOptions() {
        this.add(new UserTypeOption(this.#usersModelMenu,this.#userTypes));
        this.add(new ShowCategoriesMenuOption(this.#categoriesModelMenu, this.#categories));
        if (this.#userTypes.getSelectedType()===0){
            this.add(new AddCategoryOption(this.#categories));
           // this.add(new AddConceptOption(this.#categories));
        }
        else {
            this.add(new GenerateTestOption(this.#categories));
        }
    }

}


export { MainMenu };