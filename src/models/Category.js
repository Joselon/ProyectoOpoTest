import { Concept } from "./Concept.js";

class Category {
    #name;
    #concepts = [];
    #subcategories = [];

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

    getTotalNumberOfQuestions() {
        let nquestions = 0;
        for (let concept of this.#concepts)
            nquestions += concept.getNumberOfQuestions();
        for (let category of this.#subcategories) {
            nquestions += category.getTotalNumberOfQuestions();
        }
        return nquestions;
    }

    getAllQuestions() {
        let allQuestions = [];
        for (let concept of this.#concepts)
            for (let question of concept.getQuestions())
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
            this.#subcategories[indexSub].loadConceptsFromDataObject(subcategory)
            indexSub++;
        }
    }

    loadConceptsFromDataObject(categoryDataObject) {
        let indexCon = 0;
        for (let concept of categoryDataObject.concepts) {
            this.addConcept(new Concept(concept.keyword));
            this.#concepts[indexCon].loadQuestionsFromDataObject(concept);
            this.#concepts[indexCon].loadDefinitionsFromDataObject(concept);
            this.#concepts[indexCon].loadFakeKeywordsFromDataObject(concept);
            //Pendiente recuperar  Relations...
            indexCon++;
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
                    concepts: []
                });
            categorySubcategoriesObjects[indexSub].subcategories = subcategory.formatSubcategoriesObjects();
            categorySubcategoriesObjects[indexSub].concepts = subcategory.formatConceptsObjects();
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
                    questions: [],
                    definitions: [],
                    fakeKeywords: []
                });
            categoryConceptsObjects[indexCon].questions = concept.formatQuestionsObjects();
            categoryConceptsObjects[indexCon].definitions = concept.formatDefinitionsObjects();
            categoryConceptsObjects[indexCon].fakeKeywords = concept.formatDefinitionsObject();
            //Pendiente guardar  Relations...
            indexCon++;
        }
        return categoryConceptsObjects;
    }

}

export { Category }