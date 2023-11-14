class Answer {
    userName;
    content;
    isEvaluated;
    isOK;

    constructor(userName, content) {
        this.userName = userName;
        this.content = content;
        this.isEvaluated = false;
        this.isOK = false;

    }

    evaluate(isOK) {
        this.isEvaluated = true;
        this.isOK = isOK;
    }

    getEvaluation() {
        return this.isOK;
    }

    getUserName() {
        return this.userName;
    }

    getContent() {
        return this.content;
    }

}

class OpenAnswer extends Answer {
    isUsefulForConcept;

    constructor(userName, text) {
        super(userName, text);
        this.isUsefulForConcept = false;
    }

    setIsUsefulForConcept(isUsefulForConcept) {
        this.isUsefulForConcept = isUsefulForConcept;
        //AddToConcept Component
    }

}

class SelectedOptionAnswer extends Answer {

    constructor(userName, option) {
        super(userName, option);
    }

}

export { OpenAnswer, SelectedOptionAnswer }