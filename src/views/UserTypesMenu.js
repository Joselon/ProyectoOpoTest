import { DynamicMenu, IterativeMenu, ModelOption } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';

class ShowSelectedTypeOption extends ModelOption {

    constructor(model) {
        super("Mostrar tipo seleccionado...", model);
    }

    interact() {
        console.writeln();
        console.writeln((this.model.getSelectedMode() + 1) + ". " + this.model.get(this.model.getSelectedMode()));
        console.writeln();
    }

}

class SelectTypeOption extends ModelOption {

    constructor(model) {
        super("Mostrar tipos...", model);
    }

    interact() {
        new TypeMenu(this.model).interact();
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
        return `${super.getTitle()}: ${this.model.get(this.#index)}`;
    }

    interact() {
        this.model.setSelectedMode(this.#index);
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
            this.add(new SelectModelOption(this.#model, i));
        }
    }

}

class UserTypesMenu extends IterativeMenu {

    #model;

    constructor(model) {
        super("Menú de Usuarios");
        this.#model = model;
    }

    addOptions() {
        this.add(new ShowSelectedTypeOption(this.#model));
        this.add(new SelectTypeOption(this.#model));
    }

}

export { UserTypesMenu }