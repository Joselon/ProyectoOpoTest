class Question {
    statementTemplateType;

    constructor(statementTemplateType) {
        this.statementTemplateType = statementTemplateType;
    }

    buildStatement() {
        return 1 / 0;
    }

}

class OpenQuestion extends Question {

    #answers = [];
    #concept;
    #statement;

    constructor(statement, concept, defaultTemplate) {
        super(defaultTemplate);
        this.#statement = statement;
        this.#concept = concept;
        // this.#buildStatement();
    }

    #buildStatement() {
        this.#statement = this.statementTemplateType(this.#concept)
    }

    addAnswer(string) {
        this.#answers.push(string)
    }

    getAnswers() {
        return this.#answers;
    }

    getStatement() {
        return this.#statement;
    }

}

export { OpenQuestion }