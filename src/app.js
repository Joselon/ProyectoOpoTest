import '@dile/dile-nav/dile-nav.js';
import { EitOverlay } from './utils/view/html/components/eit-overlay.js';
import { InputDialog } from './utils/view/html/Dialog.js';
import { UserMenu } from './views/html/UserMenu.js';
import { CategoriesMenu, TeacherCategoriesMenu } from './views/html/CategoriesMenu.js';
import './views/html/styles.css';

import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { UserType } from './models/UserTypes.js';
//import { readFileSync, writeFileSync } from 'node:fs';
import { json } from './data/database_var.js';

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
                    if (this.#userState.getCurrentUserType() === UserType.TEACHER) {
                        new TeacherCategoriesMenu(this.#userState, this.#categories, (categoryIndex) => {
                                new TeacherCategoriesMenu(this.#userState, this.#categories[categoryIndex].getSubcategories(), (subcategoryIndex) => {
                                    new TeacherCategoriesMenu(this.#userState, this.#categories[categoryIndex].getSubcategories()[subcategoryIndex].getSubcategories(), () => {
                                        this.addMenu(UserType.TEACHER);
                                    });
                                });
                        });
                    }
                    else {
                        new CategoriesMenu(this.#userState, this.#categories, () => {
                            this.addMenu(UserType.STUDENT);
                        });
                    }
                })

            })
            console.log(this.#categories);
        }.bind(this));

        /*   do {
               new UserMenu(this.#userState).interact();
   
               if (this.#userState.getCurrentUserType() === UserType.TEACHER) {
                   new TeacherMainMenu(this.#userState, this.#categories).interact();
               }
               else {
                   new MainMenu(this.#userState, this.#categories).interact();
               }
           } while (this.#isResumed());*/
    }

    #isResumed() {
        /*  let yesNoDialog = new YesNoDialog();
          yesNoDialog.read(`¿Desea salvar antes de salir`);
          if (yesNoDialog.isAffirmative()) {
              this.writeJSONfile();
              return yesNoDialog.isNegative();
          }
          return yesNoDialog.isAffirmative();*/
    }

    #setUp() {
        this.#userState = new UserState();
        this.readJSONfile();
    }

    addMenu(title) {
        let menu = document.createElement('eit-overlay');
        menu.innerHTML = `<span slot="trigger">${title}</span>`;
        let content = '<div slot="overlay">';
        for (let category of this.#categories) {
            content += `<p>${category.getName()}</p>`;
        }
        content += '</div>';
        menu.innerHTML += content;
        document.getElementById('app').appendChild(menu);
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

    /* async writeJSONfile() {
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
