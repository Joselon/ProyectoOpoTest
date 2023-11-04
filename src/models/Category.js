class Category {
    #idAncestor;
    #name;
    #concepts;
    #currentIndex; //Debería guardarlo el usuario no el modelo

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

    get(index) {
        return this.#concepts[index];
    }

    size() {
        return this.#concepts.length;
    }

    setSelected(index) {
        this.#currentIndex = index;
    }

    getSelected() {
        return this.#currentIndex;
    }

    addConcept(concept) {
        this.#concepts.push(concept);
    }

}

export { Category }