class UserState {
    #userTypes;
    #typeCurrentIndex;
    #currentCategory;
    #currentConcept;

    constructor(type, category, concept) {
        this.#typeCurrentIndex = type;
        this.#currentCategory = category;
        this.#currentConcept = concept;
        this.#userTypes = ["Profesor", "Alumno"]
    }

    getCurrentType() {
        return this.#typeCurrentIndex;
    }

    getCurrentTypeName() {
        return this.#userTypes[this.#typeCurrentIndex];
    }

    getTypes() {
        return this.#userTypes;
    }

    getCurrentCategory() {
        return this.#currentCategory;
    }

    getCurrentCategoryName() {
        return this.#currentCategory.getName();
    }

    getCurrentConcept() {
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
