class Definition {
    #content;
    #isFake;
    #createdDate;
    #justifications =[];

    constructor(content, isFake, date) {
        this.#content = content;
        this.#isFake = isFake;
        if (date === undefined)
            this.#createdDate = new Date();
        else
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

    getJustifications(){
        return this.#justifications;
    }
}

export { Definition }