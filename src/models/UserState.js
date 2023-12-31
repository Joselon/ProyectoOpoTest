import { UserType } from './UserTypes.js'
import { Category } from './Category.js';
import { Concept } from './Concept.js';

class UserState {
    #userName;
    #type;
    #currentCategory;
    #currentConcept;
    #selectedQuestionType;
    #selectedStatementTarget;

    constructor(username = "", type = UserType.TEACHER, category = new Category("---"), concept = new Concept("---")) {
        this.#type = type;
        this.#currentCategory = category;
        this.#currentConcept = concept;
        this.#userName = username;
    }

    getCurrentUserType() {
        return this.#type;
    }

    getCurrentUserTypeName() {
        return this.#type.toString();
    }

    getCurrentCategory() {
        return this.#currentCategory;
    }

    getCurrentConcept() {
        return this.#currentConcept;
    }

    getCurrentConceptIndex() {
        return this.#currentCategory.getConcepts().indexOf(this.#currentConcept)
    }

    setCurrentCategory(category) {
        this.#currentCategory = category;
    }

    setCurrentUserType(type) {
        this.#type = type;
    }

    setCurrentConcept(concept) {
        this.#currentConcept = concept;
    }

    setSelectedQuestionType(type) {
        this.#selectedQuestionType = type;
    }

    getSelectedQuestionType() {
        return this.#selectedQuestionType;
    }

    setSelectedStatementTarget(target) {
        this.#selectedStatementTarget = target;
    }

    getSelectedStatementTarget() {
        return this.#selectedStatementTarget;
    }

    getCurrentUserName() {
        return this.#userName;
    }

    setCurrentUserName(userName) {
        this.#userName = userName;
    }

}

export { UserState }
