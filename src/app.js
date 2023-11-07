import { UserTypes } from './models/UserTypes.js';
import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu } from './views/MainMenu.js';
import { Concept } from './models/Concept.js';

class ElaboraTest {
    #userState;
    #userTypes;
    #categories;

    constructor() {
        this.#userTypes = new UserTypes();
        this.#categories = [];
        for (let name of [`Informática`, `Oposiciones Bibliotecario`, `Test de Conducir`])
            this.#categories.push(new Category(name));
        this.#categories[0].addConcept(new Concept(`Software`));
        this.#userState = new UserState(0, this.#categories[0],this.#categories[0].getConcept(0));
    }

    start() {
        do {
            new MainMenu(this.#userState, this.#userTypes, this.#categories).interact();
        } while (!this.#isResumed());
    }

    #isResumed() {
        let yesNoDialog = new YesNoDialog();
        yesNoDialog.read(`Los cambios no se guardarán, ¿seguro que quiere salir`);
        if (yesNoDialog.isNegative()) {
            //Guardar
        }
        return yesNoDialog.isAffirmative();
    }
}

new ElaboraTest().start();