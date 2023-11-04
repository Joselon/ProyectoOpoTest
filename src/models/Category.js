class Category {
    #idAncestor;
    #name;
    #concepts;

    constructor(name, category) {
        this.#name = name;
        this.#idAncestor = category;
        this.#concepts = ["Software", "Patron"]
    }

    getName() {
        return this.#name;
    }
    getAncestorName() {
        return this.#concepts.getName();
    }
    hasAncestor() {
        return this.#concepts !== undefined;
    }
    hasConcepts() {
        return this.size > 0;
    }

    getConcept(index) {
        return this.#concepts[index];
    }

    size() {
        return this.#concepts.length;
    }

    addConcept(concept) {
        this.#concepts.push(concept);
    }

}

export { Category }