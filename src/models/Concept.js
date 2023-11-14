class Concept {
    #keyword;
    #definitions;
    #relations;
    #questions;

    constructor(keyword) {
        this.#keyword = keyword;
        this.#questions = [];
        this.#definitions = [];
        this.#relations = [];
    }

    getKeyword() {
        return this.#keyword;
    }

    getQuestions() {
        return this.#questions;
    }

    getQuestion(index) {
        return this.#questions[index];
    }

    getOpenQuestions() {
        let openQuestions = [];
        for (let question of this.#questions) {
            if (question.getAnswerType() === "Open")
                openQuestions.push(question);
        }
        return openQuestions;
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

    addDefinition(definition) {
        this.#definitions.push(definition);
    }

    addRelation(relation) {
        this.#relations.push(relation);
    }

    getDefinition(index) {
        return this.#definitions[index];
    }

    getNumberOfDefinitions() {
        return this.#definitions.length;
    }

    getNumberOfRelations() {
        return this.#relations.length;
    }

    getNumberOfQuestions() {
        return this.#questions.length;
    }

}

export { Concept }