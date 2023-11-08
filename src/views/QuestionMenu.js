import { DynamicQuitMenu , Option} from "../utils/view/Menu.js";

class QuestionMenu extends DynamicQuitMenu {

    #level;

    constructor(concept) {
        super("Seleccione el tipo de pregunta")
        this.#level = concept.getState();
    }

    addOptions() {
        if(this.#level ==="Primary")
            this.add(new Option("Primary*"));
        
    }



}

export { QuestionMenu }