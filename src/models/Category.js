import { Concept } from "./Concept.js";
import { QuestionBuilder } from "./QuestionBuilder.js";

class Category {
    #name;
    #concepts = new Map();
    #subcategories = [];
    #questions = [];

    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    getConcept(key) {
        return this.#concepts.get(key);
    }

    getConcepts() {
        return this.#concepts;
    }
    getConceptsArray() {
        let concepts = [];
        for (let concept of this.#concepts.values()){
            concepts.push(concept);
        }
        return concepts;
    }

    getSubcategories() {
        return this.#subcategories;
    }

    getQuestions() {
        return this.#questions;
    }

    getTotalNumberOfConcepts() {
        let subconcepts = 0;
        for (let category of this.#subcategories)
            subconcepts += category.getTotalNumberOfConcepts();
        return this.#concepts.size + subconcepts;
    }

    getTotalNumberOfSubcategories() {
        let subsubcategories = 0;
        if (this.#subcategories.length > 1)
            for (let category of this.#subcategories)
                subsubcategories += category.getTotalNumberOfSubcategories();
        return this.#subcategories.length + subsubcategories;
    }

    getTotalNumberOfQuestions() {
        let nquestions = this.#questions.length;
        for (let subcategory of this.#subcategories)
            nquestions += subcategory.getTotalNumberOfQuestions();
        return nquestions;
    }

    getConceptQuestions(conceptKey) {
        let conceptQuestions = [];
        for (let question of this.#questions) {
            if (question.getConceptKey() === conceptKey)
                conceptQuestions.push(question);
        }
        return conceptQuestions;
    }

    getAllQuestions() {
        let allQuestions = [];
        for (let question of this.#questions)
            allQuestions.push(question);
        for (let category of this.#subcategories) {
            for (let question of category.getAllQuestions())
                allQuestions.push(question);
        }
        return allQuestions;
    }

    getAllConcepts() {
        let allConcepts = [];
        for (let concept of this.#concepts.values())
            allConcepts.push(concept);
        for (let category of this.#subcategories) {
            for (let concept of category.getAllConcepts())
                allConcepts.push(concept);
        }
        return allConcepts;
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

    addConcept(concept) {
        this.#concepts.set(concept.getKeyword(),concept);
    }

    addSubcategory(category) {
        this.#subcategories.push(category);
    }

    setName(name) {
        this.#name = name;
    }

    getConceptKey(concept) {
        for (let [key, value] of this.#concepts.entries()) {
              if (value === concept)
                return key;
            }
    }

    deleteConcept(concept) {
        this.#deleteConceptKeyQuestions(this.getConceptKey(concept));
        this.#concepts.delete(this.getConceptKey(concept));
    }

    #deleteConceptKeyQuestions(conceptKey){
        let questions = [...this.#questions];
        for (let question of questions){
            if (question.getConceptKey() === conceptKey){
                this.#questions.splice(this.#questions.indexOf(question), 1);
            }
        }
    }

    updateConcept(concept, newkeyword) {
        let conceptKey = this.getConceptKey(concept);
        this.#updateConceptQuestions(conceptKey,newkeyword);
        this.getConcept(conceptKey).setKeyword(newkeyword);
        this.#concepts.delete(conceptKey);
        this.addConcept(concept);
    }

    #updateConceptQuestions(conceptKey, newkeyword) {
        for (let question of this.#questions){
            if (question.getConceptKey() === conceptKey){
                question.setConceptKey(newkeyword);
            }
        }
    }

    loadCategoryFromDataObject(categoryDataObject) {
        this.#loadSubcategoriesFromDataObject(categoryDataObject);
        this.#loadConceptsFromDataObject(categoryDataObject);
        this.#loadQuestionsFromDataObject(categoryDataObject);
    }
    #loadSubcategoriesFromDataObject(categoryDataObject) {
        let indexSub = 0;
        for (const subcategoryObject of categoryDataObject.subcategories) {
            this.addSubcategory(new Category(subcategoryObject.name));
            this.#subcategories[indexSub].loadCategoryFromDataObject(subcategoryObject);
            indexSub++;
        }
    }
    #loadConceptsFromDataObject(categoryDataObject) {
        for (const conceptDataObject of categoryDataObject.concepts) {
            this.addConcept(new Concept(conceptDataObject.keyword));
            this.getConcept(conceptDataObject.keyword).loadConceptFromDataObject(conceptDataObject);
        }
    }
    #loadQuestionsFromDataObject(categoryDataObject) {
        let indexQuest = 0;
        for (let questionObject of categoryDataObject.questions) {
            let questionBuilder = new QuestionBuilder(this, questionObject.conceptKey);
            questionBuilder.setStatementImplementor(questionObject.target);
            this.addQuestion(questionBuilder.create(questionObject.type, questionObject.conceptKey, questionObject.statement));
            this.#questions[indexQuest].loadAnswersFromDataObject(questionObject);
            indexQuest++;
        }
    }

    formatCategoryObject() {
        const categoryDataObject = {
            name: this.getName(),
            subcategories: [],
            concepts: [],
            questions: []
        };
        categoryDataObject.subcategories = this.#formatSubcategoriesObjects();
        categoryDataObject.concepts = this.#formatConceptsObjects();
        categoryDataObject.questions = this.#formatQuestionsObjects();

        return categoryDataObject;
    }
    #formatSubcategoriesObjects() {
        const subcategoriesObjects = [];
        for (let subcategory of this.#subcategories) {
            subcategoriesObjects.push(subcategory.formatCategoryObject());
        }
        return subcategoriesObjects;
    }
    #formatConceptsObjects() {
        const conceptsObjects = [];
        for (let concept of this.#concepts.values()) {
            conceptsObjects.push(concept.formatConceptObject());
        }
        return conceptsObjects;
    }
    #formatQuestionsObjects() {
        const questionsObjects = [];
        for (let question of this.#questions) {
            questionsObjects.push(question.formatQuestionObject());
        }
        return questionsObjects;
    }
}

export { Category }