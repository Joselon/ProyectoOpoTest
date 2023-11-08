class Concept {
    #keyword;
    #states = ["Primary","WithDefinition","WithRelation","WithDefinitionAndRelation"]
    #state;
    #definitions = [];
    #relations = [];
    #questions = []

    constructor(keyword, questions, definitions, relations) {
        this.#keyword = keyword;
        if (questions === undefined)
            questions = [];
        for (let question of questions)
            this.#questions.push(question);
        if (definitions === undefined){
            definitions = [];
            this.#state = this.#states[0];
        }
        else
            this.#state = this.#states[1];

        for (let definition of definitions)
            this.#definitions.push(definition);
        if (relations === undefined)
            relations = [];
        else
            this.#state = this.#states[2];

        for (let relation of relations)
            this.#relations.push(relation);
    }

    getKeyword() {
        return this.#keyword;
    }

    getState(){
        return this.#state;
    }

    questionsSize() {
        return this.#questions.length;
    }

    getQuestions() {
        return this.#questions;
    }

    getQuestion(index){
        return this.#questions[index];
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

    addDefinition (definition) {
        this.#definitions.push(definition);
        if (this.#state === this.#states[0])
            this.#state = this.#states[1];
        else 
            this.#state = this.#states[3];
    }

}

export { Concept }