import { Categories } from './models/Categories.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu, CategoriesMenu } from './views/Menu.js';

class ElaboraTest {
    //#users;
    #categories;

    constructor() {
        this.#categories = new Categories();
        //Asignar new de categorias, vistas y modelos
    }

    start() {
        do {
            new MainMenu(new CategoriesMenu(),this.#categories).interact();
        } while (this.#isResumed());
    }

    teacherStart(){
        //showTeacherMainMenu
    }

    studentStart(){
        //showStudentMainMenu
    }

    #isResumed() {
        let yesNoDialog = new YesNoDialog();
        yesNoDialog.read(`Reiniciar`);
        if (yesNoDialog.isAffirmative()) {
            //
        }
        return yesNoDialog.isAffirmative();
    }
}

new ElaboraTest().start();