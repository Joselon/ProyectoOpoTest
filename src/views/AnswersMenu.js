import { DynamicMenu, Option } from "../utils/view/Menu.js";
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
        ¿Es correcta?(1=Sí/0=No):`);
        this.#answer.evaluate(isOK === 1);
        let isUseful = console.readNumber(`
        ¿Desea marcar la pregunta como útil?(1=Sí/0=No):`);
        this.#answer.setIsUsefulForConcept(isUseful === 1);
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

export { AnswersMenu }