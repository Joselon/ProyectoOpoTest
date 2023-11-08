import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu } from './views/MainMenu.js';
import { Concept } from './models/Concept.js';

class ElaboraTest {
    #userState;
    #categories;

    constructor() {
        this.#setUp();
    }

    start() {
        do {
            new MainMenu(this.#userState, this.#categories).interact();
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

    #setUp() {

        //Initial Scene
        this.#categories = [];
        for (let name of [`Informática`, `Oposiciones Bibliotecario`, `Test de Conducir`])
            this.#categories.push(new Category(name));
        this.#categories[0].addConcept(new Concept(`Software`));
        this.#userState = new UserState(0, this.#categories[0], this.#categories[0].getConcept(0));
    }
}

new ElaboraTest().start();