import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { CategoriesMenu, TeacherCategoriesMenu } from "./CategoriesMenu.js";
import { QuestionMenu } from "./QuestionMenu.js";
import { ConceptsMenu } from "./ConceptsMenu.js";
import { EvaluationsMenu } from "./EvaluationsMenu.js";
import { GenerateTestMenu } from "./GenerateTestMenu.js"
import { console } from "../utils/view/console.js";

class MainMenu extends DynamicQuitMenu {
    #userState;
    #userStateTitle;
    #categories;

    constructor(userState, categories) {
        super("ElaboraTest Menú Estudiante");
        this.#userState = userState;
        this.#categories = categories;
    }

    addOptions() {
        this.#addStateTitle();
        this.add(new OpenMenuOption("Menú de Categorías...", new CategoriesMenu(this.#userState, this.#categories)));

        let currentCategory = this.#userState.getCurrentCategory();
        if (currentCategory.getName() !== '---') {
            this.add(new OpenMenuOption(`Ejecutar Tests ${currentCategory.getName()}`, new GenerateTestMenu(currentCategory.getAllQuestions(), this.#userState.getCurrentUserName())));
        }

        this.add(new Option("* Consultar Resultados"))
    }

    #addStateTitle() {
        this.#userStateTitle = `Estado del usuario:
        Usuario: ${this.#userState.getCurrentUserTypeName()} ${this.#userState.getCurrentUserName()}
        Categoría actual: ${this.#userState.getCurrentCategory().getName()}`;
    }

    interact_() {
        console.writeln(this.#userStateTitle);
        super.interact_();
    }
}

class TeacherMainMenu extends DynamicQuitMenu {
    #userState;
    #userStateTitle;
    #categories;

    constructor(userState, categories) {
        super("ElaboraTest Menú del Profesor");
        this.#userState = userState;
        this.#categories = categories;
    }

    addOptions() {
        this.#addStateTitle();
        this.add(new OpenMenuOption("Menú de Categorías y Conceptos...", new TeacherCategoriesMenu(this.#userState, this.#categories)));
        let currentCategory = this.#userState.getCurrentCategory();
        let currentConcept = this.#userState.getCurrentConcept();
        if (currentCategory.getName() !== '---') {
            this.add(new OpenMenuOption(`- Menú de Conceptos de la Categoría: ${currentCategory.getName()}... `, new ConceptsMenu(this.#userState)));
            this.add(new OpenMenuOption(`- Menú de Evaluaciones de la Categoría ${currentCategory.getName()}...`, new EvaluationsMenu(this.#userState)));
            if (currentConcept.getKeyword() !== '---') {
                this.add(new OpenMenuOption(`-- Menú de Preguntas del Concepto: ${currentConcept.getKeyword()} ...`, new QuestionMenu(this.#userState)));
            } 
        }
    }

    #addStateTitle() {
        this.#userStateTitle = `Estado del Usuario:
        Usuario: ${this.#userState.getCurrentUserTypeName()} ${this.#userState.getCurrentUserName()}
        Categoría actual: ${this.#userState.getCurrentCategory().getName()}
             Concepto actual: ${this.#userState.getCurrentConcept().getKeyword()}`;
    }

    interact_() {
        console.writeln(this.#userStateTitle);
        super.interact_();
    }
}

export { MainMenu, TeacherMainMenu };