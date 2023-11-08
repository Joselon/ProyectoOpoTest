import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu } from './views/MainMenu.js';
import { Concept } from './models/Concept.js';
import { readFile } from 'fs';

class ElaboraTest {
    #userState;
    #categories;


    constructor() {
        this.#setUp();
    }

    start() {
        this.#categories = [];
        this.readJSONfile();
        //new Category(name, ancestor, subcategories, concepts)
        do {
            new MainMenu(this.#userState, this.#categories).interact();
        } while (this.#isResumed());
    }

    #isResumed() {
        let yesNoDialog = new YesNoDialog();
        yesNoDialog.read(`¿Desea salvar antes de salir`);
        if (yesNoDialog.isAffirmative()) {
            //Save Scence to JSON
        }
        return yesNoDialog.isAffirmative();
    }

    #setUp() {
        this.#userState = new UserState(0, new Category("---"), new Concept("---"));
    }

    async readJSONfile() {
        try {
            const data = await readFile('data/database.json', (err,data)=>data +=data); // Lee el archivo JSON como texto
            const dataobject = JSON.parse(data); // Convierte el texto en un objeto JavaScript

            console.log('Nombre:', dataobject.categories[0].name);

          /*  for (let category of datos.categories)
                this.#categories.push(new Category(category.name, category.ancestor, category.subcategories, category.concepts));
*/
        } catch (err) {
            console.error('Error al leer el archivo de base de datos:', err);
        }
    }
}

new ElaboraTest().start();
