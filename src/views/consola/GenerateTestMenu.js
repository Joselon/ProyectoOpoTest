import { DynamicQuitMenu, Option } from "../../utils/view/consola/Menu.js";
import { console } from "../../utils/view/consola/console.js";

class AddAnswerOption extends Option {
    #question;
    #username;

    constructor(title, question, username) {
        super(title);
        this.#question = question;
        this.#username = username;
    }

    interact() {
        //QuestionVisitor para leer un string o una opción.
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
            console.writeln(this.#questions[i]);
            if (!this.#questions[i].isAnsweredBy(this.#username))
                this.add(new AddAnswerOption(`- Responder: ${this.#questions[i].getStatement()}... `, this.#questions[i], this.#username));
        }
    }
}

export { GenerateTestMenu }