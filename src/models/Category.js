class Category {
    #name;
    #concepts = [];
    #subcategories = [];

    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    getConcept(index) {
        return this.#concepts[index];
    }

    getConcepts() {
        return this.#concepts;
    }

    getSubcategory(index) {
        return this.#subcategories[index];
    }

    getSubcategories() {
        return this.#subcategories;
    }

    getTotalNumberOfConcepts() {
        let subconcepts = 0;
        for (let category of this.#subcategories) {
            subconcepts += category.getTotalNumberOfConcepts();
        }
        return this.#concepts.length + subconcepts;
    }

    getTotalNumberOfSubcategories() {
        let subsubcategories = 0;
        if (this.#subcategories.length > 1)
            for (let category of this.#subcategories) {
                subsubcategories += category.getTotalNumberOfSubcategories();
            }
        return this.#subcategories.length + subsubcategories;

    }

    getTotalNumberOfQuestions() {
        let nquestions = 0;
        for (let concept of this.#concepts)
            nquestions += concept.getNumberOfQuestions();
        for (let category of this.#subcategories) {
            nquestions += category.getTotalNumberOfQuestions();
        }
        return nquestions;
    }

    getAllQuestions() {
        let allQuestions = [];
        for (let concept of this.#concepts)
            for (let question of concept.getQuestions())
                allQuestions.push(question);
        for (let category of this.#subcategories) {
            for (let question of category.getAllQuestions())
                allQuestions.push(question);
        }
        return allQuestions;
    }



    addConcept(concept) {
        this.#concepts.push(concept);
    }

    addSubcategory(category) {
        this.#subcategories.push(category);
    }

}

export { Category }