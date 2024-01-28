import '@dile/dile-pages/dile-pages.js';
import '@dile/dile-tabs/dile-tabs.js';
import './components/jno-categories-list.js';

export class MainMenu {
    _menuElement;
    _options;
    _userState;
    _categories;

    constructor(userState, categories) {
        this._userState = userState;
        this._categories = categories;
        this._options = [["jno-categories-list", "Temas"], ["questions", "Preguntas"], ["concepts", "Conceptos"]];
        this.createMenu();
    }

    createMenu() {
        this._menuElement = document.createElement('div');
        let tabContainer = document.createElement('section');
        let contentContainer = document.createElement('section');

        let tabsHtml = '<dile-tabs attrForSelected="name" selected="jno-categories-list" selectorId="tabs">';
        let contentHtml = '<dile-pages attrForSelected="name" selected="jno-categories-list" selectorId="tabs">';

        let optionsHtml = '';
        for (let option of this._options) {
            optionsHtml += `<dile-tab name=${option[0]}>${option[1]}</dile-tab>`;
            contentHtml += `<div id=${option[0]} name=${option[0]}><p>${option[1]}</p></div>`;
        }
        tabsHtml += optionsHtml+'</dile-tabs>';
        tabContainer.innerHTML = tabsHtml;
        contentHtml += '</dile-pages>';
        contentContainer.innerHTML= contentHtml;
        this._menuElement.append(tabContainer,contentContainer);
    }

    getOptionHTML(elementName) {
        let elementList = document.createElement(elementName);
        elementList.categories = this._categories;
        return elementList;
    }

    interact() {
        document.getElementById('app').append(this._menuElement);
        for (let option of this._options) {
            document.getElementById(option[0]).append(this.getOptionHTML(option[0]));
        }
    }
}