import { Definition } from "./Definition.js";

class Concept {
    #keyword;
    #fakeKeywords; //synonyms
    #definitions;
    #relations;


    constructor(keyword) {
        this.#keyword = keyword;
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

    addFakeKeyword(string) {
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

    loadConceptFromDataObject(conceptDataObject) {
        this.#loadDefinitionsFromDataObject(conceptDataObject);
        this.#loadFakeKeywordsFromDataObject(conceptDataObject);
    }

    #loadDefinitionsFromDataObject(conceptDataObject) {
        for (const definitionObject of conceptDataObject.definitions) {
            this.addDefinition(definitionObject.content, definitionObject.isFake, definitionObject.createdDate);
        }
    }

    #loadFakeKeywordsFromDataObject(conceptDataObject) {
        for (const string of conceptDataObject.fakeKeywords) {
            this.addFakeKeyword(string);
        }
    }

    formatConceptObject() {
        const conceptObject = {
            keyword: this.getKeyword(),
            definitions: [],
            fakeKeywords: []
        };
        conceptObject.definitions = this.#formatDefinitionsObjects();
        conceptObject.fakeKeywords = this.#formatFakeKeywordsObject();
        //Pendiente guardar  Relations...

        return conceptObject;
    }

    #formatDefinitionsObjects() {
        const conceptDefinitionsObjects = [];
        for (let definition of this.#definitions) {
            conceptDefinitionsObjects.push(definition.formatDefinitionObject());
        }
        return conceptDefinitionsObjects;
    }

    #formatFakeKeywordsObject() {
        const conceptFakeKeywords = [];
        for (let string of this.#fakeKeywords) {
            conceptFakeKeywords.push(string);
        }
        return conceptFakeKeywords;
    }

}

export { Concept }