class UserTypes {

    #userTypes;
    #currentIndex = 0;

    constructor() {
        this.#userTypes = [];
        for (let string of ["Profesor", "Alumno"])
            this.#userTypes.push(string);
    }

    get(index) {
        return this.#userTypes[index];
    }

    size() {
        return this.#userTypes.length;
    }

    setSelected(index) {
        this.#currentIndex = index;
    }

    getSelected() {
        return this.#currentIndex;
    }

}

export { UserTypes }