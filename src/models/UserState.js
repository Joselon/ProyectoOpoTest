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

    getCurrentConcept(){
        return this.#currentConcept;
    }

    getCurrentConceptKeyWord() {
        return this.#currentConcept.getKeyword();
    }

    setCurrentCategory(category) {
        this.#currentCategory = category;
    }

    setCurrentType(index) {
        this.#typeCurrentIndex = index;
    }


    setCurrentConcept(concept) {
        this.#currentConcept = concept;
    }

}

export { UserState }
