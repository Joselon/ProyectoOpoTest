import { Category } from "../../models/Category.js";
import { Concept } from "../../models/Concept.js"
import { ButtonsDialog, OneButtonDialog, MenuDialog } from "../../utils/view/html/Dialog.js";

class CategoryOptionsMenu extends OneButtonDialog {
    constructor(htmlElementId, title, buttonsText, buttonsActions) {
        super(htmlElementId);
        this.addTitle(title);
        let texts = buttonsText;
        for (let i = 0; i < texts.length; i++) {
            this.addButton(texts[i], buttonsActions[i]);
        }
    }
}

class CategoriesMenu extends MenuDialog {
    constructor(userState, categories, opencallback) {
        super("app", "Seleccione una Categoría...", categories.map( (category)=>(category.getName())) , opencallback);
    }
}

class TeacherCategoriesMenu extends MenuDialog {
    constructor(userState, categories, opencallback) {
        super("app", "Seleccione una Categoría...", categories.map( (category)=>(category.getName())), opencallback);
    }
}

export { CategoriesMenu, TeacherCategoriesMenu }