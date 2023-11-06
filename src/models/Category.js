import { Categories } from "./Categories.js";

class Category {
    #ancestor;
    #name;
    #concepts;
    #subcategories;

    constructor(name, ancestor, subcategories) {
        this.#name = name;
        if (ancestor === undefined) {
            ancestor = 0;
        }
        this.#ancestor = ancestor;
        this.#concepts = [];
        for (let string of ["Software", "Patron"]) {
            this.#concepts.push(string);
        }
        if (subcategories === undefined) {
            this.#subcategories = new Categories();
        }
        else {
            this.#subcategories = new Categories(subcategories);
        }
    }

    getName() {
        return this.#name;
    }
    getAncestorName(index) {
        return this.#ancestor.getName(index);
    }
    hasAncestor() {
        return this.#ancestor !== undefined;
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

    subcategoriesSize() {
        let value;
        if (this.#subcategories.size()===undefined)
            value=0;
        else 
            value = this.#subcategories.size()
        return value;
    }

    getSubcategories() {
        return this.#subcategories;
    }

    addConcept(concept) {
        this.#concepts.push(concept);
    }

    addSubcategory(string) {
        this.#subcategories.addCategory(string);
    }

}

export { Category }