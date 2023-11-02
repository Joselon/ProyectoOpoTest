import { Category } from './Category.js';

class Categories {

    #categories;
    #currentCategory = 0;

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

    setSelectedMode(index) {
        this.#currentCategory = index;
    }

    getSelectedMode() {
        return this.#currentCategory;
    }

}

export { Categories }