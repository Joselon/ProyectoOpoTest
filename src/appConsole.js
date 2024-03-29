import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { UserType } from './models/UserTypes.js'
import { UserMenu } from './views/consola/UserMenu.js'
import { MainMenu, TeacherMainMenu } from './views/consola/MainMenu.js';
import { YesNoDialog } from './utils/view/consola/Dialog.js';
import { readFileSync, writeFileSync } from 'node:fs';

class ElaboraTest {
    #userState;
    #categories;


    constructor() {
        this.#categories = [];
        this.#setUp();
    }

    start() {
        do {
            new UserMenu(this.#userState).interact();

            if (this.#userState.getCurrentUserType() === UserType.TEACHER) {
                new TeacherMainMenu(this.#userState, this.#categories).interact();
            }
            else {
                new MainMenu(this.#userState, this.#categories).interact();
            }
        } while (this.#isResumed());
    }

    #isResumed() {
        let yesNoDialog = new YesNoDialog();
        yesNoDialog.read(`¿Desea salvar antes de salir`);
        if (yesNoDialog.isAffirmative()) {
            this.writeJSONfile();
            return yesNoDialog.isNegative();
        }
        return yesNoDialog.isAffirmative();
    }

    #setUp() {
        this.#userState = new UserState();
        this.readJSONfile();
    }

    async readJSONfile() {
        try {
            const data = readFileSync('data/database.json', 'utf-8');
            const dataobject = JSON.parse(data);

            let index = 0;
            for (const categoryObject of dataobject.categories) {
                this.#categories.push(new Category(categoryObject.name));
                this.#categories[index].loadCategoryFromDataObject(categoryObject);
                index++;
            }
        } catch (error) {
            console.error('Error al leer el archivo de base de datos:', error);
        }
    }

    async writeJSONfile() {
        try {
            let dataObject = { categories: [] };
            for (let category of this.#categories) {
                dataObject.categories.push(category.formatCategoryObject());
            }
            const data = JSON.stringify(dataObject);
            writeFileSync('data/database.json', data);
        } catch (error) {
            console.error('Error al escribir en el archivo de base de datos:', error);
        }
    }
}

new ElaboraTest().start();
