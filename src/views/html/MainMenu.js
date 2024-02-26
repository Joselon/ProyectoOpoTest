import '@dile/dile-pages/dile-pages.js';
import '@dile/dile-tabs/dile-tabs.js';
import '@dile/dile-modal/dile-modal';

import './components/jno-categories-list.js';
import './components/jno-categories-teacher-list.js';
import './components/jno-questions-list.js';
import './components/jno-questions-teacher-list.js';
import './components/jno-concepts-list.js';

import './components/jno-user-state.js';

class MainMenu {
    _menuElement;
    _stateElement;
    _options;
    _userState;
    _categories;

    constructor(userState, categories) {
        this._userState = userState;
        this._categories = categories;
        this.#createState();
        this._setOptions();
        this.#createMenu();
    }

    _setOptions() {
        this._options = [
            {
                element: "jno-categories-list",
                title: "Categorías"
            },
            {
                element: "jno-questions-list",
                title: "Preguntas"
            }
        ];
    }

    #createState() {
        this._stateElement = document.createElement('jno-user-state');
        this._stateElement.userState = this._userState;
    }

    #createMenu() {
        this._menuElement = document.createElement('div');
        let tabContainer = document.createElement('section');
        let contentContainer = document.createElement('section');

        let tabsHtml = `<dile-tabs attrForSelected="name" selected="${this._options[this._options.length-1].element}" selectorId="tabs">`;
        let contentHtml = `<dile-pages attrForSelected="name" selected="${this._options[this._options.length-1].element}" selectorId="tabs">`;

        let optionsHtml = '';
        for (let option of this._options) {
            optionsHtml += `<dile-tab name=${option.element}>${option.title}</dile-tab>`;
            contentHtml += `<div id=${option.element} name=${option.element}></div>`;
        }
        tabsHtml += optionsHtml + '</dile-tabs>';
        tabContainer.innerHTML = tabsHtml;
        contentHtml += '</dile-pages>';
        contentContainer.innerHTML = contentHtml;
        this._menuElement.append(tabContainer, contentContainer);
    }

    show() {
        document.getElementById('app').append(this._menuElement);
        for (let option of this._options) {
            document.getElementById(option.element).append(this._getOptionHTML(option.element));
        }
        document.getElementById('state').style.display = "block"
        document.getElementById('state').append(this._stateElement);
    }

    _getOptionHTML(element) {
        let elementList = document.createElement(element);
        if (element === 'jno-categories-list') {
            elementList.elements = this._categories;
        }
        else if (element === 'jno-questions-list') {
            elementList.elements = this._userState.getCurrentCategory().getAllQuestions();
        }
        elementList.userState = this._userState;
        return elementList;
    }


}

class TeacherMainMenu extends MainMenu {

    _setOptions() {
        this._options = [
            {
                element: "jno-categories-teacher-list",
                title: "Categorías"
            },
            {
                element: "jno-concepts-list",
                title: "Conceptos"
            },
            {
                element: "jno-questions-teacher-list",
                title: "Preguntas"
            }
        ];
    }

    _getOptionHTML(element) {
        let elementList = document.createElement(element);
        if (element === 'jno-categories-teacher-list') {
            elementList.elements = this._categories;
        }
        else if (element === 'jno-concepts-list') {
            elementList.elements = this._userState.getCurrentCategory().getConceptsArray();
        }
        else if (element === 'jno-questions-teacher-list') {
            elementList.elements = this._userState.getCurrentCategory().getQuestions();
        }

        elementList.userState = this._userState;
        return elementList;
    }
}

export { MainMenu, TeacherMainMenu }