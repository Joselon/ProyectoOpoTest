import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { UserMenu } from "./UserMenu.js";
import { CategoriesMenu } from "./CategoriesMenu.js";
import { QuestionMenu } from "./QuestionMenu.js";
import { ConceptsMenu } from "./ConceptsMenu.js";
import { EvaluationMenu } from "./EvaluationMenu.js";
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
        this.#userTypesMenu = new UserMenu(this.#userState, this.#userState.getTypes());
        this.#categories = categories;
        this.#categoriesMenu = new CategoriesMenu(this.#userState, this.#categories);
    }

    addOptions() {
        this.#addStateTitle();
        this.add(new OpenMenuOption("Seleccionar Tipo de usuario...", this.#userTypesMenu));
        this.add(new OpenMenuOption("Menú de Categorías y Conceptos...", this.#categoriesMenu));

        let currentCategory = this.#userState.getCurrentCategory();

        if (this.#userState.getCurrentType() === 0) {
            let currentConcept = this.#userState.getCurrentConcept();

            if (currentCategory.getName() !== '---') {
                this.add(new OpenMenuOption(`- Seleccionar Concepto de la Categoría: ${currentCategory.getName()}... `, new ConceptsMenu(this.#userState, currentCategory.getConcepts())));
                if (currentConcept.getKeyword() !== '---') {
                    this.add(new OpenMenuOption(`Menú de Preguntas del Concepto: ${currentConcept.getKeyword()} ...`, new QuestionMenu(this.#userState)));
                }
                //Menú de Evaluaciones de Preguntas Abiertas
                for (let concept of currentCategory.getConcepts()) {
                    if (concept.getOpenQuestions().length > 0)
                        this.add(new OpenMenuOption(`-Menú de Respuestas Abiertas dentro de Categoría:(Categoría:${currentCategory.getName()})- Concepto: ${concept.getKeyword()}...`, new EvaluationMenu(concept.getOpenQuestions(), this.#userState.getCurrentUserName())));
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
                this.add(new OpenMenuOption(`-- Menú de Respuestas Abiertas de la Subcategoría:(Subcategoría: ${parentName}/${category.getName()}) - Concepto: ${concept.getKeyword()}`, new EvaluationMenu(concept.getOpenQuestions())));
        }
        for (let subcategory of category.getSubcategories()) {
            this.#addSubcategoryOption(subcategory, category.getName())
        }
    }

    #addStateTitle() {
        this.#userStateTitle = `
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