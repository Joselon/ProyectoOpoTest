class Model {
    #components;
    #currentIndex = 0; //Debería guardarlo el usuario no el modelo

    constructor(arrayString) {
        this.#components = [];
        for (let string of arrayString)
            this.#components.push(string);
    }

    get(index) {
        return this.#components[index];
    }

    size() {
        return this.#components.length;
    }

    setSelected(index) {
        this.#currentIndex = index;
    }

    getSelected() {
        return this.#currentIndex;
    }

}
