class UserTypes {

    #userTypes;

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

}

export { UserTypes }