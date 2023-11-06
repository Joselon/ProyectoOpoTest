import { Category } from './Category.js';

class Categories {

    #categories;

    constructor(categories) {
        this.#categories = [];
        if (categories === undefined)
            categories = [];
        for (let category of categories)
            this.#categories.push(category);
    }

    get(index) {
        return this.#categories[index];
    }

    getName(index) {
        return this.#categories[index].getName();
    }

    size() {
        return this.#categories.length;
    }

    addCategory(string, index) {
        if (index === undefined) {
            this.#categories.push(new Category(string));
        }
        else {
            this.get(index-1).addSubcategory(string);
        }
        
    }

}

export { Category, Categories }