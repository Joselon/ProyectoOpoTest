import { OpenAnswer, SelectedOptionAnswer } from "./Answer.js";

class Question {
    #statementImplementor;
    #statement;
    answers = [];

    constructor(statement, statementImplementor) {
        this.#statement = statement;
        this.#setStatementImplementor(statementImplementor);
    }

    #setStatementImplementor(statementImplementor) {
        this.#statementImplementor = statementImplementor;
    }

    getStatementTarget() {
        return this.#statementImplementor.getTarget();
    }

    getStatement() {
        return this.#statement;
    }

    addToConcept(content, isFake) {
        this.#statementImplementor.addToConcept(content, isFake);
    }

    getType() {
        //return 1 / 0;
    }
    loadAnswersFromDataObject(questionDataObject) {
        //return 1 / 0;
    }
    formatAnswersObjects() {
        //return 1 / 0;
    }

}

class OpenQuestion extends Question {

    constructor(statement, statementType, concept) {
        super(statement, statementType, concept);
    }

    getType() {
        return "Open";
    }

    addAnswer(username, string, date = new Date()) {
        this.answers.push(new OpenAnswer(username, string, this, date));
    }

    getAnswer(index) {
        return this.answers[index];
    }

    getAnswers() {
        return this.answers;
    }

    isAnsweredBy(studentName) {
        let isAnsweredByUser = false;
        for (let answer of this.getAnswers()) {
            if (studentName === answer.getStudentName())
                isAnsweredByUser = true;
        }
        return isAnsweredByUser;
    }

    loadAnswersFromDataObject(questionDataObject) {
        let indexAns = 0;
        for (let answer of questionDataObject.answers) {
            this.addAnswer(answer.username, answer.content, answer.createdDate);
            if (answer.evaluatedDate !== null)
                this.answers[indexAns].evaluate(answer.isOK, answer.evaluatedDate, answer.isUsefulForConcept, answer.evaluatedBy);
            indexAns++;
        }
    }

    formatAnswersObjects() {
        let questionAnswersObjects = [];
        for (let answer of this.answers) {
            questionAnswersObjects.push(
                {
                    username: answer.getStudentName(),
                    content: answer.getContent(),
                    isOK: answer.getEvaluation(),
                    isUsefulForConcept: answer.isUsefulForConcept(),
                    createdDate: answer.getCreatedDate(),
                    evaluatedBy: answer.getEvaluatedBy(),
                    evaluatedDate: answer.getEvaluatedDate()
                });
        }
        return questionAnswersObjects;
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
    addAnswer(username, optionSelected, date = new Date()) {
        this.answers.push(new SelectedOptionAnswer(username, optionSelected, this, date));
    }

    getAnswers() {
        return this.answers;
    }

    loadAnswersFromDataObject(questionDataObject) {
        let indexAns = 0;
        for (let answer of questionDataObject.answers) {
            this.addAnswer(answer.username, answer.content, answer.createdDate);
            if (answer.evaluatedDate !== null)
                this.answers[indexAns].evaluate(answer.isOK, answer.evaluatedDate);
            indexAns++;
        }
    }

    formatAnswersObjects() {
        let questionAnswersObjects = [];
        for (let answer of this.answers) {
            questionAnswersObjects.push(
                {
                    username: answer.getUserName(),
                    content: answer.getContent(),
                    isOK: answer.getEvaluation(),
                    createdDate: answer.getCreatedDate(),
                    evaluatedDate: answer.getEvaluatedDate()
                });
        }
        return questionAnswersObjects;
    }
}

export { OpenQuestion, MultipleChoiceQuestion }