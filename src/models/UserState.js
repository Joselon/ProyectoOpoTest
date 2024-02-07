import { UserType } from './UserTypes.js'
import { Category } from './Category.js';
import { Concept } from './Concept.js';
import { QuestionBuilder } from "./QuestionBuilder.js";


class UserState {
    #userName;
    #type;
    #currentCategory;
    #currentConcept;
    #selectedQuestionType;
    #selectedStatementTarget;
    #questionBuilder;

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

    getCurrentConceptKey() {
        return this.#currentCategory.getConceptKey(this.#currentConcept);
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
        this.#questionBuilder.setStatementImplementor(target);
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

    setQuestionBuilder() {
        this.#questionBuilder = new QuestionBuilder(this.#currentCategory, this.getCurrentConceptKey(), this.#currentCategory.getConceptQuestions(this.getCurrentConceptKey()))
    }
    
    getQuestionBuilder() {
        return this.#questionBuilder;
    }

    resetSelection() {
        this.#currentCategory = new Category("---");
        this.#currentConcept = new Concept("---"); 
    }

    resetConceptSelected() {
        this.#currentConcept = new Concept("---");
    }

}

export { UserState }
