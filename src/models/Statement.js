class StatementImplementor {
    #concept;

    constructor(concept) {
        this.#concept = concept;
    }

}

class PrimaryStatement extends StatementImplementor {
    #keyword;

    constructor(concept) {
        super(concept);
        this.#keyword = concept.getKeyword();
    }

}

class DefinitionStatement extends PrimaryStatement {
    #statement;
    #target;

    constructor(concept){
        super();
        this.#statement = `¿Qué es ${concept.getKeyword()}`;
        this.#target = "Definition";
    }
    
}

class ClassificationStatement extends PrimaryStatement {
    #statement;
    #target;

    constructor(concept){
        super();
        this.#statement = `¿Qué tipos hay de ${concept.getKeyword()}`;
        this.#target = "Relation"+"Classification";
    }
    
}

class CompositionStatement extends PrimaryStatement {
    #statement;
    #target;

    constructor(concept){
        super();
        this.#statement = `¿Qué tipos hay de ${concept.getKeyword()}`;
        this.#target = "Relation"+"Composition";
    }
    
}

class withDefinitionStatement extends Statement {
    #definitions = [];

    constructor(concept) {
        super(concept);
        this.#definitions = concept.getDefinitions();
    }

}

class withRelationStatement extends sStatement {
    #relations = [];

    constructor(concept) {
        super(concept);
        this.#relations = concept.getRelations();
    }

}