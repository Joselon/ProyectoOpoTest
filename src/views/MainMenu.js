import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { UserMenu } from "./UserMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { QuestionMenu } from "./QuestionMenu.js";
import { ConceptsMenu } from "./ConceptsMenu.js";
import { EvaluationsMenu } from "./EvaluationsMenu.js";
import { GenerateTestMenu } from "./GenerateTestMenu.js"
import { console } from "../utils/view/console.js";

class MainMenu extends DynamicQuitMenu {
    #userState;
    #userStateTitle;
    #userTypesMenu;
    #categories;
    #categoriesMenu;

    constructor(userState, categories) {
        super("ElaboraTest Menú");
        this.#userState = userState;
        this.#userTypesMenu = new UserMenu(this.#userState);
        this.#categories = categories;
        this.#categoriesMenu = new CategoriesMenu(this.#userState, this.#categories);
    }

    addOptions() {
        this.#addStateTitle();
        this.add(new OpenMenuOption("Seleccionar Tipo de usuario y Nombre...", this.#userTypesMenu));
        this.add(new OpenMenuOption("Menú de Categorías y Conceptos...", this.#categoriesMenu));

        let currentCategory = this.#userState.getCurrentCategory();
        if (this.#userState.getCurrentType() === 0) {
            let currentConcept = this.#userState.getCurrentConcept();
            if (currentCategory.getName() !== '---') {
                this.add(new OpenMenuOption(`- Menú de Conceptos de la Categoría: ${currentCategory.getName()}... `, new ConceptsMenu(this.#userState)));
                if (currentConcept.getKeyword() !== '---') {
                    this.add(new OpenMenuOption(`-- Menú de Preguntas del Concepto: ${currentConcept.getKeyword()} ...`, new QuestionMenu(this.#userState)));
                }
                this.add(new OpenMenuOption(`- Menú de Evaluaciones de la Categoría ${currentCategory.getName()}...`, new EvaluationsMenu(this.#userState)));
            }
        }
        else {
            if (currentCategory.getName() !== '---') {
                this.add(new OpenMenuOption(`Ejecutar Tests ${currentCategory.getName()}`, new GenerateTestMenu(currentCategory.getAllQuestions(), this.#userState.getCurrentUserName())));
            }
            this.add(new Option("* Consultar Resultados"))
        }
    }

    #addStateTitle() {
        this.#userStateTitle = `State:
        Usuario: ${this.#userState.getCurrentTypeName()} ${this.#userState.getCurrentUserName()}
        Categoría actual: ${this.#userState.getCurrentCategory().getName()}`;
        if (this.#userState.getCurrentType() === 0) {
            this.#userStateTitle += `
             Concepto actual: ${this.#userState.getCurrentConcept().getKeyword()}`;
        }
    }

    interact_() {
        console.writeln(this.#userStateTitle);
        super.interact_();
    }
}

export { MainMenu };