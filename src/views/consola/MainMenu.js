import { DynamicQuitMenu, OpenMenuOption, Option } from "../../utils/view/consola/Menu.js";
import { CategoriesMenu, TeacherCategoriesMenu } from "./CategoriesMenu.js";
import { QuestionMenu } from "./QuestionMenu.js";
import { ConceptsMenu } from "./ConceptsMenu.js";
import { EvaluationMenu } from "./EvaluationMenu.js";
import { GenerateTestMenu } from "./GenerateTestMenu.js"
import { console } from "../../utils/view/consola/console.js";

class MainMenu extends DynamicQuitMenu {
    _userState;
    _userStateTitle;
    _categories;

    constructor(userState, categories) {
        super("ElaboraTest Menú");
        this._userState = userState;
        this._categories = categories;
    }

    addOptions() {
        this.#addStateTitle();
        this.add(new OpenMenuOption("Menú de Categorías...", new CategoriesMenu(this._userState, this._categories)));
        let currentCategory = this._userState.getCurrentCategory();
        if (currentCategory.getName() !== '---') {
            this.add(new OpenMenuOption(`Ejecutar Tests ${currentCategory.getName()}`, new GenerateTestMenu(currentCategory.getAllQuestions(), this._userState.getCurrentUserName())));
        }
        this.add(new Option("* Consultar Resultados"))
    }

    #addStateTitle() {
        this._userStateTitle = `Estado del usuario:
        Usuario: ${this._userState.getCurrentUserTypeName()} ${this._userState.getCurrentUserName()}
        Categoría actual: ${this._userState.getCurrentCategory().getName()}`;
    }

    interact_() {
        console.writeln(this._userStateTitle);
        super.interact_();
    }
}

class TeacherMainMenu extends MainMenu {

    constructor(userState, categories) {
        super(userState, categories);
    }

    addOptions() {
        this.#addStateTitle();
        this.add(new OpenMenuOption("Menú de Categorías y Conceptos...", new TeacherCategoriesMenu(this._userState, this._categories)));
        let currentCategory = this._userState.getCurrentCategory();
        if (currentCategory.getName() !== '---') {
            this.add(new OpenMenuOption(`- Menú de Conceptos de la Categoría: ${currentCategory.getName()}... `, new ConceptsMenu(this._userState)));
            this.add(new OpenMenuOption(`- Menú de Evaluaciones de la Categoría ${currentCategory.getName()}...`, new EvaluationMenu(this._userState)));
            let currentConcept = this._userState.getCurrentConcept();
            if (currentConcept.getKeyword() !== '---') {
                this.add(new OpenMenuOption(`-- Menú de Preguntas del Concepto: ${currentConcept.getKeyword()} ...`, new QuestionMenu(this._userState)));
            }
        }
    }

    #addStateTitle() {
        this._userStateTitle = `Estado del Usuario:
        Usuario: ${this._userState.getCurrentUserTypeName()} ${this._userState.getCurrentUserName()}
        Categoría actual: ${this._userState.getCurrentCategory().getName()}
             Concepto actual: ${this._userState.getCurrentConcept().getKeyword()}`;
    }
}

export { MainMenu, TeacherMainMenu };