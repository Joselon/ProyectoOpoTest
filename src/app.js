import { Category } from './models/Category.js';
import { Concept } from './models/Concept.js';
import { Definition } from './models/Definition.js';
import { MultipleChoiceQuestion, OpenQuestion } from './models/Question.js';
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
                this.#loadSubcategories(this.#categories[index], category);
                this.#loadConcepts(this.#categories[index], category);
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
                dataObject.categories.push({ name: category.getName(), subcategories: [], concepts: [] });
                this.#formatSubcategories(dataObject.categories[index], category);
                this.#formatConcepts(dataObject.categories[index], category);
                index++;
            }
            const data = JSON.stringify(dataObject);
            writeFileSync('data/database.json', data);
        } catch (error) {
            console.error('Error al escribir en el archivo de base de datos:', error);
        }
    }

    #loadSubcategories(categoryTarget, category) {
        let indexSub = 0;
        for (let subcategory of category.subcategories) {
            categoryTarget.addSubcategory(new Category(subcategory.name));
            this.#loadSubcategories(categoryTarget.getSubcategory(indexSub), subcategory);
            this.#loadConcepts(categoryTarget.getSubcategory(indexSub), subcategory)
            indexSub++;
        }
    }

    #loadConcepts(categoryTarget, category) {
        let indexCon = 0;
        for (let concept of category.concepts) {
            categoryTarget.addConcept(new Concept(concept.keyword));
            this.#loadQuestions(categoryTarget.getConcept(indexCon), concept);
            this.#loadDefinitions(categoryTarget.getConcept(indexCon), concept);
            //Pendiente recuperar  Relations
            indexCon++;
        }
    }

    #loadQuestions(conceptTarget, concept) {
        let indexQuest = 0;
        for (let question of concept.questions) {
            if (question.answerType === "Open") {
                conceptTarget.addQuestion(new OpenQuestion(question.statement, question.statementType, concept));
                this.#loadAnswers(conceptTarget.getQuestion(indexQuest), question);

            }
            else if (question.answerType === "MultipleChoice") {
                conceptTarget.addQuestion(new MultipleChoiceQuestion(question.statement, question.statementType, concept));
                this.#loadAnswers(conceptTarget.getQuestion(indexQuest), question);
            }
            indexQuest++;
        }
    }

    #loadAnswers(questionTarget, question) {

        let indexAns = 0;
        for (let answer of question.answers) {
            questionTarget.addAnswer(answer.username, answer.content, answer.createdDate);
            if (answer.isEvaluated) {
                if (question.getAnswerType === "Open") {
                    questionTarget.getAnswer(indexAns).evaluate(answer.isOK, answer.evaluatedDate, answer.isUsefulForConcept);
                }
                else if (question.getAnswerType === "MultipleChoice") {
                    questionTarget.getAnswer(indexAns).evaluate(answer.isOK, answer.evaluatedDate);
                }
            }

            indexAns++;
        }

    }

    #loadDefinitions(conceptTarget, concept) {

        for (let definition of concept.definitions) {
            conceptTarget.addDefinition(new Definition(definition.content, definition.isFake, definition.createdDate));

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
                    questions: []
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
                    answerType: question.getAnswerType(),
                    answers: []
                });
            this.#formatAnswers(conceptTarget.questions[indexQuest], question);
            indexQuest++;
        }
    }

    #formatAnswers(questionTarget, question) {
        let indexAns = 0;
        for (let answer of question.getAnswers()) {
            if (question.getAnswerType() === "Open") {
                questionTarget.answers.push(
                    {
                        username: answer.getUserName(),
                        content: answer.getContent(),
                        isOK: answer.getEvaluation(),
                        isEvaluated: answer.isEvaluated(),
                        isUsefulForConcept: answer.isUsefulForConcept(),
                        createdDate: answer.getCreatedDate(),
                        evaluatedDate: answer.getEvaluatedDate()
                    });
            }
            else if (question.getAnswerType() === "MultipleChoice") {
                questionTarget.answers.push(
                    {
                        username: answer.getUserName(),
                        content: answer.getContent(),
                        isOK: answer.getEvaluation(),
                        isEvaluated: answer.isEvaluated(),
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
