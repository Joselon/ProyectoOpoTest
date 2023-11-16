class UserState {
    #userTypes = ["Profesor", "Alumno"];
    #userName;
    #typeCurrentIndex;
    #currentCategory;
    #currentConcept;
    #selectedQuestionType;
    #selectedStatementType;

    constructor(type, category, concept) {
        this.#typeCurrentIndex = type;
        this.#currentCategory = category;
        this.#currentConcept = concept;
        this.#userName = "Juan Default";
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

    setSelectedQuestionType(type) {
        this.#selectedQuestionType = type;
    }

    getSelectedQuestionType() {
        return this.#selectedQuestionType;
    }

    setSelectedStatementType(type) {
        this.#selectedStatementType = type;
    }

    getSelectedStatementType() {
        return this.#selectedStatementType;
    }

    getCurrentUserName() {
        return this.#userName;
    }

    setCurrentUserName(userName) {
        this.#userName = userName;
    }

}

export { UserState }
