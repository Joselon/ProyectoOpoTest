import {  DynamicMenu, IterativeQuitMenu , Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';

class ModelOption extends Option {

    model;

    constructor(string, model) {
        super(string);
        this.model = model;
    }

    interact() { };

}

class ShowSelectedTypeOption extends ModelOption {
    #model;

    constructor(model) {
        super("Mostrar tipo seleccionado...", model);
        this.#model = model
    }

    interact() {
        console.writeln();
        console.writeln((this.#model.getSelectedType() + 1) + ". " + this.#model.get(this.#model.getSelectedType()));
        console.writeln();
    }

}

class TypeMenuOption extends ModelOption {
    #model;

    constructor(model) {
        super("Cambiar tipo", model);
        this.#model = model;
    }

    interact() {
        new TypeMenu(this.#model).interact();
    }

}

class SelectTypeOption extends ModelOption {
    #model;
    #index;

    constructor(model, index) {
        super("Seleccionar ", model);
        this.#model = model;
        this.#index = index;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#model.get(this.#index)}`;
    }

    interact() {
        this.#model.setSelectedType(this.#index);
        new UserTypesMenu(this.#model).interact();
    }

}

// ModelMenus

class TypeMenu extends DynamicMenu {

    #model;

    constructor(model) {
        super("Seleccione un tipo de usuario...");
        this.#model = model;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectTypeOption(this.#model, i));
        }
    }

}

class UserTypesMenu extends IterativeQuitMenu {

    #model;

    constructor(model) {
        super("Menú de Usuarios");
        this.#model = model;
    }

    addOptions() {
        this.add(new ShowSelectedTypeOption(this.#model));
        this.add(new TypeMenuOption(this.#model));
    }

}

export { TypeMenu }