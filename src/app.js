import { UserTypes } from './models/UserTypes.js';
import { Categories } from './models/Categories.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu } from './views/MainMenu.js';

class ElaboraTest {
    //#users;
    #userTypes;
    #categories;

    constructor() {
        this.#userTypes = new UserTypes();
        this.#categories = new Categories();
    }

    start() {
        do {
            new MainMenu(this.#userTypes, this.#categories).interact();
        } while (this.#isRestarted());
    }

    teacherStart() {
        //showTeacherMainMenu
    }

    studentStart() {
        //showStudentMainMenu
    }

    #isRestarted() {
        let yesNoDialog = new YesNoDialog();
        yesNoDialog.read(`¿Volver al menú principal`);
        if (yesNoDialog.isAffirmative()) {
            //Reload original json
        }
        return yesNoDialog.isAffirmative();
    }
}

new ElaboraTest().start();