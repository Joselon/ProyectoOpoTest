class UserState {
    #typeCurrentIndex;
    #currentCategory;

    constructor(type, category) {
        this.#typeCurrentIndex = type;
        this.#currentCategory = category;
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
        return this.#typeCurrentIndex = index;
    }

}

export { UserState }
