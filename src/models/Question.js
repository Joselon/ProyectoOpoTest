import { OpenAnswer, SelectedOptionAnswer } from "./Answer.js";

class Question {
    _statementImplementor;
    _statement;
    _answers = [];

    constructor(statement, statementImplementor) {
        this._statement = statement;
        this._statementImplementor = statementImplementor;
    }

    getStatementTarget() {
        return this._statementImplementor.getTarget();
    }

    getStatement() {
        return this._statement;
    }

    getConceptIndex(){
        return this._statementImplementor.getConceptIndex();
    }

    addToConcept(content, isFake) {
        this._statementImplementor.addToConcept(content, isFake);
    }

    getAnswer(index) {
        return this._answers[index];
    }

    getAnswers() {
        return this._answers;
    }

    getType() {
        return 1 / 0;
    }
    loadAnswersFromDataObject(questionDataObject) {
        return 1 / 0;
    }
    formatAnswersObjects() {
        return 1 / 0;
    }

}

class OpenQuestion extends Question {

    constructor(statement, statementType) {
        super(statement, statementType);
    }

    getType() {
        return "Open";
    }

    addAnswer(username, string, date = new Date()) {
        this._answers.push(new OpenAnswer(username, string, date));
    }

    isAnsweredBy(studentName) {
        let isAnsweredByUser = false;
        for (let answer of this._answers) {
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
                this._answers[indexAns].evaluate(answer.isOK, answer.evaluatedDate, answer.evaluatedBy);
            indexAns++;
        }
    }

    formatAnswersObjects() {
        let questionAnswersObjects = [];
        for (let answer of this._answers) {
            questionAnswersObjects.push(
                {
                    username: answer.getStudentName(),
                    content: answer.getContent(),
                    isOK: answer.getEvaluation(),
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

    constructor(statement, statementType) {
        super(statement, statementType);
        //this.#buildOptions();
    }

    getType() {
        return "MultipleChoice";
    }
    addAnswer(username, optionSelected, date = new Date()) {
        this._answers.push(new SelectedOptionAnswer(username, optionSelected, date));
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
        for (let answer of this._answers) {
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