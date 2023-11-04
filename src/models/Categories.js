import { Category } from './Category.js';

class Categories {

    #categories;
    #currentIndex = 0;

    constructor() {
        this.#categories = [];
        //Recuperar Categories de JSON o BBDD. orginal.json-> current.json JSON-to-CATEGORY[]
        for (let string of [`Informática`, `Oposiciones Bibliotecario`, `Test de Conducir`])
            this.#categories.push(string);
    }

    get(index) {
        return this.#categories[index];
    }

    size() {
        return this.#categories.length;
    }

    setSelected(index) {
        this.#currentIndex = index;
    }

    getSelected() {
        return this.#currentIndex;
    }

    addCategory(string) {
        this.#categories.push(string);
    }

}

export { Categories }