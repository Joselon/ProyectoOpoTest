class Answer {
    _studentName;
    _content;
    _isOK;
    _createdDate;
    _evaluatedDate;

    constructor(studentName, content, date) {
        this._studentName = studentName;
        this._content = content;
        this._isOK = false;
        this._createdDate = date;
        this._evaluatedDate = null;
    }

    evaluate(isOK, evaluatedDate) {
        this._isOK = isOK;
        this._evaluatedDate = evaluatedDate;
    }

    getEvaluation() {
        return this._isOK;
    }

    getStudentName() {
        return this._studentName;
    }

    getContent() {
        return this._content;
    }

    getCreatedDate() {
        return this._createdDate;
    }

    getEvaluatedDate() {
        return this._evaluatedDate;
    }

    isEvaluated() {
        return this._evaluatedDate !== null;
    }

}

class OpenAnswer extends Answer {
    #evaluatedBy;

    constructor(userName, text, date) {
        super(userName, text, date);
        this.#evaluatedBy = "";
    }

    evaluate(isOK, evaluatedDate, evaluatedBy) {
        super.evaluate(isOK, evaluatedDate);
        this.#evaluatedBy = evaluatedBy;
    }

    getEvaluatedBy() {
        return this.#evaluatedBy;
    }

}

class SelectedOptionAnswer extends Answer {

    constructor(userName, option, date) {
        super(userName, option, date);
    }

}

export { OpenAnswer, SelectedOptionAnswer }