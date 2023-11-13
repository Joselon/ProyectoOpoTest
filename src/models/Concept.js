class Concept {
    #keyword;
    #definitions = [];
    #relations = [];
    #questions = [];

    constructor(keyword) {
        this.#keyword = keyword;
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

    addQuestion(question) {
        this.#questions.push(question);
    }

    addDefinition(definition) {
        this.#definitions.push(definition);
    }

    addRelation(relation){
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