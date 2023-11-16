import { DynamicQuitMenu, DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { console } from "../utils/view/console.js";

class AddQuestionOption extends OpenMenuOption {
    #userState;

    constructor(title, menu, userState) {
        super(title, menu);
        this.#userState = userState;
    }

    interact() {
        super.interact();
        if (this.#userState.getSelectedQuestionType() !== undefined) {
            let statement = console.readString(`
        Escribe el enunciado de la pregunta de tipo ${this.#userState.getSelectedStatementType()}:`);
            if (this.#userState.getSelectedQuestionType() === "Open")
                this.#userState.getCurrentConcept().addQuestion(new OpenQuestion(statement, this.#userState.getSelectedStatementType(), this.#userState.getCurrentConcept()));
            else if (this.#userState.getSelectedQuestionType() === "MultipleChoice")
                this.#userState.getCurrentConcept().addQuestion(new MultipleChoiceQuestion(statement, this.#userState.getSelectedStatementType(), this.#userState.getCurrentConcept()));
        }
    }
}

class SelectStatementAndShowQuestionTypeMenuOption extends OpenMenuOption {
    #statementTypes;
    #index;
    #userState;

    constructor(statementTypeTitle, statementTypes, index, menu, userState) {
        super(statementTypeTitle, menu);
        this.#statementTypes = statementTypes;
        this.#index = index;
        this.#userState = userState;
    }

    interact() {
        super.interact();
        this.#userState.setSelectedStatementType(this.#statementTypes[this.#index]);
    }
}

class SelectQuestionTypeOption extends Option {
    #questionType
    #userState;

    constructor(title, questionType, userState) {
        super(title);
        this.#questionType = questionType;
        this.#userState = userState;
    }

    interact() {
        super.interact();
        this.#userState.setSelectedQuestionType(this.#questionType);
    }
}

class QuestionTypeMenu extends DynamicMenu {
    // ["Open", "MultipleChoice"];
    #concept;
    #userState;

    constructor(userState) {
        super("Seleccione el tipo de pregunta")
        this.#userState = userState;
        this.#concept = this.#userState.getCurrentConcept();
    }

    addOptions() {
        this.add(new SelectQuestionTypeOption("Abierta", "Open", this.#userState));
        if (this.#concept.getNumberOfDefinitions() > 1 || this.#concept.getNumberOfRelations() > 1)
            this.add(new SelectQuestionTypeOption("Opción Multiple", "MultipleChoice", this.#userState));
    }
}

class StatementMenu extends DynamicMenu {
    //["Primary", "WithDefinition", "WithRelation", "WithDefinitionAndRelation"..]
    #concept;
    #userState;

    #primaryTypesTitles;
    #withDefinitionTypesTitles;
    #withRelationTypesTitles;
    #withJustificationTypesTitles;
    #statementTypesTitles;

    #primaryTypes = ["Definition", "Classification", "Composition"];
    #withDefinitionTypes = ["ReverseDefinition", ""];
    #withRelationTypes = ["", ""];
    #withJustificationTypes = ["", ""];
    #statementTypes;

    constructor(title, userState) {
        super(title);
        this.#userState = userState;
        this.#concept = this.#userState.getCurrentConcept();
        this.#statementTypes = [];
        this.#statementTypesTitles = [];

        this.#primaryTypesTitles = [`Definición: ¿Qué es ${this.#concept.getKeyword()}`, "Jerarquía de tipos", "Jerarquía de composición"];
        this.#statementTypes.push(this.#primaryTypes);
        this.#statementTypesTitles.push(this.#primaryTypesTitles);

        if (this.#concept.getNumberOfDefinitions() !== 0) {
            this.#withDefinitionTypesTitles = [`Definición Inversa: ¿Qué define ${this.#concept.getDefinition(0)}`, ""];
            this.#statementTypes.push(this.#withDefinitionTypes);
            this.#statementTypesTitles.push(this.#withDefinitionTypesTitles);
        }
        if (this.#concept.getNumberOfRelations() !== 0) {
            this.#withRelationTypesTitles = ["", ""];
            this.#statementTypes.push(this.#withRelationTypes);
            this.#statementTypesTitles.push(this.#withRelationTypesTitles);
        }
        // if(this.#concept.getDefinitions()[i].getJustifications().length)
    }

    addOptions() {
        for (let i = 0; i < this.#statementTypesTitles.length; i++) {
            for (let j = 0; j < this.#statementTypes[i].length; j++)
                this.add(new SelectStatementAndShowQuestionTypeMenuOption(`Seleccionar Tipo: ${this.#statementTypesTitles[i][j]}`, this.#statementTypes[i], j, new QuestionTypeMenu(this.#userState), this.#userState));
        }
    }
}

class QuestionMenu extends DynamicQuitMenu {
    #userState;
    #concept;
    #questionsInfoTitle;

    constructor(userState) {
        super("Menú de Preguntas")
        this.#userState = userState;
        this.#concept = this.#userState.getCurrentConcept();
    }

    addOptions() {
        this.addQuestionsInfo();
        this.add(new AddQuestionOption(`Crear de Preguntas de ${this.#concept.getKeyword()} ...`, new StatementMenu(`Tipos de Enunciado disponibles para ${this.#concept.getKeyword()}`, this.#userState), this.#userState))
    }

    addQuestionsInfo() {
        let aindex = "a"
        this.#questionsInfoTitle = "\nPreguntas Creadas: \n";
        for (let question of this.#concept.getQuestions()) {
            this.#questionsInfoTitle += aindex + ")";
            this.#questionsInfoTitle += "Tipo Enunciado: '" + question.getStatementType() + "'/";
            this.#questionsInfoTitle += "Tipo Pregunta: '" + question.getType() + "'\n";
            this.#questionsInfoTitle += "Enunciado: '¿" + question.getStatement() + "?'\n";
            this.#questionsInfoTitle += "\n";
        }
    }
    interact_() {
        console.writeln(this.#questionsInfoTitle);
        super.interact_();
    }
}

export { QuestionMenu }