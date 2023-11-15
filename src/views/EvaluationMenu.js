import { DynamicMenu, OpenMenuOption, QuitOption, Option } from "../utils/view/Menu.js";
import { Definition } from "../models/Definition.js";
import { console } from '../utils/view/console.js';

class SelectAndEvaluateAnswerOption extends Option {
    #answer;

    constructor(answer) {
        super("Evaluar ");
        this.#answer = answer;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#answer.getContent()} `;
    }

    interact() {
        let isOK = console.readNumber(`
        ¿Es correcta?(1=Sí/0=No):`) === 1;
        let isUseful = console.readNumber(`
        ¿Desea marcar la pregunta como útil?(1=Sí/0=No):`) === 1;
        this.#answer.evaluate(isOK, new Date(), isUseful);
        if (isUseful)
            this.#addToConcept(this.#answer.getQuestion(), this.#answer.getContent(), isOK);

    }

    #addToConcept(question, content, isOK) {
        let statementType = question.getStatementType();
        let concept = question.getConcept();

        if (statementType === "Definition") {
            concept.definitions.push(new Definition(content, isOK ,new Date()))
        }
        else if (statementType === "Classification" || statementType === "Composition") {
            concept.relations.push(new Relation(content, statementType, isOK))
        }
        else {
            //...
        }
    }

}


class AnswersMenu extends DynamicMenu {

    #answers;

    constructor(answers) {
        super(" Respuestas:");
        this.#answers = answers;
    }

    addOptions() {
        for (let i = 0; i < this.#answers.length; i++) {
            this.add(new SelectAndEvaluateAnswerOption(this.#answers[i]));
        }
    }

}
class EvaluationMenu extends DynamicMenu {

    #questions;

    constructor(questions) {
        super("Menú de Revisión de Respuestas");
        this.#questions = questions;
    }

    addOptions() {

        for (let i = 0; i < this.#questions.length; i++) {
            if (this.#questions[i].getAnswers().length > 0)
                this.add(new OpenMenuOption(`- Ver Respuestas de: ${this.#questions[i].getStatement()}... `, new AnswersMenu(this.#questions[i].getAnswers())));
        }
        this.add(new QuitOption());
    }

}

export { EvaluationMenu }