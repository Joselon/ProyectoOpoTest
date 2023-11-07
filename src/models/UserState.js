class UserState {
    #typeCurrentIndex;
    #currentCategory;
    #currentConcept;

    constructor(type, category, concept) {
        this.#typeCurrentIndex = type;
        this.#currentCategory = category;
        this.#currentConcept = concept;
    }

    getCurrentType() {
        return this.#typeCurrentIndex;
    }

    getCurrentCategory() {
        return this.#currentCategory;
    }

    getCurrentCategoryName() {
        return this.#currentCategory.getName();
    }

    setCurrentCategory(category) {
        this.#currentCategory = category;
    }

    setCurrentType(index) {
        this.#typeCurrentIndex = index;
    }

    getCurrentConceptKeyWord() {
        return this.#currentConcept.getKeyword();
    }
    setCurrentConcept(concept) {
        this.#currentConcept = concept;
    }

}

export { UserState }
