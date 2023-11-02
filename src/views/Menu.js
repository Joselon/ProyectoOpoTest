import { DynamicMenu, IterativeMenu, ModelOption } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';

// Options

class UserTypeOption extends ModelOption {

    constructor(model) {
        super("Seleccionar Tipo de usuario...", model);
    }

    interact() {
        console.writeln(`
         Profesor 
         Alumno 
         `);
    }
}

class CategoriesOption extends ModelOption {
    #categories

    constructor(model, categories) {
        super("Ir a Menú de Categorías...", model);
        this.#categories = categories;
    }

    interact() {
        new CategoriesMenu(this.#categories).interact();
    }

}

class ShowSelectedCatOption extends ModelOption {

    constructor(model) {
        super("Mostrar categoria seleccionada...", model);
    }

    interact() {
        console.writeln();
        console.writeln((this.model.getSelectedMode() + 1) + ". " + this.model.get(this.model.getSelectedMode()));
        console.writeln();
    }

}

class SelectCatOption extends ModelOption {

    constructor(model) {
        super("Mostrar categorías...", model);
    }

    interact() {
        new CategoryMenu(this.model).interact();
    }

}

class SelectModelOption extends ModelOption {

    #index;

    constructor(model, index) {
        super("Seleccionar ", model);
        this.model = model;
        this.#index = index;
    }

    getTitle() {
        return super.getTitle() + ": " + this.model.get(this.#index) +"(nPreguntas)";
    }

    interact() {
        this.model.setSelectedMode(this.#index);
    }

}

// ModelMenus

class CategoryMenu extends DynamicMenu {

    #model;

    constructor(model) {
        super("Menú de Categorías");
        this.#model = model;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectModelOption(this.#model, i));
        }
    }

}

class CategoriesMenu extends IterativeMenu {

    #model;

    constructor(model) {
        super("Menú de Categorías");
        this.#model = model;
    }

    addOptions() {
        this.add(new ShowSelectedCatOption(this.#model));
        this.add(new SelectCatOption(this.#model));
    }

}

class MainMenu extends IterativeMenu {

    #model;
    #categories;

    constructor(model,categories) {
        super("ElaboraTest Menú");
        this.#model = model;
        this.#categories = categories
    }

    addOptions() {
        this.add(new UserTypeOption(this.#model));
        this.add(new CategoriesOption(this.#model,this.#categories));
    }

}


export { MainMenu, CategoriesMenu };