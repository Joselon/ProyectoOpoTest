class StatementImplementor {

    addToConcept() { }
    getTarget() { }
    getStatement() { }
}

class DefinitionStatement extends StatementImplementor {
    #concept;
    #statement;
    #target;

    constructor(concept) {
        super();
        this.#concept = concept;
        this.#statement = `¿Qué es ${concept.getKeyword()}`;
        this.#target = "Definition";
    }

    addToConcept(content, isFake) {
        this.#concept.addDefinition(content, isFake);
    }
    getStatement() {
        return this.#statement;
    }
    getTarget() {
        return this.#target;
    }

}

class ClassificationStatement extends StatementImplementor {
    #concept;
    #statement;
    #target;

    constructor(concept) {
        super();
        this.#concept = concept;
        this.#statement = `¿Qué tipos hay de ${concept.getKeyword()}`;
        this.#target = "Classification";
    }

    addToConcept(content, isFake) {
        this.#concept.addRelation(new Relation(content, isFake));
    }
    getTarget() {
        return this.#target;
    }
    getStatement() {
        return this.#statement;
    }
}

class CompositionStatement extends StatementImplementor {
    #concept;
    #statement;
    #target;

    constructor(concept) {
        super();
        this.#concept = concept;
        this.#statement = `¿Qué tipos hay de ${concept.getKeyword()}`;
        this.#target = "Composition";
    }

    addToConcept(content, isFake) {
        this.#concept.addRelation(new Relation(content, isFake));
    }
    getTarget() {
        return this.#target;
    }
    getStatement() {
        return this.#statement;
    }

}

class withDefinitionStatement extends StatementImplementor {
    #definitions = [];

    constructor(concept) {
        super();
        this.#definitions = concept.getDefinitions();
    }
    
}

class withRelationStatement extends StatementImplementor {
    #relations = [];

    constructor(concept) {
        super();
        this.#relations = concept.getRelations();
    }
}

export { DefinitionStatement, ClassificationStatement, CompositionStatement }