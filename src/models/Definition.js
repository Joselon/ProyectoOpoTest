class Definition {
    #content;
    #isFake;
    #createdDate;
    //#justifications = [];

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

    /*getJustifications() {
        return this.#justifications;
    }*/

    formatDefinitionObject() {
        const definitionOject = {
            content: this.getContent(),
            isFake: this.isFake(),
            createdDate: this.getCreatedDate(),
            justifications: []
        }
        //definitionObjects.justificactions = this.formatJustificactions();
        return definitionOject;
    }
}

export { Definition }