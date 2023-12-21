import { OpenAnswer, SelectedOptionAnswer } from "./Answer.js";

class Question {
    _conceptIndex;
    _statementImplementor;
    _statement;
    _answers = [];

    constructor(conceptIndex, statement, statementImplementor) {
        this._conceptIndex = conceptIndex;
        this._statement = statement;
        this._statementImplementor = statementImplementor;
    }

    getStatementTarget() {
        return this._statementImplementor.getTarget();
    }

    getStatement() {
        return this._statement;
    }

    getConceptIndex() {
        return this._conceptIndex;
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

    formatQuestionObject() {
        const questionObject = {
            conceptIndex: this.getConceptIndex(),
            statement: this.getStatement(),
            target: this.getStatementTarget(),
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

    constructor(conceptIndex, statement, statementType) {
        super(conceptIndex, statement, statementType);
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

    constructor(conceptIndex, statement, statementType) {
        super(conceptIndex, statement, statementType);
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