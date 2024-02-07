import { OpenQuestion, MultipleChoiceQuestion } from "./Question.js";
import { DefinitionStatement, ClassificationStatement, CompositionStatement, FakeKeywordStatement, JustificationStatement } from "./Statement.js";

class QuestionBuilder {
    #concept;
    #questions;
    #statementImplementor;
    #statementPrototypes;

    constructor(category, conceptKey, questions = []) {
        this.#concept = category.getConcept(conceptKey);
        this.#questions = questions;
        this.#statementPrototypes = [
            new DefinitionStatement(this.#concept),
            new ClassificationStatement(this.#concept),
            new CompositionStatement(this.#concept)
        ];
    }

    setStatementImplementor(target) {
        if (target === "Definition") {
            this.#statementImplementor = new DefinitionStatement(this.#concept);
        }
        else if (target === "Classification") {
            this.#statementImplementor = new ClassificationStatement(this.#concept);
        }
        else if (target === "Composition") {
            this.#statementImplementor = new CompositionStatement(this.#concept);
        }
        else if (target === "FakeKeywords") {
            this.#statementImplementor = new FakeKeywordStatement(this.#concept);
        }
        else {
            //TODO
        }
    }

    create(type, conceptKey, statement) {
        let question;
        if (type === "Open") {
            question = new OpenQuestion(conceptKey, statement, this.#statementImplementor);
        }
        else if (type === "MultipleChoice") {
            question = new MultipleChoiceQuestion(conceptKey, statement, this.#statementImplementor);
        }
        return question;
    }

    getStatementsAvailablesInConcept() {
        let statementTargets = [];
        let statementTargetTitles = [];
        const primaryTypes = [];
        const primaryTitles = [];
        for (let statement of this.#statementPrototypes) {
            primaryTypes.push(statement.getTarget());
            primaryTitles.push(statement.getStatement());
        }
        statementTargets.push(primaryTypes);
        statementTargetTitles.push(primaryTitles);

        if (this.#concept.getNumberOfDefinitions() !== 0) {
            const secundaryStatements = [
                new FakeKeywordStatement(this.#concept, this.#concept.getDefinition(0)),
                new JustificationStatement(this.#concept, this.#concept.getDefinition(0))
            ];
            const withDefinitionTypes = [];
            const withDefinitionTitles = [];
            for (let statement of secundaryStatements){
                withDefinitionTypes.push(statement.getTarget());
                withDefinitionTitles.push(statement.getStatement());
            }
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
        return [statementTargets,statementTargetTitles ];
    }

    getQuestionTypesAvailable() {
        let types = [];
        let typesTitles = [];
        let openIsJustCreated = false;
        for (let question of this.#questions) {
            if (question.getTarget() === this.#statementImplementor.getTarget()) {
                if (question.getType() === "Open")
                    openIsJustCreated = true;
            }
        }
        if (!openIsJustCreated) {
            types.push("Open");
            typesTitles.push("Abierta");
        }
        if (this.#concept.getNumberOfDefinitions() > 1 || this.#concept.getNumberOfRelations() > 1) {
            types.push("MultipleChoice");
            typesTitles.push("Tipo Test");
        }
        return [types,typesTitles];
    }

    getStatementImplementor() {
        return this.#statementImplementor;
    }
}

export { QuestionBuilder }