import '@dile/dile-nav/dile-nav.js';
import 'eit-info-overlay/eit-info-overlay.js';
import { InputDialog } from './utils/view/html/Dialog.js';
import { UserDialog } from './views/html/UserDialog.js';
import { MainMenu, TeacherMainMenu } from './views/html/MainMenu.js';
import './views/html/components/jno-feedback'
import './views/html/styles.css';

import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { UserType } from './models/UserTypes.js';

import { json } from './data/database_var.js';
//import { readFileSync, writeFileSync } from 'node:fs';
import '@dile/dile-confirm/dile-confirm';

class ElaboraTest {
    #userState;
    #categories;

    constructor() {
        this.#categories = [];
        this.#setUp();
    }

    start() {
        new UserDialog((userTypeIndex) => {
            this.#userState.setCurrentUserType(UserType.values()[userTypeIndex]);
            new InputDialog('app', `Escribe nombre de usuario:`, (username) => {
                //Validate
                this.#userState.setCurrentUserName(username);
                if (this.#userState.getCurrentUserType() === UserType.TEACHER) {
                    new TeacherMainMenu(this.#userState, this.#categories).interact();
                }
                else {
                    new MainMenu(this.#userState, this.#categories).interact();
                }
                document.addEventListener('model-changed', this.writeJSONfile.bind(this));
            })

        })
    }

    #setUp() {
        this.#userState = new UserState();
        this.readJSONfile();
    }

    readJSONfile() {
        let dataobject;
        if (window.localStorage.getItem('categories') !== null) {
            dataobject = JSON.parse(window.localStorage.getItem('categories'));
        }
        else {
            dataobject = json;
        }
        let index = 0;
        for (const categoryObject of dataobject.categories) {
            this.#categories.push(new Category(categoryObject.name));
            this.#categories[index].loadCategoryFromDataObject(categoryObject);
            index++;
        }
    }

    writeJSONfile(e) {
        let dataObject = { categories: [] };
        for (let category of this.#categories) {
            dataObject.categories.push(category.formatCategoryObject());
        }
        const data = JSON.stringify(dataObject);
        window.localStorage.setItem('categories', data);
    }
    /*  OFRECER EXPORTAR JSON
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
     }*/
}

new ElaboraTest().start();

