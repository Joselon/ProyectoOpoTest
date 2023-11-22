class Answer {
    #studentName;
    #content;
    #isOK;
    #question;
    #createdDate;
    #evaluatedDate;

    constructor(studentName, content, question, date = new Date()) {
        this.#studentName = studentName;
        this.#content = content;
        this.#isOK = false;
        this.#question = question;
        this.#createdDate = date;
        this.#evaluatedDate = null;
    }

    evaluate(isOK, evaluatedDate) {
        this.#isOK = isOK;
        this.#evaluatedDate = evaluatedDate;
    }

    getEvaluation() {
        return this.#isOK;
    }

    getStudentName() {
        return this.#studentName;
    }

    getContent() {
        return this.#content;
    }

    getCreatedDate() {
        return this.#createdDate;
    }

    getEvaluatedDate() {
        return this.#evaluatedDate;
    }

    getQuestion() {
        return this.#question;
    }

    isEvaluated() {
        return this.#evaluatedDate !== null;
    }

}

class OpenAnswer extends Answer {
    #isUsefulForConcept;
    #evaluatedBy;

    constructor(userName, text, question, date) {
        super(userName, text, question, date);
        this.#isUsefulForConcept = false;
        this.#evaluatedBy = "";
    }

    evaluate(isOK, evaluatedDate, isUsefulForConcept, evaluatedBy) {
        super.evaluate(isOK, evaluatedDate);
        this.#isUsefulForConcept = isUsefulForConcept;
        this.#evaluatedBy = evaluatedBy;
    }

    isUsefulForConcept() {
        return this.#isUsefulForConcept;
    }

    getEvaluatedBy() {
        return this.#evaluatedBy;
    }

}

class SelectedOptionAnswer extends Answer {

    constructor(userName, option, question, date) {
        super(userName, option, question, date);
    }

}

export { OpenAnswer, SelectedOptionAnswer }