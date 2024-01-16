import { DynamicMenu, OpenMenuOption, Option, QuitOption } from "../../utils/view/consola/Menu.js";
import { ConceptsMenu } from "./ConceptsMenu.js";
import { Category } from "../../models/Category.js";
import { Concept } from "../../models/Concept.js"
import { console } from "../../utils/view/consola/console.js";

class AddCategoryOption extends Option {
    #categories;

    constructor(categories) {
        super("Añadir Categoría / Subcategoría");
        this.#categories = categories;
    }

    interact() {
        let name = console.readString(`
        Escribe el nombre de la categoría:`);
        let isOK;
        do {
            let index = console.readNumber(`Escribe la categoría a la que pertenece (0 default): `)
            if (index === 0) {
                this.#categories.push(new Category(name));
                isOK = true;
            }
            else if ((0 < index) && (index < this.#categories.length)) {
                this.#categories[index - 1].addSubcategory(new Category(name));
                isOK = true;
            }
            else {
                console.writeln("ERROR: Escriba el numero de una categoría válida");
                isOK = false;
            }
        } while (!isOK)
    }
}

class SelectCategoryOption extends Option {
    #category
    #userState;

    constructor(category, userState) {
        super("Seleccionar ");
        this.#category = category;
        this.#userState = userState;
    }

    getTitle() {
        return `${super.getTitle()}: ${this.#category.getName()} -(${this.#category.getTotalNumberOfSubcategories()}/${this.#category.getTotalNumberOfQuestions()})`;
    }

    interact() {
        super.interact();
        this.#userState.setCurrentCategory(this.#category);
        this.#userState.setCurrentConcept(new Concept("---"));
    }
}

class SelectCategoryAndShowConceptsOption extends OpenMenuOption {
    #category
    #userState;

    constructor(menu, category, userState) {
        super(`${category.getName()}`, menu);
        this.#category = category;
        this.#userState = userState;
    }

    getTitle() {
        return `Seleccionar y mostrar Conceptos de...${super.getTitle()}:  -(${this.#category.getTotalNumberOfSubcategories()}/${this.#category.getTotalNumberOfConcepts()}/${this.#category.getTotalNumberOfQuestions()})- ...`;
    }

    interact() {
        this.#userState.setCurrentCategory(this.#category);
        this.#userState.setCurrentConcept(new Concept("---"));
        super.interact();
    }
}

class CategoriesMenu extends DynamicMenu {

    #categories;
    #userState;

    constructor(userState, categories) {
        super(`Menú de Categorías -(Subcategorías / Preguntas*)- (*Incluido contenido en subcategorías)`);
        this.#categories = categories;
        this.#userState = userState;
    }

    addOptions() {
        for (let i = 0; i < this.#categories.length; i++) {
            this.add(new SelectCategoryOption(this.#categories[i], this.#userState));
            if (this.#categories[i].getTotalNumberOfSubcategories() > 0)
                this.add(new OpenMenuOption(`--- Ver Subcategorías de ${i + 1}-${this.#categories[i].getName()} ...`, new CategoriesMenu(this.#userState, this.#categories[i].getSubcategories())));
        }
        this.add(new QuitOption());
    }
}

class TeacherCategoriesMenu extends DynamicMenu {

    #categories;
    #userState;

    constructor(userState, categories) {
        super(`Menú de Categorías -(Subcategorías / Conceptos* / Preguntas*)-
        (*Incluido contenido en subcategorías)`);
        this.#categories = categories;
        this.#userState = userState;
    }

    addOptions() {
        for (let i = 0; i < this.#categories.length; i++) {
            this.add(new SelectCategoryAndShowConceptsOption(new ConceptsMenu(this.#userState), this.#categories[i], this.#userState));
            if (this.#categories[i].getTotalNumberOfSubcategories() > 0)
                this.add(new OpenMenuOption(`--- Ver Subcategorías de ${i + 1}-${this.#categories[i].getName()} ...`, new TeacherCategoriesMenu(this.#userState, this.#categories[i].getSubcategories())));

        }
        this.add(new AddCategoryOption(this.#categories));
        this.add(new QuitOption());
    }
}

export { CategoriesMenu, TeacherCategoriesMenu }