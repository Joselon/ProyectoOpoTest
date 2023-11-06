import { UserTypes } from './models/UserTypes.js';
import { Category, Categories } from './models/Categories.js';
import { UserState } from './models/UserState.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu } from './views/MainMenu.js';

class ElaboraTest {
    #userState;
    #userTypes;
    #categories;

    constructor() {
        this.#userState = new UserState(0, 0);
        this.#userTypes = new UserTypes();
        let categoriesDefault = [];
        for (let string of [`Informática`, `Oposiciones Bibliotecario`, `Test de Conducir`])
            categoriesDefault.push(new Category(string, 0));
        this.#categories = new Categories(categoriesDefault);
    }

    start() {
        do {
            new MainMenu(this.#userState, this.#userTypes, this.#categories).interact();
        } while (!this.#isResumed());
    }

    teacherStart() {
        //showTeacherMainMenu
    }

    studentStart() {
        //showStudentMainMenu
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