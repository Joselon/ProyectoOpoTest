import { DynamicQuitMenu, DynamicMenu, OpenMenuOption, Option } from "../utils/view/Menu.js";
import { OpenQuestion, MultipleChoiceQuestion } from "../models/Question.js";
import { DefinitionStatement, ClassificationStatement, CompositionStatement, ReverseDefinitionStatement } from "../models/Statement.js";
import { console } from "../utils/view/console.js";

class AddQuestionOption extends OpenMenuOption {
    #userState;

    constructor(title, menu, userState) {
        super(title, menu);
        this.#userState = userState;
    }

    interact() {
        super.interact();
        let category = this.#userState.getCurrentCategory();
        let concept = this.#userState.getCurrentConcept();
        let conceptIndex = this.#userState.getCurrentCategory().getConcepts().indexOf(concept);
        let target = this.#userState.getSelectedStatementTarget();
        let statementImplementor;
        if (target === "Definition") {
            statementImplementor = new DefinitionStatement(concept, conceptIndex);
        }
        else if (target === "Classification") {
            statementImplementor = new ClassificationStatement(concept, conceptIndex);
        }
        else if (target === "Composition") {
            statementImplementor = new CompositionStatement(concept, conceptIndex);
        }
        else if (target === "FakeKeywords") {
            let definition = concept.getDefinition(0); //TODO Menu para elegir solution como indice
            statementImplementor = new ReverseDefinitionStatement(concept, conceptIndex, definition);
        }
        else {
            //TODO
            console.writeln("ERROR no existe un tipo de enunciado coincidente");
        }
        let statement = console.readString(`
        Escribe el enunciado de la pregunta de tipo ${target}:`);
        if (this.#userState.getSelectedQuestionType() === "Open") {

            category.addQuestion(new OpenQuestion(statement, statementImplementor));
        }
        else if (this.#userState.getSelectedQuestionType() === "MultipleChoice") {
            category.addQuestion(new MultipleChoiceQuestion(statement, statementImplementor));
        }

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
        //
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
    #category;
    #userState;

    #primaryTitles;
    #withDefinitionTitles;
    #withRelationTitles;
    #withJustificationTypesTitles;
    #statementTargetTitles;

    #primaryTypes = ["Definition", "Classification", "Composition"];
    #withDefinitionTypes = ["FakeKeywords", "Justification", "Definition"];
    #withRelationTypes = ["ReverseRelation", "MissingRelation"];
    #withJustificationTypes = ["Explication", "ReverseJustification"];
    #statementTargets;

    constructor(title, userState) {
        super(title);
        this.#userState = userState;
        this.#concept = this.#userState.getCurrentConcept();
        this.#category = this.#userState.getCurrentCategory();
        this.#statementTargets = [];
        this.#statementTargetTitles = [];

        this.#primaryTitles = [
            `Definición: ¿Qué es ${this.#concept.getKeyword()}?`,
            `Jerarquía de tipos: ¿Qué tipos de ${this.#concept.getKeyword()} hay?`,
            `Jerarquía de composición: ¿De qué se compone ${this.#concept.getKeyword()}?`
        ];
        this.#statementTargets.push(this.#primaryTypes);
        this.#statementTargetTitles.push(this.#primaryTitles);

        if (this.#concept.getNumberOfDefinitions() !== 0) {
            this.#withDefinitionTitles = [
                `Definición Inversa:${this.#concept.getDefinition(0).getContent()}. ¿A que corresponde esta definición?`,
                `Justificación: ¿${this.#concept.getKeyword()} ${this.#concept.getDefinition(0).getContent()}?¿Por qué?`,
                `Definición (Automática): ¿Qué es ${this.#concept.getKeyword()}?`
            ];
            this.#statementTargets.push(this.#withDefinitionTypes);
            this.#statementTargetTitles.push(this.#withDefinitionTitles);
        }
        if (this.#concept.getNumberOfRelations() !== 0) {
            this.#withRelationTitles = [
                `Relación Inversa: ¿A qué corresponden estos tipos: `,//${this.#concept.getRelation(0).getType()}
                `Relación Faltante: Si X es un tipo de ${this.#concept.getKeyword()} ¿Que tipo falta?`// X=${this.#concept.getRelation(0).getConcept(0)?
            ];
            this.#statementTargets.push(this.#withRelationTypes);
            this.#statementTargetTitles.push(this.#withRelationTitles);
        }
        // if(this.#concept.getDefinitions()[i].getJustifications().length)
    }

    addOptions() {
        for (let i = 0; i < this.#statementTargetTitles.length; i++) {
            for (let j = 0; j < this.#statementTargets[i].length; j++) {
                let isCreated = false;
                for (let question of this.#category.getQuestions()) {
                    if (question.getStatementTarget() === this.#statementTargets[i][j]) {
                        isCreated = true;
                    }
                }
                this.add(new SelectStatementAndShowQuestionTypeMenuOption(`Seleccionar Tipo: ${this.#statementTargetTitles[i][j]} -${isCreated ? "(YA CREADA)" : ""}`, this.#statementTargets[i][j], new QuestionTypeMenu(this.#userState), this.#userState));
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
        for (let question of this.#category.getAllQuestions()) {
            this.#questionsInfoTitle += String.fromCharCode(charIndex) + ")";
            this.#questionsInfoTitle += "Concepto Relacionado: '" + this.#category.getConcepts()[question.getConceptIndex()].getKeyword() + "' - ";
            this.#questionsInfoTitle += "Enunciado: '¿" + question.getStatement() + "?'\n";
            this.#questionsInfoTitle += "Objetivo del Enunciado: '" + question.getStatementTarget() + "' - ";
            this.#questionsInfoTitle += "Tipo de Pregunta: '" + question.getType() + "'\n";
            this.#questionsInfoTitle += "\n";
            charIndex++;
        }
    }
    interact_() {
        console.writeln(this.#questionsInfoTitle);
        super.interact_();
    }
}

export { QuestionMenu }