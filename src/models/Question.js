import { OpenAnswer, SelectedOptionAnswer } from "./Answer.js";

class Question {
    _conceptKey;
    _statementImplementor;
    _statement;
    _answers = [];

    constructor(conceptKey, statement, statementImplementor) {
        this._conceptKey = conceptKey;
        this._statement = statement;
        this._statementImplementor = statementImplementor;
    }

    getTarget() {
        return this._statementImplementor.getTarget();
    }

    getStatement() {
        return this._statement;
    }

    getConceptKey() {
        return this._conceptKey;
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
    isAnsweredBy(studentName) {
        let isAnsweredByUser = false;
        for (let answer of this._answers) {
            if (studentName === answer.getStudentName())
                isAnsweredByUser = true;
        }
        return isAnsweredByUser;
    }
    loadAnswersFromDataObject(questionDataObject) {
        return 1 / 0;
    }

    formatQuestionObject() {
        const questionObject = {
            conceptKey: this.getConceptKey(),
            statement: this.getStatement(),
            target: this.getTarget(),
            type: this.getType(),
            answers: []
        };
        questionObject.answers = this._formatAnswersObjects();
        return questionObject;
    }
    _formatAnswersObjects() {
        const questionAnswersObjects = [];
        for (let answer of this._answers) {
            questionAnswersObjects.push(answer.formatAnswerObject());
        }
        return questionAnswersObjects;
    }
}

class OpenQuestion extends Question {

    constructor(conceptKey, statement, statementType) {
        super(conceptKey, statement, statementType);
    }

    getType() {
        return "Open";
    }

    addAnswer(username, string, date = new Date()) {
        this._answers.push(new OpenAnswer(username, string, date));
    }

    loadAnswersFromDataObject(questionDataObject) {
        let indexAns = 0;
        for (const answerObject of questionDataObject.answers) {
            this.addAnswer(answerObject.username, answerObject.content, answerObject.createdDate);
            if (answerObject.evaluatedDate !== null)
                this._answers[indexAns].evaluate(answerObject.isOK, answerObject.evaluatedDate, answerObject.evaluatedBy);
            indexAns++;
        }
    }
}

class MultipleChoiceQuestion extends Question {
    #options = [];

    constructor(conceptKey, statement, statementType) {
        super(conceptKey, statement, statementType);
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
        for (const answerObject of questionDataObject.answers) {
            this.addAnswer(answerObject.username, answerObject.content, answerObject.createdDate);
            if (answerObject.evaluatedDate !== null)
                this.answers[indexAns].evaluate(answerObject.isOK, answerObject.evaluatedDate);
            indexAns++;
        }
    }

}

export { OpenQuestion, MultipleChoiceQuestion }