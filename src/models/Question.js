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

    addAnswer(string) {
        this.#openAnswers.push(string)
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

    #buildStatement() {

    }

    getAnswerType() {
        return "MultipleChoice";
    }
    addAnswer(optionSelectedAnswer) {
        this.#selectedOptionAnswers.push(optionSelectedAnswer);
    }

    getAnswers() {
        return this.#selectedOptionAnswers;
    }

}

export { OpenQuestion, MultipleChoiceQuestion }