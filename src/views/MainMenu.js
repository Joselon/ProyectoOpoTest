import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { TypeMenu } from "./UserTypesMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { OpenQuestion } from "../models/Question.js";
import { console } from "../utils/view/console.js";

class AddQuestionOption extends Option {
    #state;

    constructor(title, state) {
        super(title);
        this.#state = state;
    }

    interact() {
        let statement = console.readString(`
        Escribe el enunciado de la pregunta:`);
        this.#state.getCurrentConcept().addQuestion(new OpenQuestion(statement));

    }
}

//Student Options
class GenerateTestOption extends Option {
    #state;

    constructor(title, state) {
        super(title);
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
            this.add(new AddQuestionOption("Añadir Pregunta al concepto actual", this.#userState));
            this.add(new Option("Revisar Respuestas*"))
        }
        else {
            this.add(new GenerateTestOption("Ejecutar Tests", this.#userState));
            this.add(new Option("Consultar Resultados*"))
        }
    }
    addStateTitle() {
        this.#userStateTitle = `Usuario: ${this.#userTypes.get(this.#userState.getCurrentType())}
        Categoría actual: ${this.#userState.getCurrentCategoryName()}
        Concepto actual: ${this.#userState.getCurrentConceptKeyWord()}`;
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