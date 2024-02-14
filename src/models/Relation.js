class Relation {
    #type;
    #content;
    #isFake;
    #createdDate;

    constructor(type, content, isFake, date = new Date()) {
        this.#type = type;
        this.#content = content;
        this.#isFake = isFake;
        this.#createdDate = date;
    }

    getContent() {
        return this.#content;
    }

    getType() {
        return this.#type;
    }

    isFake() {
        return this.#isFake;
    }

    getCreatedDate() {
        return this.#createdDate;
    }

    formatRelationObject() {
        const relationObject = {
            type: this.getType(),
            content: this.getContent(),
            isFake: this.isFake(),
            createdDate: this.getCreatedDate(),
            justifications: []
        }
        return relationObject;
    }
}

export { Relation }