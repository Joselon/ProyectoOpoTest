import { Category } from './Category.js';

class Categories {

    #categories;

    constructor() {
        this.#categories = [];
        
        //Recuperar Categories de JSON o BBDD. orginal.json-> current.json JSON-to-CATEGORY[]
        for (let string of [`Informática`, `Oposiciones Bibliotecario`, `Test de Conducir`])
            this.#categories.push(new Category(string,0));
    }

    get(index) {
        return this.#categories[index].getName();
    }

    size() {
        return this.#categories.length;
    }

    addCategory(string) {
        this.#categories.push(new Category(string,0));
    }

}

export { Categories }