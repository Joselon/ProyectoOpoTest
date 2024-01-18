import '@dile/dile-nav/dile-nav.js';
import { EitOverlay } from './utils/view/html/eit-overlay.js';
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
        this.addMenu();
        console.log(this.#categories)
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

    addMenu() {
        let menu = document.createElement('eit-overlay');
        menu.innerHTML = `<span slot="trigger">Categorias</span>`;
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
