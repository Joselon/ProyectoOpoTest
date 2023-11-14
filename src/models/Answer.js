class Answer {
    #userName;
    isEvaluated;
    #isOK;
    #content;

    constructor(userName, content) {
        this.#userName = userName;
        this.isEvaluated = false;
        this.#isOK = false;
        this.#content = content;
    }

    evaluate(isOK) {
        this.isEvaluated = true;
        this.#isOK = isOK;
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

}

class OpenAnswer extends Answer {
    #isUsefulForConcept;

    constructor(userName, text) {
        super(userName, text);
        this.#isUsefulForConcept = false;
    }

    setIsUsefulToConcept(ConceptComponent) {
        this.#isUsefulForConcept = true;
        //AddToConcept Component
    }

}

class SelectedOptionAnswer extends Answer {

    constructor(userName, option) {
        super(userName, option);
    }

}

export { OpenAnswer, SelectedOptionAnswer }