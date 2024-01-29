import '@dile/dile-nav/dile-nav.js';
import { InputDialog } from './utils/view/html/Dialog.js';
import { UserMenu } from './views/html/UserMenu.js';
import { MainMenu, TeacherMainMenu } from './views/html/MainMenu.js';
import './views/html/styles.css';

import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { UserType } from './models/UserTypes.js';

import { json } from './data/database_var.js';
//import { readFileSync, writeFileSync } from 'node:fs';

class ElaboraTest {
    #userState;
    #categories;

    constructor() {
        this.#categories = [];
        this.#setUp();
    }

    start() {
        document.addEventListener('DOMContentLoaded', function () {
            new UserMenu((userTypeIndex) => {
                this.#userState.setCurrentUserType(UserType.values()[userTypeIndex]);
                new InputDialog("app", `Escribe nombre de usuario:`, () => {
                    this.#userState.setCurrentUserName("Default");
                    if (this.#userState.getCurrentUserType() === UserType.TEACHER) {
                        new TeacherMainMenu(this.#userState, this.#categories).interact();
                    }
                    else {
                        new MainMenu(this.#userState, this.#categories).interact();
                    }
                })

            })
            console.log(this.#categories);
        }.bind(this));
    }

    #setUp() {
        this.#userState = new UserState();
        this.readJSONfile();
    }

    readJSONfile() {
        const dataobject = json;

        let index = 0;
        for (const categoryObject of dataobject.categories) {
            this.#categories.push(new Category(categoryObject.name));
            this.#categories[index].loadCategoryFromDataObject(categoryObject);
            index++;
        }
    }

    /* GUARDAR EN LOCALSTORAGE Y OFRECER EXPORTAR JSON
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
