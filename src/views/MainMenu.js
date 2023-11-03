import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { TypeMenu } from "./UserTypesMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { console } from "../utils/view/console.js";

//Teacher Options
class AddCategoryOption extends Option {
    #model;

    constructor(model) {
        super("Añadir Categoría");
        this.#model = model;
    }

    interact() {
        this.#model.addCategory(console.readString(`
        Escribe la categoría:`));
    }
}

//Student Options
class GenerateTestOption extends Option {
    #model;

    constructor(model) {
        super("Ejecutar Tests");
        this.#model = model;
    }

    interact() {
        console.writeln(`
        Generando test de ${this.#model.get(this.#model.getSelected())}...`)
    }
}

class MainMenu extends DynamicQuitMenu {
    #userTypes;
    #userTypesMenu;
    #categories;
    #categoriesMenu;

    constructor(userTypes, categories) {
        super("ElaboraTest Menú");
        this.#userTypes = userTypes;
        this.#userTypesMenu = new TypeMenu(this.#userTypes);
        this.#categories = categories;
        this.#categoriesMenu = new CategoriesMenu(this.#categories);
    }

    addOptions() {
        this.add(new OpenMenuOption("Seleccionar Tipo de usuario...", this.#userTypesMenu));
        this.add(new OpenMenuOption("Menú de Categorías...", this.#categoriesMenu));
        if (this.#userTypes.getSelected() === 0) {
            this.add(new AddCategoryOption(this.#categories));
            this.add(new Option("Añadir Concepto"));
            this.add(new Option("Añadir Pregunta"));
            this.add(new Option("Revisar Respuestas"))
        }
        else {
            this.add(new GenerateTestOption(this.#categories));
            this.add(new Option("Consultar Resultados"))
        }
    }

}


export { MainMenu };