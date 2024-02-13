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
import '@dile/dile-confirm/dile-confirm';

class ElaboraTest {
    #dataObject;
    #userState;
    #categories;

    constructor() {
        this.#categories = [];
        this.#setUp();
    }

    start() {
        document.querySelector('#categoriesJSONfile').onchange = this.readJSONfile.bind(this);
        document.querySelector('#exportJSONfile').onclick = this.exportJSONfile.bind(this);

        new UserDialog((userTypeIndex) => {
            this.#userState.setCurrentUserType(UserType.values()[userTypeIndex]);
            new InputDialog('app', 'Escribe nombre de usuario:', (username) => {

                this.#userState.setCurrentUserName(username);
                if (this.#userState.getCurrentUserType() === UserType.TEACHER) {
                    new TeacherMainMenu(this.#userState, this.#categories).show();
                }
                else {
                    new MainMenu(this.#userState, this.#categories).show();
                }
                document.addEventListener('model-changed', this.writeJSONdata.bind(this));
            })

        })
    }

    #setUp() {
        this.#userState = new UserState();
        this.setData();
        this.readJSONdata();
    }

    setData() {
        if (window.localStorage.getItem('categories') !== null) {
            this.#dataObject = JSON.parse(window.localStorage.getItem('categories'));
        }
        else {
            this.#dataObject = json;
        }
    }

    readJSONdata() {
        this.#categories = [];
        let index = 0;
        for (const categoryObject of this.#dataObject.categories) {
            this.#categories.push(new Category(categoryObject.name));
            this.#categories[index].loadCategoryFromDataObject(categoryObject);
            index++;
        }
    }

    readJSONfile(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = ((e) => {
            this.#dataObject = JSON.parse(e.target.result);
            this.readJSONdata();
            this.writeJSONdata();
            location.reload();
        }).bind(this);
        reader.readAsText(file);
    }

    formatJSONdata() {
        this.#dataObject = { categories: [] };
        for (let category of this.#categories) {
            this.#dataObject.categories.push(category.formatCategoryObject());
        }
        const data = JSON.stringify(this.#dataObject);
        return data;
    }

    writeJSONdata(e) {
        const data = this.formatJSONdata();
        window.localStorage.setItem('categories', data);
    }
    exportJSONfile() {
        const data = this.formatJSONdata();
        const a = document.createElement("a");
        const content = data,
            blob = new Blob([content], { type: "octet/stream" }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "database.json";
        a.click();
        window.URL.revokeObjectURL(url);

    };
}

new ElaboraTest().start();

