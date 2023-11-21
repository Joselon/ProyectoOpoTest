export class UserType {
    static TEACHER = new UserType(`Profesor`);
    static STUDENT = new UserType(`Estudiante`);
    #string;

    constructor(string) {
        this.#string = string;
    }

    static values() {
        return [UserType.TEACHER, UserType.STUDENT];
    }

    toString() {
        return this.#string;
    }
}