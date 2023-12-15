import { DynamicQuitMenu, DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { QuestionBuilder } from "../models/QuestionBuilder.js";
import { console } from "../utils/view/console.js";

class AddQuestionOption extends OpenMenuOption {
    #userState;

    constructor(title, menu, userState) {
        super(title, menu);
        this.#userState = userState;
    }

    interact() {
        super.interact();
        let type = this.#userState.getSelectedQuestionType();
        let target = this.#userState.getSelectedStatementTarget();

        let category = this.#userState.getCurrentCategory();
        let conceptIndex = this.#userState.getCurrentConceptIndex();
        let questionBuilder = new QuestionBuilder(conceptIndex, category);

        let statement = console.readString(`
        Escribe el enunciado de la pregunta de tipo ${target}:`);
        category.addQuestion(questionBuilder.create(type, statement, target));
    }
}

class SelectStatementAndShowQuestionTypeMenuOption extends OpenMenuOption {
    #statementTarget;
    #userState;

    constructor(statementTargetTitle, statementTarget, menu, userState) {
        super(statementTargetTitle, menu);
        this.#statementTarget = statementTarget;
        this.#userState = userState;
    }

    interact() {
        super.interact();
        this.#userState.setSelectedStatementTarget(this.#statementTarget);
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
    #userState;
    #typesTitles = [];
    #types = [];

    constructor(userState) {
        super("Seleccione el tipo de pregunta")
        this.#userState = userState;
    }

    addOptions() {
        new QuestionBuilder(this.#userState.getCurrentConceptIndex(), this.#userState.getCurrentCategory()).setQuestionTypesAvailable(this.#types , this.#typesTitles);
        for (let i = 0; i < this.#types.length; i++){
            this.add(new SelectQuestionTypeOption(this.#typesTitles[i], this.#types[i], this.#userState));
        }
    }
}

class StatementMenu extends DynamicMenu {
    #userState;

    constructor(title, userState) {
        super(title);
        this.#userState = userState;
    }

    addOptions() {
        const statementTargetTitles = [];
        const statementTargets = [];
        let questionBuilder = new QuestionBuilder(this.#userState.getCurrentConceptIndex(), this.#userState.getCurrentCategory())
        questionBuilder.setStatementsAvailablesInConcept(statementTargets, statementTargetTitles);

        for (let i = 0; i < statementTargets.length; i++) {
            for (let j = 0; j < statementTargets[i].length; j++) {
                let isCreated;
                for (let question of this.#userState.getCurrentCategory().getConceptQuestions(this.#userState.getCurrentConceptIndex())) {
                    console.writeln(question.getStatementTarget());
                    if (question.getStatementTarget() === statementTargets[i][j]) {
                        isCreated = true;
                    }
                    else {
                        isCreated = false;
                    }
                }
                this.add(new SelectStatementAndShowQuestionTypeMenuOption(`Seleccionar Tipo: ${statementTargetTitles[i][j]} -${isCreated ? "(YA CREADA)" : ""}`, statementTargets[i][j], new QuestionTypeMenu(this.#userState), this.#userState));
            }
        }
    }
}

class QuestionMenu extends DynamicQuitMenu {
    #userState;
    #category;
    #concept;
    #questionsInfoTitle;

    constructor(userState) {
        super("Menú de Preguntas")
        this.#userState = userState;
        this.#category = this.#userState.getCurrentCategory();
        this.#concept = this.#userState.getCurrentConcept();
    }

    addOptions() {
        this.addQuestionsInfo();
        this.add(new AddQuestionOption(`Crear de Preguntas de ${this.#concept.getKeyword()} ...`, new StatementMenu(`Tipos de Enunciado disponibles para ${this.#concept.getKeyword()}`, this.#userState), this.#userState))
    }

    addQuestionsInfo() {
        let charIndex = "a".charCodeAt(0);
        this.#questionsInfoTitle = "\nPreguntas Creadas: \n";
        this.#questionsInfoTitle += "------------------ \n";
        for (let question of this.#category.getQuestions()) {
            if (question.getConceptIndex() === this.#userState.getCurrentConceptIndex()) {
                this.#questionsInfoTitle += String.fromCharCode(charIndex) + ")";
                this.#questionsInfoTitle += "Concepto Relacionado: '" + this.#category.getConcept(question.getConceptIndex()).getKeyword() + "' - ";
                this.#questionsInfoTitle += "Enunciado: '¿" + question.getStatement() + "?'\n";
                this.#questionsInfoTitle += "Objetivo del Enunciado: '" + question.getStatementTarget() + "' - ";
                this.#questionsInfoTitle += "Tipo de Pregunta: '" + question.getType() + "'\n";
                this.#questionsInfoTitle += "\n";
                charIndex++;
            }
        }
    }
    interact_() {
        console.writeln(this.#questionsInfoTitle);
        super.interact_();
    }
}

export { QuestionMenu }