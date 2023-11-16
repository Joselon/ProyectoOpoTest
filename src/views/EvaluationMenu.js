import { DynamicMenu, OpenMenuOption, QuitOption, Option } from "../utils/view/Menu.js";
import { Concept } from "../models/Concept.js";
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
        let isOK = 1 === console.readNumber(`
        ¿Es correcta?(1=Sí/0=No):`);
        let isUseful = 1 === console.readNumber(`
        ¿Desea marcar la pregunta como útil?(1=Sí/0=No):`);
        this.#answer.evaluate(isOK, new Date(), isUseful);
        if (isUseful)
            this.#addToConcept(!isOK);

    }

    #addToConcept(isFake) {
        let question = this.#answer.getQuestion();
        let concept = question.getConcept();
        let content = this.#answer.getContent();
        console.writeln(this.#answer.getContent());
        let statementType = question.getStatementType();
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