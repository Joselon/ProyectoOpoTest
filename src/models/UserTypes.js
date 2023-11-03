class UserTypes {

    #userTypes;
    #currentTypeIndex = 0;

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
        this.#currentTypeIndex = index;
    }

    getSelected() {
        return this.#currentTypeIndex;
    }

}

export { UserTypes }