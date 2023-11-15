import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { TypeMenu } from "./UserTypesMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { QuestionMenu } from "./QuestionMenu.js";
import { OpenQuestion, MultipleChoiceQuestion } from "../models/Question.js";
import { EvaluationMenu } from "./EvaluationMenu.js";
import { GenerateTestMenu } from "./GenerateTestMenu.js"
import { console } from "../utils/view/console.js";

class AddQuestionOption extends OpenMenuOption {
    #userState;

    constructor(title, menu, userState) {
        super(title, menu);
        this.#userState = userState;
    }

    interact() {
        super.interact();
        let statement = console.readString(`
        Escribe el enunciado de la pregunta de tipo ${this.#userState.getSelectedStatementType()}:`);
        if (this.#userState.getSelectedAnswerType() === "Open")
            this.#userState.getCurrentConcept().addQuestion(new OpenQuestion(statement, this.#userState.getSelectedStatementType(), this.#userState.getCurrentConcept()));
        else if (this.#userState.getSelectedAnswerType() === "MultipleChoice")
            this.#userState.getCurrentConcept().addQuestion(new MultipleChoiceQuestion(statement, this.#userState.getSelectedStatementType(), this.#userState.getCurrentConcept()));

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
        this.#userTypesMenu = new TypeMenu(this.#userState, this.#userState.getTypes());
        this.#categories = categories;
        this.#categoriesMenu = new CategoriesMenu(this.#userState, this.#categories);
    }

    addOptions() {
        this.add(new OpenMenuOption("Seleccionar Tipo de usuario...", this.#userTypesMenu));
        this.add(new OpenMenuOption("Menú de Categorías y Conceptos...", this.#categoriesMenu));

        let currentCategory = this.#userState.getCurrentCategory();

        if (this.#userState.getCurrentType() === 0) {
            let currentConcept = this.#userState.getCurrentConcept();

            if (currentConcept.getKeyword() !== '---' && currentCategory.getName() !== '---') {
                this.add(new AddQuestionOption("Crear de Preguntas de ...", new QuestionMenu(this.#userState), this.#userState));
                if (currentConcept.getOpenQuestions().length > 0)
                    this.add(new OpenMenuOption(`(Categoría:${currentCategory.getName()}) Revisar Preguntas Abiertas de ${currentConcept.getKeyword()}`, new EvaluationMenu(currentConcept.getOpenQuestions())));
            }
            else if (currentCategory.getName() !== '---') {
                for (let concept of currentCategory.getConcepts()) {
                    if (concept.getOpenQuestions().length > 0)
                        this.add(new OpenMenuOption(`(Categoría:${currentCategory.getName()}) Revisar Preguntas Abiertas de ${concept.getKeyword()}`, new EvaluationMenu(concept.getOpenQuestions())));
                }
                for (let category of currentCategory.getSubcategories()) {
                    this.#addSubcategoryOption(category, currentCategory.getName());
                }

            }
        }
        else {
            if (currentCategory.getName() !== '---') {
                this.add(new OpenMenuOption(`Ejecutar Tests ${this.#userState.getCurrentCategory().getName()}`, new GenerateTestMenu(currentCategory.getAllQuestions(), this.#userState.getCurrentUserName())));
            }
            this.add(new Option("* Consultar Resultados"))
        }
    }

    #addSubcategoryOption(category, parentName) {
        for (let concept of category.getConcepts()) {
            if (concept.getOpenQuestions().length > 0)
                this.add(new OpenMenuOption(`-(Subcategoría: ${parentName}/${category.getName()}) Revisar Preguntas Abiertas de ${concept.getKeyword()}`, new EvaluationMenu(concept.getOpenQuestions())));
        }
        for (let subcategory of category.getSubcategories()) {
            this.#addSubcategoryOption(subcategory, category.getName())
        }
    }

    addStateTitle() {
        this.#userStateTitle = `Usuario: ${this.#userState.getCurrentTypeName()}
        Categoría actual: ${this.#userState.getCurrentCategory().getName()}`;
        if (this.#userState.getCurrentType() === 0) {
            this.#userStateTitle += `
             Concepto actual: ${this.#userState.getCurrentConcept().getKeyword()}`;
        }
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