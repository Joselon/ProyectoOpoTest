import { OpenAnswer, SelectedOptionAnswer } from "./Answer.js";

class Question {
    #statementType;
    #statement;
    #concept;
    answers = [];

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

    getType() {
        //return 1 / 0;
    }
    loadAnswersFromDataObject(question){

    }
    

}

class OpenQuestion extends Question {

    constructor(statement, statementType, concept) {
        super(statement, statementType, concept);
    }

    getType() {
        return "Open";
    }

    addAnswer(username, string, date) {
        if (date === undefined)
            this.answers.push(new OpenAnswer(username, string, this, new Date()));
        else
            this.answers.push(new OpenAnswer(username, string,  this, date));
    }

    getAnswer(index) {
        return this.answers[index];
    }

    getAnswers() {
        return this.answers;
    }

    loadAnswersFromDataObject(question) {
        let indexAns = 0;
        for (let answer of question.answers) {
            this.addAnswer(answer.username, answer.content, answer.createdDate);
            if (answer.evaluatedDate !== null)
                this.answers[indexAns].evaluate(answer.isOK, answer.evaluatedDate, answer.isUsefulForConcept);
            indexAns++;
        }
    }

}

class MultipleChoiceQuestion extends Question {
    #options = [];

    constructor(statement, statementType, concept) {
        super(statement, statementType, concept);
        this.statement = statement;
        //this.#buildOptions();
    }

    getType() {
        return "MultipleChoice";
    }
    addAnswer(username, optionSelected, date) {
        if (date === undefined)
            this.answers.push(new SelectedOptionAnswer(username, optionSelected, this, new Date()));
        else
            this.answers.push(new SelectedOptionAnswer(username, optionSelected, this, date));
    }

    getAnswers() {
        return this.answers;
    }

    loadAnswersFromDataObject(question) {
        let indexAns = 0;
        for (let answer of question.answers) {
            this.addAnswer(answer.username, answer.content, answer.createdDate);
            if (answer.evaluatedDate !== null) 
                this.answers[indexAns].evaluate(answer.isOK, answer.evaluatedDate);
            indexAns++;
        }
    }
}

export { OpenQuestion, MultipleChoiceQuestion }