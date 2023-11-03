class Category {
    #ancestor;
    #name;
    #concepts;

    constructor(name,category) {
        this.#name = name;
        this.#ancestor = category;
    }

    getName() {
        return this.#name;
    }
    getAncestorName() {
        return this.#ancestor.getName();
    }
    hasAncestor(){
        return this.#ancestor !== undefined;
    }
    hasConcepts(){
        return this.#concepts.length > 0;
    }

}

export { Category }