class Category {
    #ancestor;
    #name;
    #concepts = [];
    #subcategories = [];

    constructor(name, ancestor, subcategories, concepts) {
        this.#name = name;
        if (ancestor === undefined)
            ancestor = null;
        this.#ancestor = ancestor;
        if (subcategories === undefined)
            subcategories = [];
        for (let category of subcategories)
            this.#subcategories.push(category);
        if (concepts === undefined)
            concepts = [];
        for (let concept of concepts)
            this.#concepts.push(concept);
    }

    getAncestor() {
        return this.#ancestor
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

    conceptsSize() {
        let subconcepts = 0;
        for (let category of this.#subcategories) {
            subconcepts += category.conceptsSize();
        }
        return this.#concepts.length + subconcepts;
    }

    subcategoriesSize() {
        let subsubcategories = 0;
        if (this.#subcategories.length > 1)
            for (let category of this.#subcategories) {
                subsubcategories += category.subcategoriesSize();
            }
        return this.#subcategories.length + subsubcategories;

    }

    questionsSize() {
        let nquestions = 0;
        for (let concept of this.#concepts)
            nquestions += concept.questionsSize();
        for (let category of this.#subcategories) {
            for (let concept of category.getConcepts())
                nquestions += concept.questionsSize();
        }
        return nquestions;
    }



    addConcept(concept) {
        this.#concepts.push(concept);
    }

    addSubcategory(category) {
        this.#subcategories.push(category);
    }

}

export { Category }