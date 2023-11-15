class Answer {
    userName;
    content;
    isEvaluated;
    isOK;
    question;
    #createdDate;

    constructor(userName, content, question, date) {
        this.userName = userName;
        this.content = content;
        this.isEvaluated = false;
        this.isOK = false;
        this.question = question;
        if (date === undefined) {
            this.#createdDate = new Date();
        }
        else
            this.#createdDate = date;

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

    getCreatedData() {
        return this.#createdDate;
    }

}

class OpenAnswer extends Answer {
    isUsefulForConcept;

    constructor(userName, text, question, date) {
        super(userName, text, question, date);
        this.isUsefulForConcept = false;
    }

    setIsUsefulForConcept(isUsefulForConcept) {
        this.isUsefulForConcept = isUsefulForConcept;
    }

    addToConcept() {
        let statementType = this.question.statementType;
        let concept = this.question.concept;
        if (statementType === "Definition") {
            concept.definitions.push(new Definition(this.content, this.isOK))
        }
        else if (statementType === "Classification" || statementType === "Composition") {
            concept.relations.push(new Relation(this.content, statementType, this.isOK))
        }
        else {
            //error
        }
    }

}

class SelectedOptionAnswer extends Answer {

    constructor(userName, option, question, date) {
        super(userName, option, question, date);
    }

}

export { OpenAnswer, SelectedOptionAnswer }