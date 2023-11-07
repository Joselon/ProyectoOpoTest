import { UserTypes } from './models/UserTypes.js';
import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu } from './views/MainMenu.js';

class ElaboraTest {
    #userState;
    #userTypes;
    #categories;

    constructor() {
        this.#userTypes = new UserTypes();
        let categoriesDefault = [];
        for (let string of [`Informática`, `Oposiciones Bibliotecario`, `Test de Conducir`])
            categoriesDefault.push(new Category(string));
        this.#categories = categoriesDefault;
        this.#userState = new UserState(0, this.#categories[0]);
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