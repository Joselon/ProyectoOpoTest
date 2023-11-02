import { DynamicQuitMenu, IterativeQuitMenu , Option } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';

class ModelOption extends Option {

    model;

    constructor(string, model) {
        super(string);
        this.model = model;
    }

    interact() { };

}
class ShowSelectedCatOption extends ModelOption {

    constructor(model) {
        super("Mostrar categoria seleccionada...", model);
    }

    interact() {
        console.writeln();
        console.writeln((this.model.getSelectedCat() + 1) + ". " + this.model.get(this.model.getSelectedCat()));
        console.writeln();
    }

}

class SelectCatOption extends ModelOption {

    constructor(model) {
        super("Cambiar de categoría...", model);
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
        return `${super.getTitle()}: ${this.model.get(this.#index)} -(${this.model.get(this.#index).length})`;
    }

    interact() {
        this.model.setSelectedCat(this.#index);
    }

}

// ModelMenus

class CategoryMenu extends DynamicQuitMenu {

    #model;

    constructor(model) {
        super("Seleccione una categoría...");
        this.#model = model;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectModelOption(this.#model, i));
        }
    }

}

class CategoriesMenu extends IterativeQuitMenu {

    #model;
    #subtitle;

    constructor(model) {
        super("Menú de Categorías");
        this.#model = model;
    }

    addSubtitle () {
        this.#subtitle = "Categoría actual: "+this.#model.get(this.#model.getSelectedCat());
    }

    addOptions() {
       // this.add(new ShowSelectedCatOption(this.#model));
        this.add(new SelectCatOption(this.#model));
    }

    interact() {
        do {
            this.removeOptions();
            this.addSubtitle();
            this.addOptions();
            this.interact_();
        } while (!this.isExecutedquitOption());
    }

    showSubtitle() {
        console.writeln(this.#subtitle);
    }

    interact_(){
        this.showTitles();
        this.showSubtitle();
        this.execChoosedOption();
    }

}

export { CategoriesMenu }