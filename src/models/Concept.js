import { OpenQuestion, MultipleChoiceQuestion } from "./Question.js";
import { DefinitionStatement, ClassificationStatement, CompositionStatement, ReverseDefinitionStatement } from "./Statement.js";
import { Definition } from "./Definition.js";

class Concept {
    #keyword;
    #fakeKeywords;
    #definitions;
    #relations;
    #questions;

    constructor(keyword) {
        this.#keyword = keyword;
        this.#questions = [];
        this.#definitions = [];
        this.#relations = [];
        this.#fakeKeywords = [];
    }

    getKeyword() {
        return this.#keyword;
    }

    getFakeKeywords() {
        return this.#fakeKeywords;
    }

    addFakeKeyword(string){
        this.#fakeKeywords.push(string);
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
            if (question.getType() === "Open") //DANGER!!
                openQuestions.push(question);
        }
        return openQuestions;
    }

    addQuestion(question) {
        this.#questions.push(question);
    }

    addDefinition(content, isFake, date = new Date()) {
        this.#definitions.push(new Definition(content, isFake, date));
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

    loadQuestionsFromDataObject(conceptDataObject) {
        let indexQuest = 0;
        for (let question of conceptDataObject.questions) {
            let statementImplementor;
            if (question.statementType === "Definition") {
                statementImplementor = new DefinitionStatement(this);
            }
            else if (question.statementType === "Classification") {
                statementImplementor = new ClassificationStatement(this);
            }
            else if (question.statementType === "Composition") {
                statementImplementor = new CompositionStatement(this);
            }
            else if (question.statementType === "FakeKeywords") {
                statementImplementor = new ReverseDefinitionStatement(this);
            }
            else {
                //TODO
            }
            if (question.type === "Open") {
                this.addQuestion(new OpenQuestion(question.statement, statementImplementor));
                this.#questions[indexQuest].loadAnswersFromDataObject(question);

            }
            else if (question.type === "MultipleChoice") {
                this.addQuestion(new MultipleChoiceQuestion(question.statement, statementImplementor));
                this.#questions[indexQuest].loadAnswersFromDataObject(question);
            }
            indexQuest++;
        }
    }
    loadDefinitionsFromDataObject(conceptDataObject) {
        for (let definition of conceptDataObject.definitions) {
            this.addDefinition(definition.content, definition.isFake, definition.createdDate);
        }
    }

    formatQuestionsObjects() {
        let conceptQuestionsObjects = [];
        let indexQuest = 0;
        for (let question of this.#questions) {
            conceptQuestionsObjects.push(
                {
                    statement: question.getStatement(),
                    statementType: question.getStatementTarget(),
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