import { Category } from './models/Category.js';
import { Concept } from './models/Concept.js';
import { UserState } from './models/UserState.js';
import { MainMenu } from './views/MainMenu.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { readFileSync, writeFileSync } from 'node:fs';

class ElaboraTest {
    #userState;
    #categories;


    constructor() {
        this.#categories = [];
        this.#setUp();
    }

    start() {
        do {
            new MainMenu(this.#userState, this.#categories).interact();
        } while (this.#isResumed());
    }

    #isResumed() {
        let yesNoDialog = new YesNoDialog();
        yesNoDialog.read(`¿Desea salvar antes de salir`);
        if (yesNoDialog.isAffirmative()) {
            this.writeJSONfile();
            return yesNoDialog.isNegative();
        }
        return yesNoDialog.isAffirmative();
    }

    #setUp() {
        this.#userState = new UserState(0, new Category("---"), new Concept("---"));
        this.readJSONfile();
    }

    async readJSONfile() {
        try {
            const data = readFileSync('data/database.json', 'utf-8');
            const dataobject = JSON.parse(data);

            let index = 0;
            for (let category of dataobject.categories) {
                this.#categories.push(new Category(category.name));
                this.#categories[index].loadSubcategoriesFromDataObject(category);
                this.#categories[index].loadConceptsFromDataObject(category);
                index++;
            }

        } catch (error) {
            console.error('Error al leer el archivo de base de datos:', error);
        }
    }

    async writeJSONfile() {
        try {
            let dataObject = { categories: [] };
            let index = 0;
            for (let category of this.#categories) {
                dataObject.categories.push({
                    name: category.getName(),
                    subcategories: [],
                    concepts: []
                });
                this.#formatSubcategories(dataObject.categories[index],category);
                this.#formatConcepts(dataObject.categories[index], category);
                index++;
            }
            const data = JSON.stringify(dataObject);
            writeFileSync('data/database.json', data);
        } catch (error) {
            console.error('Error al escribir en el archivo de base de datos:', error);
        }
    }

    #formatSubcategories(categoryTarget, category) {
        let indexSub = 0;
        for (let subcategory of category.getSubcategories()) {
            categoryTarget.subcategories.push(
                {
                    name: subcategory.getName(),
                    subcategories: [],
                    concepts: []
                });
            this.#formatSubcategories(categoryTarget.subcategories[indexSub], subcategory);
            this.#formatConcepts(categoryTarget.subcategories[indexSub], subcategory);
            indexSub++;
        }
    }
    #formatConcepts(categoryTarget, category) {
        let indexCon = 0;
        for (let concept of category.getConcepts()) {
            categoryTarget.concepts.push(
                {
                    keyword: concept.getKeyword(),
                    questions: [],
                    definitions: []
                });
            this.#formatQuestions(categoryTarget.concepts[indexCon], concept);
            this.#formatDefinitions(categoryTarget.concepts[indexCon], concept);
            //Pendiente guardar  Relations
            indexCon++;
        }
    }

    #formatQuestions(conceptTarget, concept) {
        let indexQuest = 0;
        for (let question of concept.getQuestions()) {
            conceptTarget.questions.push(
                {
                    statement: question.getStatement(),
                    statementType: question.getStatementType(),
                    type: question.getType(),
                    answers: []
                });
            this.#formatAnswers(conceptTarget.questions[indexQuest], question);
            indexQuest++;
        }
    }

    #formatAnswers(questionTarget, question) {
        let indexAns = 0;
        for (let answer of question.getAnswers()) {
            if (question.getType() === "Open") {
                questionTarget.answers.push(
                    {
                        username: answer.getUserName(),
                        content: answer.getContent(),
                        isOK: answer.getEvaluation(),
                        isUsefulForConcept: answer.isUsefulForConcept(),
                        createdDate: answer.getCreatedDate(),
                        evaluatedDate: answer.getEvaluatedDate()
                    });
            }
            else if (question.getType() === "MultipleChoice") {
                questionTarget.answers.push(
                    {
                        username: answer.getUserName(),
                        content: answer.getContent(),
                        isOK: answer.getEvaluation(),
                        createdDate: answer.getCreatedDate(),
                        evaluatedDate: answer.getEvaluatedDate()
                    });
            }
            indexAns++;
        }
    }

    #formatDefinitions(conceptTarget, concept) {
        let indexDef = 0;
        for (let definition of concept.getDefinitions()) {
            conceptTarget.definitions.push(
                {
                    content: definition.getContent(),
                    isFake: definition.isFake(),
                    createdDate: definition.getCreatedDate(),
                    justifications: []
                });
            //this.#formatJustificactions(conceptTarget.definitions[indexDef],definition);
            indexDef++;
        }
    }

}

new ElaboraTest().start();
