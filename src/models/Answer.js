class Answer {
    #userName;
    #content;
    #isOK;
    #question;
    #createdDate;
    #evaluatedDate;

    constructor(userName, content, question, date) {
        this.#userName = userName;
        this.#content = content;
        this.#isOK = false;
        this.#question = question;
        if (date === undefined)
            this.#createdDate = new Date();
        else
            this.#createdDate = date;
        this.#evaluatedDate = null;
    }

    evaluate(isOK, date) {
        this.#isOK = isOK;
        this.#evaluatedDate = date;
    }

    getEvaluation() {
        return this.#isOK;
    }

    getUserName() {
        return this.#userName;
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

    constructor(userName, text, question, date) {
        super(userName, text, question, date);
        this.#isUsefulForConcept = false;
    }

    evaluate(isOK, date, isUsefulForConcept) {
        super.evaluate(isOK, date);
        this.#isUsefulForConcept = isUsefulForConcept;
    }

    isUsefulForConcept() {
        return this.#isUsefulForConcept;
    }

}

class SelectedOptionAnswer extends Answer {

    constructor(userName, option, question, date) {
        super(userName, option, question, date);
    }

}

export { OpenAnswer, SelectedOptionAnswer }