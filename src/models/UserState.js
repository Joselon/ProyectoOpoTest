class UserState {
    #typeCurrentIndex;
    #categoryCurrentIndex;

    constructor(type, category) {
        this.#typeCurrentIndex = type;
        this.#categoryCurrentIndex = category;
    }

    getCurrentType() {
        return this.#typeCurrentIndex;
    }

    getCurrentCategory() {
        return this.#categoryCurrentIndex;
    }

    setCurrentCategory(index) {
        this.#categoryCurrentIndex = index;
    }

    setCurrentType(index) {
        return this.#typeCurrentIndex = index;
    }

}

export { UserState }
