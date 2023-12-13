import { Concept } from "./Concept.js";
import { QuestionBuilder } from "./QuestionBuilder.js";


class Category {
    #name;
    #concepts = [];
    #subcategories = [];
    #questions = [];

    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    getConcept(index) {
        return this.#concepts[index];
    }

    getConcepts() {
        return this.#concepts;
    }

    getSubcategory(index) {
        return this.#subcategories[index];
    }

    getSubcategories() {
        return this.#subcategories;
    }

    getTotalNumberOfConcepts() {
        let subconcepts = 0;
        for (let category of this.#subcategories) {
            subconcepts += category.getTotalNumberOfConcepts();
        }
        return this.#concepts.length + subconcepts;
    }

    getTotalNumberOfSubcategories() {
        let subsubcategories = 0;
        if (this.#subcategories.length > 1)
            for (let category of this.#subcategories) {
                subsubcategories += category.getTotalNumberOfSubcategories();
            }
        return this.#subcategories.length + subsubcategories;

    }

    getQuestions() {
        return this.#questions;
    }

    getQuestion(index) {
        return this.#questions[index];
    }

    getOpenQuestions() {
        let openQuestions = [];
        for (let question of this.#questions) {
            if (question.getType() === "Open") //DANGER!!
                openQuestions.push(question);
        }
        return openQuestions;
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

    getTotalNumberOfQuestions() {
        let nquestions = this.#questions.length;
        for (let subcategory of this.#subcategories) {
            nquestions += subcategory.getTotalNumberOfQuestions();
        }
        return nquestions;
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

    addConcept(concept) {
        this.#concepts.push(concept);
    }

    addSubcategory(category) {
        this.#subcategories.push(category);
    }

    loadSubcategoriesFromDataObject(categoryDataObject) {
        let indexSub = 0;
        for (let subcategory of categoryDataObject.subcategories) {
            this.addSubcategory(new Category(subcategory.name));
            this.#subcategories[indexSub].loadSubcategoriesFromDataObject(subcategory);
            this.#subcategories[indexSub].loadConceptsFromDataObject(subcategory);
            this.#subcategories[indexSub].loadQuestionsFromDataObject(subcategory);
            indexSub++;
        }
    }

    loadConceptsFromDataObject(categoryDataObject) {
        let indexCon = 0;
        for (let concept of categoryDataObject.concepts) {
            this.addConcept(new Concept(concept.keyword));
            this.#concepts[indexCon].loadDefinitionsFromDataObject(concept);
            this.#concepts[indexCon].loadFakeKeywordsFromDataObject(concept);
            //Pendiente recuperar  Relations...
            indexCon++;
        }
    }
    loadQuestionsFromDataObject(categoryDataObject) {
        let indexQuest = 0;
        for (let question of categoryDataObject.questions) {
            let questionBuilder = new QuestionBuilder(question.conceptIndex, this);
            this.addQuestion(questionBuilder.create(question.type, question.statement, question.target));
            this.#questions[indexQuest].loadAnswersFromDataObject(question);
            indexQuest++;
        }
    }

    formatSubcategoriesObjects() {
        let categorySubcategoriesObjects = [];
        let indexSub = 0;
        for (let subcategory of this.#subcategories) {
            categorySubcategoriesObjects.push(
                {
                    name: subcategory.getName(),
                    subcategories: [],
                    concepts: [],
                    questions: []
                });
            categorySubcategoriesObjects[indexSub].subcategories = subcategory.formatSubcategoriesObjects();
            categorySubcategoriesObjects[indexSub].concepts = subcategory.formatConceptsObjects();
            categorySubcategoriesObjects[indexSub].questions = subcategory.formatQuestionsObjects();
            indexSub++;
        }
        return categorySubcategoriesObjects;
    }

    formatConceptsObjects() {
        let categoryConceptsObjects = [];
        let indexCon = 0;
        for (let concept of this.#concepts) {
            categoryConceptsObjects.push(
                {
                    keyword: concept.getKeyword(),
                    definitions: [],
                    fakeKeywords: []
                });
            categoryConceptsObjects[indexCon].definitions = concept.formatDefinitionsObjects();
            categoryConceptsObjects[indexCon].fakeKeywords = concept.formatDefinitionsObject();
            //Pendiente guardar  Relations...
            indexCon++;
        }
        return categoryConceptsObjects;
    }

    formatQuestionsObjects() {
        let categoryQuestionObjects = [];
        let indexQuest = 0;
        for (let question of this.#questions) {
            categoryQuestionObjects.push(
                {
                    conceptIndex: question.getConceptIndex(),
                    statement: question.getStatement(),
                    target: question.getStatementTarget(),
                    type: question.getType(),
                    answers: []
                });
            categoryQuestionObjects[indexQuest].answers = question.formatAnswersObjects();
            indexQuest++;
        }
        return categoryQuestionObjects;
    }
}

export { Category }