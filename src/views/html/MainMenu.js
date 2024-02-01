import '@dile/dile-pages/dile-pages.js';
import '@dile/dile-tabs/dile-tabs.js';
import '@dile/dile-modal/dile-modal';
import './components/jno-categories-list.js';
import './components/jno-questions-list.js';
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
        this._setOptions();
        this.#createMenu();
        this._createState();
    }

    _setOptions() {
        this._options = [["jno-categories-list", "Categorías"], ["jno-questions-list", "Preguntas"]];
    }

    #createMenu() {
        this._menuElement = document.createElement('div');
        let tabContainer = document.createElement('section');
        let contentContainer = document.createElement('section');

        let tabsHtml = '<dile-tabs attrForSelected="name" selected="jno-categories-list" selectorId="tabs">';
        let contentHtml = '<dile-pages attrForSelected="name" selected="jno-categories-list" selectorId="tabs">';

        let optionsHtml = '';
        for (let option of this._options) {
            optionsHtml += `<dile-tab name=${option[0]}>${option[1]}</dile-tab>`;
            contentHtml += `<div id=${option[0]} name=${option[0]}></div>`;
        }
        tabsHtml += optionsHtml + '</dile-tabs>';
        tabContainer.innerHTML = tabsHtml;
        contentHtml += '</dile-pages>';
        contentContainer.innerHTML = contentHtml;
        this._menuElement.append(tabContainer, contentContainer);
    }

    _getOptionHTML(elementName) {
        let elementList = document.createElement(elementName);
        if (elementName === 'jno-categories-list') {
            elementList.elements = this._categories;
        }
        else if (elementName === 'jno-questions-list') {
            elementList.elements = this._categories;
            elementList.userState = this._userState;
        }
        else {
            //Error no existe tipo de elemento creado
        }
        elementList.userState = this._userState;
        return elementList;
    }

    _createState() {
        this._stateElement = document.createElement('jno-user-state');
        this._stateElement.userState = this._userState;
    }

    interact() {
        document.getElementById('app').append(this._menuElement);
        for (let option of this._options) {
            document.getElementById(option[0]).append(this._getOptionHTML(option[0]));
        }
        document.getElementById('state').style.display = "block"
        document.getElementById('state').append(this._stateElement);
    }


}

class TeacherMainMenu extends MainMenu {

    _setOptions() {
        this._options = [["jno-categories-list", "Categorías"], ["jno-concepts-list", "Conceptos"], ["jno-questions-list", "Preguntas"]];
    }

    _getOptionHTML(elementName) {
        let elementList = document.createElement(elementName);
        if (elementName === 'jno-categories-list') {
            elementList.elements = this._categories;
        }
        else if (elementName === 'jno-questions-list') {
            elementList.elements = this._categories;
        }
        else if (elementName === 'jno-concepts-list') {
            elementList.elements = this._categories;
        }
        else {
            //Error no existe tipo de elemento creado
        }
        elementList.userState = this._userState;
        return elementList;
    }
}

export { MainMenu, TeacherMainMenu }