import './components/jno-menutitle.js'
import '@dile/dile-input/dile-input';
import '@dile/dile-button-icon/dile-button-icon.js';

class ButtonsDialog {

    #container;
    #htmlElementId;

    constructor(htmlElementId) {
        this.#htmlElementId = htmlElementId;
    }

    addTitle(title = "") {
        this.#container = document.createElement('jno-menutitle');
        this.#container.title = title;
        document.getElementById(this.#htmlElementId).append(this.#container);
        const divButtons = document.createElement('div');
        divButtons.id = "buttonsId";
        document.getElementById(this.#htmlElementId).append(divButtons);
    }

    addButton(text, callback, index) {
        let button = document.createElement('dile-button-icon');
        button.innerHTML = text;
        button.addEventListener('click', () => {
            this.delete();
            callback(index);
        });
        document.getElementById("buttonsId").append(button);
    }

    delete() {
        let childs = document.getElementById(this.#htmlElementId)
        while (childs.firstChild) {
            childs.removeChild(childs.firstChild);
        }
    }
}

class MenuDialog extends ButtonsDialog {

    constructor(htmlElementId, title, buttonsText, indexcallback) {
        super(htmlElementId);
        this.addTitle(title);
        let texts = buttonsText;
        for (let i = 0; i < texts.length; i++) {
            this.addButton(texts[i], indexcallback, i);
        }
    }

}

class OneButtonDialog extends ButtonsDialog {

    constructor(htmlElementId, title,  callback) {
        super(htmlElementId)
        this.addTitle(title)
        this.addButton(title, callback)
    }
    addButton(text, callback) {
        const button = document.createElement('dile-button-icon');
        button.innerHTML = text;
        button.addEventListener('click', () => {
            this.delete();
            callback();
        });
        document.getElementById("buttonsId").append(button);
    }

}

class InputDialog extends OneButtonDialog {

    constructor(htmlElementId, title, inputcallback) {
        super(htmlElementId, title, inputcallback);
        this.addInput(title);
    }

    addInput(title) {
        const input = document.createElement('dile-input');
        input.placeholder = title;
        document.getElementById("buttonsId").append(input);
    }
}

export { MenuDialog, InputDialog };