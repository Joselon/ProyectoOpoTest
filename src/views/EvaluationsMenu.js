import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { Definition } from "../models/Definition.js";
import { console } from '../utils/view/console.js';

class SelectAndEvaluateAnswerOption extends Option {
    #answer;
    #evaluatedBy;

    constructor(answer, evaluatedBy) {
        super("Evaluar ");
        this.#answer = answer;
        this.#evaluatedBy = evaluatedBy;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#answer.getContent()} `;
    }

    interact() {
        let isOK = 1 === console.readNumber(`
        ¿Es correcta?(1=Sí/0=No):`);
        let isUseful = 1 === console.readNumber(`
        ¿Desea marcar la pregunta como útil?(1=Sí/0=No):`);
        console.writeln("Evaluado por Profesor:" + this.#evaluatedBy)
        this.#answer.evaluate(isOK, new Date(), isUseful, this.#evaluatedBy);
        if (isUseful)
            this.#addToConcept(!isOK);

    }

    #addToConcept(isFake) {
        let content = this.#answer.getContent();
        let question = this.#answer.getQuestion();
        let statementType = question.getStatementType();
        let concept = question.getConcept();

        console.writeln(statementType);

        if (statementType === "Definition") {
            console.writeln(concept);
            concept.addDefinition(new Definition(content, isFake, new Date()));
        }
        else if (statementType === "Classification" || statementType === "Composition") {
            concept.addRelation(new Relation(content, statementType, isFake));
        }
        else {
            //...
        }
    }

}


class AnswersMenu extends DynamicQuitMenu {

    #answers;
    #evaluatedBy;

    constructor(answers, evaluatedBy) {
        super(" Respuestas:");
        this.#answers = answers;
        this.#evaluatedBy = evaluatedBy;
    }

    addOptions() {
        for (let i = 0; i < this.#answers.length; i++) {
            if (!this.#answers[i].isEvaluated())
                this.add(new SelectAndEvaluateAnswerOption(this.#answers[i], this.#evaluatedBy));
        }
    }

}
class EvaluationMenu extends DynamicQuitMenu {

    #questions;
    #evaluatedBy;

    constructor(questions, evaluatedBy) {
        super("Menú de Revisión de Respuestas");
        this.#questions = questions;
        this.#evaluatedBy = evaluatedBy;
    }

    addOptions() {

        for (let i = 0; i < this.#questions.length; i++) {
            if (this.#questions[i].getAnswers().length > 0)
                this.add(new OpenMenuOption(`- Ver Respuestas de: ${this.#questions[i].getStatement()}... `, new AnswersMenu(this.#questions[i].getAnswers(), this.#evaluatedBy)));
        }
    }

}

class EvaluationsMenu extends DynamicQuitMenu {

    #userState;
    #evaluatedBy;

    constructor(userState) {
        super("Menú de Revisión de Respuestas");
        this.#userState = userState;
        this.#evaluatedBy = this.#userState.getCurrentUserName();
    }

    addOptions() {
        let currentCategory = this.#userState.getCurrentCategory();
        this.#addSubcategoryOption(currentCategory);
    }

    #addSubcategoryOption(category, parentName) {
        let optionTitle = "";
        if (parentName === undefined)
            optionTitle = `Menú de Evaluaciones de Conceptos de la Categoría:${category.getName()} `;
        else
            optionTitle = `Menú de Evaluaciones de Conceptos de la Subcategoría:(${parentName}/${category.getName()}) `
        for (let concept of category.getConcepts()) {
            if (concept.getOpenQuestions().length > 0)
                this.add(new OpenMenuOption(optionTitle + `- Concepto: ${concept.getKeyword()}`, new EvaluationMenu(concept.getOpenQuestions(), this.#evaluatedBy)));
        }
        for (let subcategory of category.getSubcategories()) {
            this.#addSubcategoryOption(subcategory, category.getName())
        }
    }

}

export { EvaluationsMenu }