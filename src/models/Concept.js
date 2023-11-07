class Concept {
    #keyword;
    #definitions = [];
    #relations = [];
    #questions = []

    constructor(keyword, questions, definitions, relations) {
        this.#keyword = keyword;
        if (questions === undefined)
            questions = []
        for (let question of questions)
            this.#questions.push(question);
        if (definitions === undefined)
            definitions = [];
        for (let definition of definitions)
            this.#definitions.push(definition);
        if (relations === undefined)
            relations = [];
        for (let relation of relations)
            this.#relations.push(relation);
    }

    getKeyword() {
        return this.#keyword;
    }

    questionsSize() {
        return this.#questions.length;
    }

    getQuestions() {
        return this.#questions;
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

}

export { Concept }