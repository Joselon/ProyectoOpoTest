class Concept {
    #keyword;
    #stages = ["Primary", "WithDefinition", "WithRelation", "WithDefinitionAndRelation"]
    #stage;
    #definitions = [];
    #relations = [];
    #questions = [];

    constructor(keyword, questions, definitions, relations) {
        this.#keyword = keyword;
        if (questions === undefined)
            questions = [];
        for (let question of questions)
            this.#questions.push(question);
        if (definitions === undefined) {
            definitions = [];
            this.#stage = this.#stages[0];
        }
        else
            this.#stage = this.#stages[1];

        for (let definition of definitions)
            this.#definitions.push(definition);
        if (relations === undefined)
            relations = [];
        else
            this.#stage = this.#stages[2];

        for (let relation of relations)
            this.#relations.push(relation);
    }

    getKeyword() {
        return this.#keyword;
    }

    getStage() {
        return this.#stage;
    }

    questionsSize() {
        return this.#questions.length;
    }

    getQuestions() {
        return this.#questions;
    }

    getQuestion(index) {
        return this.#questions[index];
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

    addDefinition(definition) {
        this.#definitions.push(definition);
        if (this.#stage === this.#stages[0])
            this.#stage = this.#stages[1];
        else
            this.#stage = this.#stages[3];
    }

}

export { Concept }