import { OpenQuestion, MultipleChoiceQuestion } from "./Question.js";
import { DefinitionStatement, ClassificationStatement, CompositionStatement, ReverseDefinitionStatement } from "./Statement.js";

class QuestionBuilder {
    #conceptIndex;
    #concept;
    #category;

    constructor(conceptIndex, category) {
        this.#conceptIndex = conceptIndex;
        this.#category = category;
        this.#concept = this.#category.getConcepts()[conceptIndex];
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