class UserState {
    #userTypes = ["Profesor", "Alumno"];
    #typeCurrentIndex;
    #currentCategory;
    #currentConcept;
    #selectedAnswerType;
    #selectedStatementType;

    constructor(type, category, concept) {
        this.#typeCurrentIndex = type;
        this.#currentCategory = category;
        this.#currentConcept = concept;
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

    setCurrentCategory(category) {
        this.#currentCategory = category;
    }

    setCurrentType(index) {
        this.#typeCurrentIndex = index;
    }


    setCurrentConcept(concept) {
        this.#currentConcept = concept;
    }

    setSelectedAnswerType(type) {
        this.#selectedAnswerType = type;
    }

    getSelectedAnswerType() {
        return this.#selectedAnswerType;
    }

    setSelectedStatementType(type) {
        this.#selectedStatementType = type;
    }

    getSelectedStatementType() {
        return this.#selectedStatementType;
    }

}

export { UserState }
