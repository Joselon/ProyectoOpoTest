import  {console}  from '../utils/view/console.js';


export class Message {
    static TITLE = new Message(`--- ELABORATEST ---`);
    static HORIZONTAL_LINE = new Message(`-`);
    static VERTICAL_LINE = new Message(`|`);
    static USER_GOT_RIGHT = new Message(`#user ha respondido correctamente!!! : -)`);

    #string;

    constructor(string) {
        this.#string = string;
    }

    write() {
        console.write(this.#string);
    }

    writeln() {
        console.writeln(this.#string);
    }

    toString() {
        return this.#string;
    }

}