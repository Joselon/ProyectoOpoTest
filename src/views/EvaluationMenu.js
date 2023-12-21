import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';

class SelectAndEvaluateAnswerOption extends Option {
    #question;
    #answer;
    #evaluatedBy;

    constructor(question, answer, evaluatedBy) {
        super("Evaluar respuesta");
        this.#question = question;
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
        ¿Desea guardar la respuesta como posible solución?(1=Sí/0=No):`);
        console.writeln("Evaluado por Profesor:" + this.#evaluatedBy)
        this.#answer.evaluate(isOK, new Date(), this.#evaluatedBy);
        if (isUseful)
            this.#question.addToConcept(this.#answer.getContent(), !isOK);
    }
}

class AnswersMenu extends DynamicQuitMenu {
    #question;
    #evaluatedBy;

    constructor(question, evaluatedBy) {
        super(`Respuestas de "¿${question.getStatement()}?":`);
        this.#question = question;
        this.#evaluatedBy = evaluatedBy;
    }

    addOptions() {
        let answers = this.#question.getAnswers();
        for (let i = 0; i < answers.length; i++) {
            if (!answers[i].isEvaluated())
                this.add(new SelectAndEvaluateAnswerOption(this.#question, answers[i], this.#evaluatedBy));
        }
    }
}

class EvaluationMenu extends DynamicQuitMenu {
    #evaluatedBy;
    #questions;

    constructor(userState) {
        super("Menú de Revisión de Respuestas Abiertas de la Categoria");
        this.#evaluatedBy = userState.getCurrentUserName();
        this.#questions = userState.getCurrentCategory().getAllQuestions();
    }

    addOptions() {
        for (let i = 0; i < this.#questions.length; i++) {
            if (this.#questions[i].getType() === "Open" && this.#questions[i].getAnswers().length > 0)
                this.add(new OpenMenuOption(`- Ver Respuestas de: ${this.#questions[i].getStatement()}... `, new AnswersMenu(this.#questions[i], this.#evaluatedBy)));
        }
    }
}

export { EvaluationMenu }