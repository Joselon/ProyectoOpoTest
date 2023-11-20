class Definition {
    #content;
    #isFake;
    #createdDate;
    #justifications = [];

    constructor(content, isFake, date = new Date()) {
        this.#content = content;
        this.#isFake = isFake;
        this.#createdDate = date;
    }

    getContent() {
        return this.#content;
    }

    isFake() {
        return this.#isFake;
    }

    getCreatedDate() {
        return this.#createdDate;
    }

    getJustifications() {
        return this.#justifications;
    }
}

export { Definition }