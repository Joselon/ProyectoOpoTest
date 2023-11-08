import { DynamicQuitMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";


class OpenQuestionMenu extends DynamicQuitMenu {
    #concept;

    constructor(title, concept) {
        super(title);
        this.#concept = concept;
    }

    addOptions() {
        this.add(new Option("Seleccionar Tipo: Definicion, Jerarquía de tipos, Jerarquía de composición"));
    }

}

class QuestionMenu extends DynamicQuitMenu {
    #types = ["Open", "MultipleChoice"];
    #typeIndex;
    #level;
    #concept;

    constructor(concept) {
        super("Seleccione el tipo de pregunta")
        this.#concept = concept;
        this.#level = concept.getState();
    }

    addOptions() {
        this.add(new OpenMenuOption("Abierta", new OpenQuestionMenu("Tipo de enunciado",this.#concept)));
        if (this.#level !== "Primary") {
            this.add(new Option("Tipo Test"));
        }
    }



}

export { QuestionMenu }