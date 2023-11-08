import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { TypeMenu } from "./UserTypesMenu.js";
import { UserState } from "../models/UserState.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { QuestionMenu } from "./QuestionMenu.js";
import { OpenQuestion } from "../models/Question.js";
import { console } from "../utils/view/console.js";

class AddQuestionOption extends OpenMenuOption {
    #state;

    constructor(title, menu, state) {
        super(title ,menu);
        this.#state = state;
    }

    interact() {
        super.interact();
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
    #userTypesMenu;
    #categories;
    #categoriesMenu;

    constructor(userState, categories) {
        super("ElaboraTest Menú");
        this.#userState = userState;
        this.#userTypesMenu = new TypeMenu(this.#userState,this.#userState.getTypes());
        this.#categories = categories;
        this.#categoriesMenu = new CategoriesMenu(this.#userState, this.#categories);
    }

    addOptions() {
        this.add(new OpenMenuOption("Seleccionar Tipo de usuario...", this.#userTypesMenu));
        this.add(new OpenMenuOption("Menú de Categorías y Conceptos...", this.#categoriesMenu));
        if (this.#userState.getCurrentType() === 0) {
            this.add(new AddQuestionOption("Menú de Preguntas...",new QuestionMenu(this.#userState.getCurrentConcept()),this.#userState));
            this.add(new Option("* Revisar Respuestas"))
        }
        else {
            this.add(new GenerateTestOption("* Ejecutar Tests", this.#userState));
            this.add(new Option("* Consultar Resultados"))
        }
    }
    addStateTitle() {
        this.#userStateTitle = `Usuario: ${this.#userState.getCurrentTypeName()}
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