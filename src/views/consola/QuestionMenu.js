import { DynamicQuitMenu, DynamicMenu, OpenMenuOption, Option } from "../../utils/view/consola/Menu.js";
import { console } from "../../utils/view/consola/console.js";

class AddQuestionOption extends OpenMenuOption {
    #userState;

    constructor(menu, userState) {
        super(`Crear de Preguntas de ${userState.getCurrentConcept().getKeyword()} ...`, menu);
        this.#userState = userState;
    }

    interact() {
        super.interact();
        let type = this.#userState.getSelectedQuestionType();
        let target = this.#userState.getSelectedStatementTarget();
        let statement = console.readString(`
        Escribe el enunciado de la pregunta de tipo ${target}:`);
        this.#userState.getCurrentCategory().addQuestion(this.#userState.getQuestionBuilder().create(type, this.#userState.getCurrentConceptIndex(), statement));
    }
}

class SelectStatementAndShowQuestionTypeMenuOption extends OpenMenuOption {
    #statementTarget;
    #userState;

    constructor(statementTargetTitle, statementTarget, userState) {
        super(statementTargetTitle,new QuestionTypeMenu(userState));
        this.#statementTarget = statementTarget;
        this.#userState = userState;
    }

    interact() {
        this.#userState.setSelectedStatementTarget(this.#statementTarget);
        super.interact();
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
        this.#userState.setSelectedQuestionType(this.#questionType);
        super.interact();
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
        this.#userState.getQuestionBuilder().getQuestionTypesAvailable(this.#types, this.#typesTitles);
        for (let i = 0; i < this.#types.length; i++) {
            this.add(new SelectQuestionTypeOption(this.#typesTitles[i], this.#types[i], this.#userState));
        }
    }
}

class StatementMenu extends DynamicMenu {
    #userState;

    constructor(userState) {
        super(`Tipos de Enunciado disponibles para ${userState.getCurrentConcept().getKeyword()}`);
        this.#userState = userState;
    }

    addOptions() {
        const statementTargetTitles = [];
        const statementTargets = [];
        this.#userState.getQuestionBuilder().getStatementsAvailablesInConcept(statementTargets, statementTargetTitles);

        for (let i = 0; i < statementTargets.length; i++) {
            for (let j = 0; j < statementTargets[i].length; j++) {
                this.add(new SelectStatementAndShowQuestionTypeMenuOption(`Seleccionar Tipo: ${statementTargetTitles[i][j]}`, statementTargets[i][j], this.#userState));
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
        super("Menú de Preguntas");
        this.#userState = userState;
        this.#category = this.#userState.getCurrentCategory();
        this.#concept = this.#userState.getCurrentConcept();
        this.#userState.setQuestionBuilder();
    }

    addOptions() {
        this.addQuestionsInfo();
        this.add(new AddQuestionOption(new StatementMenu(this.#userState), this.#userState));
    }

    addQuestionsInfo() {
        let charIndex = "a".charCodeAt(0);
        this.#questionsInfoTitle = "\nPreguntas Creadas: \n";
        this.#questionsInfoTitle += "------------------ \n";
        for (let question of this.#category.getQuestions()) {
            if (question.getConceptIndex() === this.#userState.getCurrentConceptIndex()) {
                this.#questionsInfoTitle += String.fromCharCode(charIndex) + ")";
                this.#questionsInfoTitle += "Concepto Relacionado: '" + this.#concept.getKeyword() + "' - ";
                this.#questionsInfoTitle += "Enunciado: '¿" + question.getStatement() + "?'\n";
                this.#questionsInfoTitle += "Objetivo del Enunciado: '" + question.getTarget() + "' - ";
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