import { DynamicMenu, OpenMenuOption, QuitOption } from "../utils/view/Menu.js";
import { AnswersMenu } from "./AnswersMenu.js";


class ReviewMenu extends DynamicMenu {

    #questions;

    constructor(questions) {
        super("Menú de Revisión de Respuestas");
        this.#questions = questions;
    }

    addOptions() {

        for (let i = 0; i < this.#questions.length; i++) {
            if (this.#questions[i].getAnswers().length > 0)
                this.add(new OpenMenuOption(`- Seleccionar Respuesta de: ${this.#questions[i].getStatement()}... `, new AnswersMenu(this.#questions[i].getAnswers())));
        }
        this.add(new QuitOption());
    }

}

export { ReviewMenu }