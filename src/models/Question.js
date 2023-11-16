import { OpenAnswer, SelectedOptionAnswer } from "./Answer.js";

class Question {
    #statementType;
    #statement;
    #concept;

    constructor(statement, statementType, concept) {
        this.#statementType = statementType;
        this.#statement = statement;
        this.#concept = concept;
    }

    getStatementType() {
        return this.#statementType;
    }

    getStatement() {
        return this.#statement;
    }

    getConcept() {
        return this.#concept;
    }

    getAnswerType() {
        return 1 / 0;
    }

}

class OpenQuestion extends Question {
    #openAnswers = [];

    constructor(statement, statementType, concept) {
        super(statement, statementType, concept);
    }

    getAnswerType() {
        return "Open";
    }

    addAnswer(username, string, date) {
        if (date === undefined)
            this.#openAnswers.push(new OpenAnswer(username, string, this, new Date()));
        else
            this.#openAnswers.push(new OpenAnswer(username, string,  this, date));
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
        super(statement, statementType, concept);
        this.statement = statement;
        //this.#buildOptions();
    }

    getAnswerType() {
        return "MultipleChoice";
    }
    addAnswer(username, optionSelected, date) {
        if (date === undefined)
            this.#selectedOptionAnswers.push(new SelectedOptionAnswer(username, optionSelected, this, new Date()));
        else
            this.#selectedOptionAnswers.push(new SelectedOptionAnswer(username, optionSelected, this, date));
    }

    getAnswers() {
        return this.#selectedOptionAnswers;
    }

}

export { OpenQuestion, MultipleChoiceQuestion }