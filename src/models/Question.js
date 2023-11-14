import { OpenAnswer, SelectedOptionAnswer } from "./Answer.js";

class Question {
    statementTypes = ["Defintion", "Classification", "Composition"]
    statementType;
    statement;

    constructor(statementType, concept) {
        this.statementType = statementType;
        //  this.#buildStatement(concept);
    }

    getStatementType() {
        return this.statementType;
    }

    getStatement() {
        return this.statement;
    }

    getAnswerType() {
        return 1 / 0;
    }

    /* #buildStatement(concept) {
         this.statement = this.statementTemplateType(concept);
     }
     */

}

class OpenQuestion extends Question {
    #openAnswers = [];

    constructor(statement, statementType, concept) {
        super(statementType, concept);
        this.statement = statement;
        //this.#buildStatement();
    }

    #buildStatement(concept) {
        this.statementType = this.statementTemplateType(concept);

    }

    getAnswerType() {
        return "Open";
    }

    addAnswer(username, string) {
        this.#openAnswers.push(new OpenAnswer(username, string));
    }

    getAnswer(index) {
        return this.#openAnswers[index];
    }

    getAnswers() {
        return this.#openAnswers;
    }

}

class MultipleChoiceQuestion extends Question {
    #options = [];
    #selectedOptionAnswers = [];

    constructor(statement, statementType, concept) {
        super(statementType, concept);
        this.statement = statement;
        //this.#buildStatement();
    }

    #buildOptions() {

    }

    getAnswerType() {
        return "MultipleChoice";
    }
    addAnswer(username, optionSelected) {
        this.#selectedOptionAnswers.push(new SelectedOptionAnswer(username, optionSelected));
    }

    getAnswers() {
        return this.#selectedOptionAnswers;
    }

}

export { OpenQuestion, MultipleChoiceQuestion }