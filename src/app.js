import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu, Connect4ConfigurationMenu } from './views/Menu.js';

class ElaboraTest {
    //#users;
    #categories;

    constructor() {
        //Asignar new de categorias, vistas y modelos
    }

    start() {
        do {
            //showCategories
            //showMainManu
            //new MainMenu(new Connect4ConfigurationMenu()).interact();
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
        yesNoDialog.read(`¿Quiere continuar`);
        if (yesNoDialog.isAffirmative()) {
            //
        }
        return yesNoDialog.isAffirmative();
    }
}

new ElaboraTest().start();