import { Definition } from "./Definition.js";
import { Relation } from "./Relation.js";

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
    setKeyword(keyword) {
        this.#keyword = keyword;
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

    addRelation(type, content, isFake, date = new Date()) {
        this.#relations.push(new Relation(type,content,isFake,date));
    }

    getNumberOfDefinitions() {
        return this.#definitions.length;
    }

    getNumberOfRelations() {
        return this.#relations.length;
    }

    loadConceptFromDataObject(conceptDataObject) {
        this.#loadDefinitionsFromDataObject(conceptDataObject);
        this.#loadRelationsFromDataObject(conceptDataObject);
        this.#loadFakeKeywordsFromDataObject(conceptDataObject);
    }

    #loadDefinitionsFromDataObject(conceptDataObject) {
        for (const definitionObject of conceptDataObject.definitions) {
            this.addDefinition(definitionObject.content, definitionObject.isFake, definitionObject.createdDate);
        }
    }

    #loadRelationsFromDataObject(conceptDataObject) {
        for (const relationObject of conceptDataObject.relations) {
            this.addRelation(relationObject.type, relationObject.content, relationObject.isFake, relationObject.createdDate);
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
            relations: [],
            fakeKeywords: []
        };
        conceptObject.definitions = this.#formatDefinitionsObjects();
        conceptObject.relations = this.#formatRelationsObjects();
        conceptObject.fakeKeywords = this.#formatFakeKeywordsObject();

        return conceptObject;
    }

    #formatDefinitionsObjects() {
        const conceptDefinitionsObjects = [];
        for (let definition of this.#definitions) {
            conceptDefinitionsObjects.push(definition.formatDefinitionObject());
        }
        return conceptDefinitionsObjects;
    }

    #formatRelationsObjects() {
        const conceptRelationsObjects = [];
        for (let relation of this.#relations) {
            conceptRelationsObjects.push(relation.formatRelationObject());
        }
        return conceptRelationsObjects;
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