import { Category } from './models/Category.js';
import { UserState } from './models/UserState.js';
import { YesNoDialog } from './utils/view/Dialog.js';
import { MainMenu } from './views/MainMenu.js';
import { Concept } from './models/Concept.js';
import { MultipleChoiceQuestion, OpenQuestion } from './models/Question.js'
import { readFileSync, writeFileSync } from 'node:fs';

class ElaboraTest {
    #userState;
    #categories;


    constructor() {
        this.#setUp();
    }

    start() {
        this.#categories = [];
        this.readJSONfile();
        //new Category(name, ancestor, subcategories, concepts)
        do {
            new MainMenu(this.#userState, this.#categories).interact();
        } while (this.#isResumed());
    }

    #isResumed() {
        let yesNoDialog = new YesNoDialog();
        yesNoDialog.read(`¿Desea salvar antes de salir`);
        if (yesNoDialog.isAffirmative()) {
            this.writeJSONfile();
        }
        return yesNoDialog.isAffirmative();
    }

    #setUp() {
        this.#userState = new UserState(0, new Category("---"), new Concept("---"));
    }

    async readJSONfile() {
        try {
            const data = readFileSync('data/database.json', 'utf-8');
            const dataobject = JSON.parse(data);

            let index = 0;
            for (let category of dataobject.categories) {
                this.#categories.push(new Category(category.name, category.ancestor, [], []));
                //Solo 1 nivel de subcategorías. Hacer recursivo...
                let indexSub = 0;
                for (let subcategory of category.subcategories) {
                    this.#categories[index].addSubcategory(new Category(subcategory.name, this.#categories[index], []));
                    
                    let indexCon = 0;
                    for (let concept of subcategory.concepts) {
                        this.#categories[index].getSubcategory(indexSub).addConcept(new Concept(concept.keyword));
                        //Pendiente recuperar respuestas
                        for (let question of concept.questions) {
                            if (question.answerType === "Open")
                                this.#categories[index].getSubcategory(indexSub).getConcept(indexCon).addQuestion(new OpenQuestion(question.statement, question.statementType, concept));
                            else if (question.answerType === "MultipleChoice")
                                this.#categories[index].getSubcategory(indexSub).getConcept(indexCon).addQuestion(new MultipleChoiceQuestion(question.statement, question.statementType, concept));
                        }
                        indexCon++;
                    }
                    indexSub++;
                }
                
                let indexCon = 0;
                for (let concept of category.concepts) {
                    this.#categories[index].addConcept(new Concept(concept.keyword));
                    //Pendiente recuperar respuestas
                    for (let question of concept.questions) {
                        if (question.answerType === "Open")
                            this.#categories[index].getConcept(indexCon).addQuestion(new OpenQuestion(question.statement, question.statementType, concept));
                        else if (question.answerType === "MultipleChoice")
                            this.#categories[index].getConcept(indexCon).addQuestion(new MultipleChoiceQuestion(question.statement, question.statementType, concept));

                    }
                    indexCon++;
                }
                index++;
            }

        } catch (error) {
            console.error('Error al leer el archivo de base de datos:', error);
        }
    }

    async writeJSONfile() {
        try {
            console.log(this.#categories)
            //formatear para json this.#categories;
            //writeFileSync('data/database.json', data);
        } catch (error) {
            console.error('Error al escribir en el archivo de base de datos:', error);
        }
    }
}

new ElaboraTest().start();
