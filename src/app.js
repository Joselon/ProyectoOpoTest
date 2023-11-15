import { Category } from './models/Category.js';
import { Concept } from './models/Concept.js';
import { MultipleChoiceQuestion, OpenQuestion } from './models/Question.js'
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

    #loadSubcategories(categoryTarget, categoryOrigin) {

        let indexSub = 0;
        let subcategoryTarget;

        for (let subcategory of categoryOrigin.subcategories) {
            categoryTarget.addSubcategory(new Category(subcategory.name));
            subcategoryTarget = categoryTarget.getSubcategory(indexSub);
            this.#loadSubcategories(subcategoryTarget, subcategory);
            this.#loadConcepts(subcategoryTarget, subcategory)
            indexSub++;
        }
    }

    #loadConcepts(categoryTarget, categoryOrigin) {
        let indexCon = 0;
        for (let concept of categoryOrigin.concepts) {
            categoryTarget.addConcept(new Concept(concept.keyword));
            this.#loadQuestions(categoryTarget.getConcept(indexCon), concept);
            //Pendiente recuperar Definitions y Relations
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
            questionTarget.addAnswer(answer.username, answer.content, answer.createdData);
            if (answer.isEvaluated)
                questionTarget.getAnswer(indexAns).evaluate(answer.isOK);
            if (question.getAnswerType === "Open") {
                questionTarget.getAnswer(indexAns).setIsUsefulForConcept(answer.isUsefulForConcept);
            }
            indexAns++;
        }

    }

    #formatSubcategories(categoryTarget, categoryOrigin) {

        let indexSub = 0;
        let subcategoryTarget;
        for (let subcategory of categoryOrigin.getSubcategories()) {
            categoryTarget.subcategories.push(
                {
                    name: subcategory.getName(),
                    subcategories: [],
                    concepts: []
                });
            subcategoryTarget = categoryTarget.subcategories[indexSub];
            this.#formatSubcategories(subcategoryTarget, subcategory);
            this.#formatConcepts(subcategoryTarget, subcategory);
            indexSub++;
        }
    }
    #formatConcepts(categoryTarget, categoryOrigin) {
        let indexCon = 0;
        for (let concept of categoryOrigin.getConcepts()) {
            categoryTarget.concepts.push(
                {
                    keyword: concept.getKeyword(),
                    questions: []
                });

            let indexQuest = 0;
            for (let question of concept.getQuestions()) {
                categoryTarget.concepts[indexCon].questions.push(
                    {
                        statement: question.getStatement(),
                        statementType: question.getStatementType(),
                        answerType: question.getAnswerType(),
                        answers: []
                    });
                let indexAns = 0;
                for (let answer of question.getAnswers()) {
                    if (question.getAnswerType() === "Open") {
                        categoryTarget.concepts[indexCon].questions[indexQuest].answers.push(
                            {
                                username: answer.getUserName(),
                                content: answer.getContent(),
                                isOK: answer.getEvaluation(),
                                isEvaluated: answer.isEvaluated,
                                isUsefulForConcept: answer.isUsefulForConcept,
                                createdData: answer.getCreatedData()
                            });
                    }
                    else {
                        categoryTarget.concepts[indexCon].questions[indexQuest].answers.push(
                            {
                                username: answer.getUserName(),
                                content: answer.getContent(),
                                isOK: answer.getEvaluation(),
                                isEvaluated: true,
                                createdData: answer.getCreatedData()
                            });
                    }
                    indexAns++;
                }
                indexQuest++;
            }
            //Pendiente guardar Definitions y Relations
            indexCon++;
        }
    }
}

new ElaboraTest().start();
