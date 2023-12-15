import { OpenQuestion, MultipleChoiceQuestion } from "./Question.js";
import { DefinitionStatement, ClassificationStatement, CompositionStatement, ReverseDefinitionStatement } from "./Statement.js";

class QuestionBuilder {
    #conceptIndex;
    #concept;
    #category;

    constructor(conceptIndex, category) {
        this.#conceptIndex = conceptIndex;
        this.#category = category;
        this.#concept = this.#category.getConcept(conceptIndex);
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

    #setStatementImplementor(target) {
        let statementImplementor;
        if (target === "Definition") {
            statementImplementor = new DefinitionStatement(this.#concept, this.#conceptIndex);
        }
        else if (target === "Classification") {
            statementImplementor = new ClassificationStatement(this.#concept, this.#conceptIndex);
        }
        else if (target === "Composition") {
            statementImplementor = new CompositionStatement(this.#concept, this.#conceptIndex);
        }
        else if (target === "FakeKeywords") {
            statementImplementor = new ReverseDefinitionStatement(this.#concept, this.#conceptIndex);
        }
        else {
            //TODO
        }
        return statementImplementor;
    }

    create(type, statement, target) {
        let statementImplementor = this.#setStatementImplementor(target);
        let question;
        if (type === "Open") {
            question = new OpenQuestion(statement, statementImplementor);
        }
        else if (type === "MultipleChoice") {
            question = new MultipleChoiceQuestion(statement, statementImplementor);
        }
        return question;
    }
}

export { QuestionBuilder }