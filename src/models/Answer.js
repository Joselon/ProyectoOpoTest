class Answer {
    #userName;
    isEvaluated;
    #isOK;

    constructor(userName) {
        this.#userName = userName;
        this.isEvaluated = false;
        this.#isOK = false;
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

}

class OpenAnswer extends Answer{
    #isUsefulForConcept;

    constructor(userName) {
        super(userName);
        this.#isUsefulForConcept = false;
    }

    setIsUsefulTo (ConceptComponent){
        this.#isUsefulForConcept =true;
        //AddToConcept Component
    }


}

class SelectedOptionAnswer extends Answer {


}

export {OpenAnswer, SelectedOptionAnswer}