import ClosedInterval from '../model/ClosedInterval.js'
import { console } from './console.js';

class Option {

    #title;

    constructor(title) {
        this.#title = title;
    }

    interact() { };

    showTitle(index) {
        console.writeln(index + ". " + this.getTitle());
    }

    getTitle() {
        return this.#title;
    }

}

class QuitOption extends Option {

    #executed;

    constructor() {
        super("Salir");
        this.#executed = false;
    }

    interact() {
        this.#executed = true;
    }

    isExecuted() {
        return this.#executed;
    }

}

class OpenMenuOption extends Option {
    #menu;

    constructor(title, menu) {
        super(title);
        this.#menu = menu
    }

    interact() {
        this.#menu.interact();
    }
}

class Menu {

    #title;
    #options;

    constructor(title) {
        this.#title = title;
        this.#options = [];
    }

    interact() {
        this.addOptions();
        this.interact_();
    }

    addOptions() {
    };

    interact_() {
        this.showTitles();
        this.execChoosedOption();
    }

    showTitles() {
        this.#showTitle();
        for (let i = 0; i < this.#options.length; i++) {
            this.#options[i].showTitle(i + 1);
        }
    }

    #showTitle() {
        let string = "\n" + this.#title + "\n";
        for (let i = 0; i < this.#title.length; i++) {
            string += "-";
        }
        console.writeln(string);
    }

    execChoosedOption() {
        let answer;
        let ok;

        do {
            answer = this.#readInt("Opción? [1-" + this.#options.length + "]: ") - 1;
            const interval = new ClosedInterval(0, this.#options.length - 1);
            ok = interval.isIncluded(answer);
            if (!ok) {
                console.writeln("Error!!!");
            }
        } while (!ok);
        this.#options[answer].interact();
    }

    #readInt(prompt) {
        return Number.parseInt(console.readNumber(prompt));
    }

    add(option) {
        this.#options.push(option);
    }

    removeOptions() {
        this.#options = [];
    }

    hasOption(option) {
        return this.#options.includes(option);
    }

}

class QuitMenu extends Menu {

    #quitOption;

    constructor(title) {
        super(title);
        this.#quitOption = new QuitOption();
    }

    showTitles() {
        this.addquitOption();
        super.showTitles();
    }

    addquitOption() {
        if (!this.hasOption(this.#quitOption)) {
            this.add(this.#quitOption);
        }
    }

    isExecutedquitOption() {
        return this.#quitOption.isExecuted();
    }

}

class IterativeQuitMenu extends QuitMenu {

    constructor(title) {
        super(title);
    }

    interact() {
        this.addOptions();
        do {
            this.interact_();
        } while (!this.isExecutedquitOption());
    }

}

class DynamicQuitMenu extends IterativeQuitMenu {

    constructor(title) {
        super(title);
    }

    interact() {
        do {
            this.removeOptions();
            this.addOptions();
            this.interact_();
        } while (!this.isExecutedquitOption());
    }

}

class DynamicMenu extends Menu {

    constructor(title) {
        super(title);
    }

    interact() {
        this.removeOptions();
        this.addOptions();
        this.interact_();
    }

}

export { DynamicMenu, DynamicQuitMenu, IterativeQuitMenu, OpenMenuOption, Option };