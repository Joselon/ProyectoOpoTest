class StatementImplementor {
    _concept;
    _solutions;
    _statement;
    _target;

    constructor(concept) {
        this._concept = concept;
    }

    addToConcept() {
        return 1 / 0;
    }

    setOptions() {
        return 1 / 0;
    }

    getStatement() {
        return this._statement;
    }

    getTarget() {
        return this._target;
    }
}

class DefinitionStatement extends StatementImplementor {

    constructor(concept) {
        super(concept);
        this._statement = `¿Qué es ${concept.getKeyword()}?`;
        this._target = "Definition";
    }

    addToConcept(content, isFake) {
        this._concept.addDefinition(content, isFake);
    }

    setOptions() {
        this._solutions = this._concept.getDefinitions();
    }
}

class ClassificationStatement extends StatementImplementor {

    constructor(concept) {
        super(concept);
        this._statement = `¿Qué tipos hay de ${concept.getKeyword()}?`;
        this._target = "Classification";
    }

    addToConcept(content, isFake) {
        this._concept.addRelation(new Relation(content, isFake));
    }

    setOptions() {
        this._solutions = this._concept.getRelations();
    }
}

class CompositionStatement extends StatementImplementor {

    constructor(concept) {
        super(concept);
        this._statement = `¿De qué partes se compone ${concept.getKeyword()}?`;
        this._target = "Composition";
    }

    addToConcept(content, isFake) {
        this._concept.addRelation(new Relation(content, isFake));
    }

    setOptions() {
        this._solutions = this._concept.getRelations();
    }
}

class withDefinitionStatement extends StatementImplementor {
    #definitions = [];

    constructor(concept) {
        super(concept);
        this.#definitions = concept.getDefinitions();
    }
}

class withRelationStatement extends StatementImplementor {
    #relations = [];

    constructor(concept) {
        super(concept);
        this.#relations = concept.getRelations();
    }
}

export { DefinitionStatement, ClassificationStatement, CompositionStatement }