import '@dile/dile-pages/dile-pages.js';
import '@dile/dile-tabs/dile-tabs.js';

export class MainMenu {
    _menuElement;
    _options;
    _userState;
    _categories;

    constructor(userState, categories) {
        this._userState = userState;
        this._categories = categories;
        this._options = [["categories", "Temas"], ["questions", "Preguntas"], ["concepts", "Conceptos"]];
        this.createMenu();
    }

    createMenu() {
        this._menuElement = document.createElement('div');
        let tabContainer = document.createElement('section');
        let contentContainer = document.createElement('section');

        let tabsElement = document.createElement('dile-tabs');
        tabsElement.id = 'tabs';
        tabsElement.setAttribute(`attrForSelected`, 'name');
        tabsElement.setAttribute(`selected`, 'categories');
        tabsElement.setAttribute(`selectorId`, 'tabs');

        let contentElement = document.createElement('dile-pages');
        contentElement.id = "pages";
        contentElement.setAttribute(`attrForSelected`, 'name');
        contentElement.setAttribute(`selected`, 'categories');
        contentElement.setAttribute(`selectorId`, 'tabs');

        let optionsHtml = '';
        let contentHtml = '';
        for (let option of this._options) {
            optionsHtml += `<dile-tab name=${option[0]}>${option[1]}</dile-tab>`;
            contentHtml += `<div name=${option[0]}><p>${option[1]}</p></div>`;
        }
        tabsElement.innerHTML = optionsHtml;
        tabContainer.append(tabsElement);
        contentElement.innerHTML = contentHtml;
        contentContainer.append(contentElement);
        this._menuElement.appendChild(tabContainer);
        this._menuElement.appendChild(contentContainer);

    }

    interact() {
        document.getElementById('app').append(this._menuElement);
    }



}