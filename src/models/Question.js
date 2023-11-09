class Question {
    statementTemplateTypes = ["Defintion","Classification","Composition"]
    statementTemplateType;
    statement;

    constructor(statementTemplateType,concept) {
        this.statementTemplateType = statementTemplateType;
        this.#buildStatement(concept);
    }

    #buildStatement(concept) {
        this.statement = this.statementTemplateType(concept);
    }

}

class OpenQuestion extends Question {
    #statementTemplate;
    #openAnswers = [];
    statement;

    constructor(statement, statementType,concept) {
        super(statementType,concept);
        this.statement = statement;
        //this.#buildStatement();
    }

    #buildStatement(concept) {
        this.#statementTemplate = this.statementTemplateType();

    }

    addAnswer(string) {
        this.#openAnswers.push(string)
    }

    getAnswers() {
        return this.#openAnswers;
    }

    getStatement() {
        return this.statement;
    }

}

class MultipleChoiceQuestion {
    #statement;
    #options = [];
    #selectedOptionAnswers = [];

}

export { OpenQuestion }