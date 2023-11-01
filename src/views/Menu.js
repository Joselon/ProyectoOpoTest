import { DynamicMenu, IterativeMenu, ModelOption } from "../utils/view/Menu.js";
import { console } from '../utils/view/console.js';

// model

class GameModesModel {

    #gameModes;
    #selectedMode = 0;

    constructor() {
        this.#gameModes = [];
        for (let string of [`Demo`, `1 Player`, `2 Players`])
            this.#gameModes.push(string);
    }

    get(index) {
        return this.#gameModes[index];
    }

    size() {
        return this.#gameModes.length;
    }

    setSelectedMode(index) {
        this.#selectedMode = index;
    }

    getSelectedMode() {
        return this.#selectedMode;
    }

}

// ModelOptions

class PlayOption extends ModelOption {

    constructor(model) {
        super("Play", model);
    }

    interact() {
        // console.writeln(`play`)`;`
    }
}

class ConfigurationOption extends ModelOption {

    constructor(model) {
        super("Configuration", model);
    }

    interact() {
        new Connect4ConfigurationMenu(new GameModesModel()).interact();
    }

}

class ShowSelectedModeOption extends ModelOption {

    constructor(model) {
        super("Active Mode", model);
    }

    interact() {
        console.writeln();
        console.writeln((this.model.getSelectedMode() + 1) + ". " + this.model.get(this.model.getSelectedMode()));
        console.writeln();
    }

}

class SetSelectedModeOption extends ModelOption {

    constructor(model) {
        super("Change Mode", model);
    }

    interact() {
        new GameModesMenu(this.model).interact();
    }

}

class SelectModelOption extends ModelOption {

    #index;

    constructor(model, index) {
        super("Select ", model);
        this.model = model;
        this.#index = index;
    }

    getTitle() {
        return super.getTitle() + ": " + this.model.get(this.#index);
    }

    interact() {
        this.model.setSelectedMode(this.#index);
    }

}

// ModelMenus

class GameModesMenu extends DynamicMenu {

    #model;

    constructor(model) {
        super("Game Modes Menu");
        this.#model = model;
        this.addOptions();

    }

    addOptions() {
        for (let i = 0; i < this.#model.size(); i++) {
            this.add(new SelectModelOption(this.#model, i));
        }
    }

}

class Connect4ConfigurationMenu extends IterativeMenu {

    #model;

    constructor(model) {
        super("Connec4 Configuration Menu");
        this.#model = model;
    }

    addOptions() {
        this.add(new ShowSelectedModeOption(this.#model));
        this.add(new SetSelectedModeOption(this.#model));
    }

}

class MainMenu extends IterativeMenu {

    #model;

    constructor(model) {
        super("Main Menu");
        this.#model = model;
    }

    addOptions() {
        this.add(new PlayOption(this.#model));
        this.add(new ConfigurationOption(this.#model));
    }

}


export { MainMenu, Connect4ConfigurationMenu };