import { DynamicQuitMenu, Option } from "../utils/view/Menu.js";
import { console } from "../utils/view/console.js";

class AddAnswerOption extends Option {
    #question;
    #username;

    constructor(title, question, username) {
        super(title);
        this.#question = question;
        this.#username = username;
    }

    interact() {
        let content = console.readString(`Respuesta :`);
        this.#question.addAnswer(this.#username, content);
    }
}
class GenerateTestMenu extends DynamicQuitMenu {
    #username;
    #questions;

    constructor(questions, username) {
        super("Test");
        this.#questions = questions;
        this.#username = username;
    }

    addOptions() {

        for (let i = 0; i < this.#questions.length; i++) {
            let doneByUser = false;
            for (let answer of this.#questions[i].getAnswers()) {
                if (this.#username === answer.getUserName())
                    doneByUser = true;
            }
            if (!doneByUser)
                this.add(new AddAnswerOption(`- Responder: ${this.#questions[i].getStatement()}... `, this.#questions[i], this.#username));
        }
    }

}

export { GenerateTestMenu }