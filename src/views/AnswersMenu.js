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
        super.interact();
        let isOK = console.readNumber(`
        ¿Es correcta?(1=Sí/0=No):`);
        this.#answer.evaluate(isOK);
    }

}


class AnswersMenu extends DynamicMenu {

    #answers;

    constructor(answers) {
        super(" Respuestas:");
        this.#answers = answers;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#answers.length; i++) {
            this.add(new SelectAndEvaluateAnswerOption(this.#answers[i]));
        }
    }

}

export { AnswersMenu }