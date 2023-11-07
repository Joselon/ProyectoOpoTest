class Category {
    #ancestor;
    #name;
    #concepts;
    #subcategories = [];

    constructor(name, ancestor, subcategories) {
        this.#name = name;
        if (ancestor === undefined)
            ancestor = null;
        this.#ancestor = ancestor;
        if (subcategories === undefined)
            subcategories = [];
        for (let category of subcategories)
            this.#subcategories.push(category);
        this.#concepts = [];
        for (let string of ["Software", "Patron"])
            this.#concepts.push(string);
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

    conceptsSize() {
        let subconcepts = 0;
        if (this.#subcategories.length > 0) {
            for (let category of this.#subcategories) {
                subconcepts += category.conceptsSize();
            }
        }
        return this.#concepts.length + subconcepts;
    }

    subcategoriesSize() {
        return this.#subcategories.length;

    }

    getSubcategories() {
        return this.#subcategories;
    }

    addConcept(concept) {
        this.#concepts.push(concept);
    }

    addSubcategory(category) {
        this.#subcategories.push(category);
    }

}

export { Category }