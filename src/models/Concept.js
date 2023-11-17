import { OpenQuestion, MultipleChoiceQuestion } from "./Question.js";
import { Definition } from "./Definition.js";

class Concept {
    #keyword;
    #definitions;
    #relations;
    #questions;

    constructor(keyword) {
        this.#keyword = keyword;
        this.#questions = [];
        this.#definitions = [];
        this.#relations = [];
    }

    getKeyword() {
        return this.#keyword;
    }

    getDefinition(index) {
        return this.#definitions[index];
    }

    getDefinitions() {
        return this.#definitions;
    }

    getRelations() {
        return this.#relations;
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
            if (question.getType() === "Open")
                openQuestions.push(question);
        }
        return openQuestions;
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

    addDefinition(definition) {
        this.#definitions.push(definition);
    }

    addRelation(relation) {
        this.#relations.push(relation);
    }


    getNumberOfDefinitions() {
        return this.#definitions.length;
    }

    getNumberOfRelations() {
        return this.#relations.length;
    }

    getNumberOfQuestions() {
        return this.#questions.length;
    }

    loadQuestionsFromDataObject(concept) {
        let indexQuest = 0;
        for (let question of concept.questions) {
            if (question.type === "Open") {
                this.addQuestion(new OpenQuestion(question.statement, question.statementType, this));
                this.#questions[indexQuest].loadAnswersFromDataObject(question);

            }
            else if (question.type === "MultipleChoice") {
                this.addQuestion(new MultipleChoiceQuestion(question.statement, question.statementType, this));
                this.#questions[indexQuest].loadAnswersFromDataObject(question);
            }
            indexQuest++;
        }
    }
    loadDefinitionsFromDataObject(concept) {

        for (let definition of concept.definitions) {
            this.addDefinition(new Definition(definition.content, definition.isFake, definition.createdDate));

        }
    }

    formatQuestionsObjects() {
        let conceptQuestionsObjects = [];
        let indexQuest = 0;
        for (let question of this.#questions) {
            conceptQuestionsObjects.push(
                {
                    statement: question.getStatement(),
                    statementType: question.getStatementType(),
                    type: question.getType(),
                    answers: []
                });
            conceptQuestionsObjects[indexQuest].answers = question.formatAnswersObjects();
            indexQuest++;
        }
        return conceptQuestionsObjects;
    }

    formatDefinitionsObjects() {
        let conceptDefinitionsObjects = [];
        let indexDef = 0;
        for (let definition of this.#definitions) {
            conceptDefinitionsObjects.push(
                {
                    content: definition.getContent(),
                    isFake: definition.isFake(),
                    createdDate: definition.getCreatedDate(),
                    justifications: []
                });
            //conceptDefinitionsObjects[indexDef].justificactions = definition.formatJustificactions();
            indexDef++;
        }
        return conceptDefinitionsObjects;
    }

}

export { Concept }