class Statement {
    #concept;

    constructor(concept) {
        this.#concept = concept;
    }

}

class PrimaryStatement extends Statement {
    #keyword;

    constructor(concept) {
        super(concept);
        this.#keyword = concept.getKeyword();
    }

}

class DefinitionStatement extends PrimaryStatement {
    
}

class withDefinitionStatement extends PrimaryStatement {
    #definitions = [];

    constructor(concept) {
        super(concept);
        this.#definitions = concept.getDefinitions();
    }

}

class withRelationStatement extends PrimaryStatement {
    #relations = [];

    constructor(concept) {
        super(concept);
        this.#relations = concept.getRelations();
    }

}