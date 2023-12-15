import { OpenQuestion, MultipleChoiceQuestion } from "./Question.js";
import { DefinitionStatement, ClassificationStatement, CompositionStatement, ReverseDefinitionStatement } from "./Statement.js";

class QuestionBuilder {
    #conceptIndex;
    #concept;
    #category;
    #statementImplementor;

    constructor(conceptIndex, category) {
        this.#conceptIndex = conceptIndex;
        this.#category = category;
        this.#concept = this.#category.getConcept(conceptIndex);
    }

    setStatementImplementor(target) {
        if (target === "Definition") {
            this.#statementImplementor = new DefinitionStatement(this.#concept, this.#conceptIndex);
        }
        else if (target === "Classification") {
            this.#statementImplementor = new ClassificationStatement(this.#concept, this.#conceptIndex);
        }
        else if (target === "Composition") {
            this.#statementImplementor = new CompositionStatement(this.#concept, this.#conceptIndex);
        }
        else if (target === "FakeKeywords") {
            this.#statementImplementor = new ReverseDefinitionStatement(this.#concept, this.#conceptIndex);
        }
        else {
            //TODO
        }
    }

    create(type, statement) {
        let question;
        if (type === "Open") {
            question = new OpenQuestion(statement, this.#statementImplementor);
        }
        else if (type === "MultipleChoice") {
            question = new MultipleChoiceQuestion(statement, this.#statementImplementor);
        }
        return question;
    }

    setStatementsAvailablesInConcept(statementTargets, statementTargetTitles) {
        let primaryTypes = ["Definition", "Classification", "Composition"];
        let primaryTitles = [
            `Definición: ¿Qué es ${this.#concept.getKeyword()}?`,
            `Jerarquía de tipos: ¿Qué tipos de ${this.#concept.getKeyword()} hay?`,
            `Jerarquía de composición: ¿De qué se compone ${this.#concept.getKeyword()}?`
        ];
        statementTargets.push(primaryTypes);
        statementTargetTitles.push(primaryTitles);

        if (this.#concept.getNumberOfDefinitions() !== 0) {
            let withDefinitionTypes = ["FakeKeywords", "Justification", "Definition"];
            let withDefinitionTitles = [
                `Sinonimos:${this.#concept.getDefinition(0).getContent()}. ¿A que corresponde esta definición?`,
                `Justificación: ¿${this.#concept.getKeyword()} ${this.#concept.getDefinition(0).getContent()}?¿Por qué?`,
                `Definición (Automática): ¿Qué es ${this.#concept.getKeyword()}?`
            ];
            statementTargets.push(withDefinitionTypes);
            statementTargetTitles.push(withDefinitionTitles);
            // if(this.#concept.getDefinitions()[i].getJustifications().length)
            //withJustificationTypes = ["Explication", "ReverseJustification"];
        }
        if (this.#concept.getNumberOfRelations() !== 0) {
            let withRelationTypes = ["ReverseRelation", "MissingRelation"];
            let withRelationTitles = [
                `Relación Inversa: ¿A qué corresponden estos tipos: `,//${this.#concept.getRelation(0).getType()}
                `Relación Faltante: Si X es un tipo de ${this.#concept.getKeyword()} ¿Que tipo falta?`// X=${this.#concept.getRelation(0).getConcept(0)?
            ];
            statementTargets.push(withRelationTypes);
            statementTargetTitles.push(withRelationTitles);
        }
    }

    setQuestionTypesAvailable(types, typesTitles) {
        types.push("Open");
        typesTitles.push("Abierta");
        if (this.#concept.getNumberOfDefinitions() > 1 || this.#concept.getNumberOfRelations() > 1) {
            types.push("MultipleChoice");
            typesTitles.push("Opción Multiple");
        }
    }

      setTypesAvailablesInConcept(targets, targetsTitles, type, typeTitles) {
        let primaryTargets = [];
        let primaryTargetTitles = [];
        let questions = this.#category.getConceptQuestions(this.#conceptIndex);
        let targetsAndTypesCreated = [];
        for (let question of questions){
            targetsAndTypesCreated.push(question.getStatementTarget()+"-"+question.getType());
        }
        primaryTargets = ["Definition", "Classification", "Composition"];
        primaryTargetTitles = [
            `Definición: ¿Qué es ${this.#concept.getKeyword()}?`,
            `Jerarquía de tipos: ¿Qué tipos de ${this.#concept.getKeyword()} hay?`,
            `Jerarquía de composición: ¿De qué se compone ${this.#concept.getKeyword()}?`
        ];
        targets.push(primaryTargets);
        targetsTitles.push(primaryTargetTitles);
        type.push("Open");
        typeTitles.push("Abierta");

        if (this.#concept.getNumberOfDefinitions() !== 0) {
            let withDefinitionTypes = ["FakeKeywords", "Justification", "Definition"];
            let withDefinitionTitles = [
                `Sinonimos:${this.#concept.getDefinition(0).getContent()}. ¿A que corresponde esta definición?`,
                `Justificación: ¿${this.#concept.getKeyword()} ${this.#concept.getDefinition(0).getContent()}?¿Por qué?`,
                `Definición (Automática): ¿Qué es ${this.#concept.getKeyword()}?`
            ];
            targets.push(withDefinitionTypes);
            targetsTitles.push(withDefinitionTitles);
            // if(this.#concept.getDefinitions()[i].getJustifications().length)
            //withJustificationTypes = ["Explication", "ReverseJustification"];
        }
        if (this.#concept.getNumberOfRelations() !== 0) {
            let withRelationTypes = ["ReverseRelation", "MissingRelation"];
            let withRelationTitles = [
                `Relación Inversa: ¿A qué corresponden estos tipos: `,//${this.#concept.getRelation(0).getType()}
                `Relación Faltante: Si X es un tipo de ${this.#concept.getKeyword()} ¿Que tipo falta?`// X=${this.#concept.getRelation(0).getConcept(0)?
            ];
            targets.push(withRelationTypes);
            targetsTitles.push(withRelationTitles);
        }
    }
}

export { QuestionBuilder }