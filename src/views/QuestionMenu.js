import { DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";

class SelectStatementTypeOption extends Option {
    #array;
    #index;
    #state;

    constructor(title, array, index, state) {
        super(title);
        this.#array = array;
        this.#index = index;
        this.#state = state;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#array[this.#index]}`;
    }

    interact() {
        super.interact();
        this.#state.setSelectedStatementType(this.#index);

    }

}

class SelectAnswerTypeAndShowStatementTypesOption extends OpenMenuOption {
    #type
    #state;

    constructor(menu, type, state) {
        super(` ${type} `, menu);
        this.#type = type;
        this.#state = state;
    }

    interact() {
        super.interact();
        this.#state.setSelectedAnswerType(this.#type);
    }
}

class OpenQuestionMenu extends DynamicMenu {
    #concept;
    #userState;
    #statementTypesTitles = ["Definicion", "Jerarquía de tipos", "Jerarquía de composición"];
    #statementTypes = ["Definition", "Classification", "Composition"];

    constructor(title, userState) {
        super(title);
        this.#userState = userState;
        this.#concept = this.#userState.getCurrentConcept();
    }

    addOptions() {
        for (let i = 0; i < this.#statementTypesTitles.length; i++) {
            this.add(new SelectStatementTypeOption(`Seleccionar Tipo: ${this.#statementTypesTitles[i]}`, this.#statementTypes, i, this.#userState));
        }

    }

}

class QuestionMenu extends DynamicMenu {
    // #types = ["Open", "MultipleChoice"];
    #userState;
    #concept;

    constructor(userState) {
        super("Seleccione el tipo de pregunta")
        this.#userState = userState;
        this.#concept = this.#userState.getCurrentConcept();

    }

    addOptions() {
        this.add(new SelectAnswerTypeAndShowStatementTypesOption(new OpenQuestionMenu("Tipo de enunciado", this.#userState), "Open", this.#userState));
        if (this.#concept.getState() !== "Primary") {
            this.add(new SelectAnswerTypeAndShowStatementTypesOption(new MultipleChoiceQuestionMenu("Tipo de enunciado", this.#userState), "MultipleChoice", this.#userState));
        }
    }



}

export { QuestionMenu }