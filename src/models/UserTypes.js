class UserTypes {

    #userTypes;
    #currentType = 0;

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

    setSelectedMode(index) {
        this.#currentType = index;
    }

    getSelectedMode() {
        return this.#currentType;
    }

}

export { UserTypes }