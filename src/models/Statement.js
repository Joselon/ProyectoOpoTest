class StatementImplementor {
    _concept;
    _conceptIndex;
    _solutions;
    _statement;
    _target;

    constructor(concept, conceptIndex) {
        this._concept = concept;
        this._conceptIndex = conceptIndex
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

    getConceptIndex() {
        return this._conceptIndex;
    }
}

class DefinitionStatement extends StatementImplementor {

    constructor(concept, conceptIndex) {
        super(concept, conceptIndex);
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

    constructor(concept, conceptIndex) {
        super(concept, conceptIndex);
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

    constructor(concept, conceptIndex) {
        super(concept, conceptIndex);
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
    _definition;

    constructor(concept, conceptIndex, definition) {
        super(concept, conceptIndex);
        this._definition = definition;
    }
}

class ReverseDefinitionStatement extends withDefinitionStatement {

    constructor(concept, conceptIndex, definition) {
        super(concept, conceptIndex, definition);
        this._statement = `${this._definition.getContent()}. ¿A que corresponde esta definición?`;
        this._target = "FakeKeywords";
    }

    addToConcept(content) {
        this._concept.addFakeKeyword(content);
    }

    setOptions() {
        this._solutions = this._concept.getFakeKeywords();
    }
}

class withRelationStatement extends StatementImplementor {
    #relations = [];

    constructor(concept, conceptIndex) {
        super(concept, conceptIndex);
        this.#relations = concept.getRelations();
    }
}

export { DefinitionStatement, ClassificationStatement, CompositionStatement, ReverseDefinitionStatement }