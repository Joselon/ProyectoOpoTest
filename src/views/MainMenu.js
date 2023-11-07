import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { TypeMenu } from "./UserTypesMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { console } from "../utils/view/console.js";

//Student Options
class GenerateTestOption extends Option {
    #state;

    constructor(state) {
        super("Ejecutar Tests");
        this.#state = state;
    }

    interact() {
        console.writeln(`
        Generando test de ${this.#state.getCurrentCategoryName()}...`)
    }
}

class MainMenu extends DynamicQuitMenu {
    #userState;
    #userStateTitle;
    #userTypes;
    #userTypesMenu;
    #categories;
    #categoriesMenu;

    constructor(userState, userTypes, categories) {
        super("ElaboraTest Menú");
        this.#userState = userState;
        this.#userTypes = userTypes;
        this.#userTypesMenu = new TypeMenu(this.#userState, this.#userTypes);
        this.#categories = categories;
        this.#categoriesMenu = new CategoriesMenu(this.#userState, this.#categories);
    }

    addOptions() {
        this.add(new OpenMenuOption("Seleccionar Tipo de usuario...", this.#userTypesMenu));
        this.add(new OpenMenuOption("Menú de Categorías...", this.#categoriesMenu));
        if (this.#userState.getCurrentType() === 0) {
            this.add(new Option("Añadir Concepto"));
            this.add(new Option("Añadir Pregunta"));
            this.add(new Option("Revisar Respuestas"))
        }
        else {
            this.add(new GenerateTestOption(this.#userState, this.#categories));
            this.add(new Option("Consultar Resultados"))
        }
    }
    addStateTitle() {
        this.#userStateTitle = `Usuario: ${this.#userTypes.get(this.#userState.getCurrentType())}
        Categoría actual: ${this.#userState.getCurrentCategoryName()}`;
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
        console.writeln(this.#userStateTitle);
    }

    interact_() {
        this.showTitles();
        this.showState();
        this.execChoosedOption();
    }

}


export { MainMenu };