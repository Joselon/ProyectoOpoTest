import { DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";

class SelectStatementTypeOption extends Option {
    #array;
    #index;
    #userState;

    constructor(title, array, index, userState) {
        super(title);
        this.#array = array;
        this.#index = index;
        this.#userState = userState;
    }

    interact() {
        super.interact();
        this.#userState.setSelectedStatementType(this.#array[this.#index]);

    }

}

class SelectAnswerTypeAndShowStatementTypesOption extends OpenMenuOption {
    #answerType
    #userState;

    constructor(menu, answerType, userState) {
        super(` ${answerType} `, menu);
        this.#answerType = answerType;
        this.#userState = userState;
    }

    interact() {
        super.interact();
        this.#userState.setSelectedAnswerType(this.#answerType);
    }
}

class OpenQuestionMenu extends DynamicMenu {
    #concept;
    #userState;

    #primaryTypesTitles;  //#withDefinitionTypesTitles
    #statementTypesTitles;
    #primaryTypes = ["Definition", "Classification", "Composition"];

    #statementTypes = [this.#primaryTypes];
    //#stages = ["Primary", "WithDefinition", "WithRelation", "WithDefinitionAndRelation"]

    constructor(title, userState) {
        super(title);
        this.#userState = userState;
        this.#concept = this.#userState.getCurrentConcept();
        this.#primaryTypesTitles = [`Definicion: ¿Qué es ${this.#concept.getKeyword()}`, "Jerarquía de tipos", "Jerarquía de composición"];
        this.#statementTypesTitles = [this.#primaryTypesTitles];
    }

    addOptions() {
        for (let i = 0; i < this.#statementTypesTitles.length; i++) {
            if (this.#concept.getNumberOfDefinitions() === 0 && this.#concept.getNumberOfRelations() === 0)
                for (let j = 0; j < this.#statementTypes[i].length; j++)
                    this.add(new SelectStatementTypeOption(`Seleccionar Tipo: ${this.#statementTypesTitles[i][j]}`, this.#statementTypes[i], j, this.#userState));
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
        if (this.#concept.getNumberOfDefinitions() > 0 || this.#concept.getNumberOfRelations() > 0) {
            this.add(new SelectAnswerTypeAndShowStatementTypesOption(new MultipleChoiceQuestionMenu("Tipo de enunciado", this.#userState), "MultipleChoice", this.#userState));
        }
    }



}

export { QuestionMenu }