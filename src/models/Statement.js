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

    getOptions() {
        return this._solutions;
    }
}

class DefinitionStatement extends StatementImplementor {

    constructor(concept) {
        super(concept);
        this._statement = `¿Qué es ${concept.getKeyword()}?`;
        this._target = "Definition";
        this._solutions = this._concept.getDefinitions();
    }

    addToConcept(content, isFake) {
        this._concept.addDefinition(content, isFake);
    }

}

class ClassificationStatement extends StatementImplementor {

    constructor(concept) {
        super(concept);
        this._statement = `¿Qué tipos hay de ${concept.getKeyword()}?`;
        this._target = "Classification";
        this._solutions = this._concept.getTypeRelations(this._target);
    }

    addToConcept(content, isFake) {
        this._concept.addRelation(this._target, content, isFake );
    }

}

class CompositionStatement extends StatementImplementor {

    constructor(concept) {
        super(concept);
        this._statement = `¿De qué partes se compone ${concept.getKeyword()}?`;
        this._target = "Composition";
        this._solutions = this._concept.getTypeRelations(this._target);
    }

    addToConcept(content, isFake) {
        this._concept.addRelation(this._target, content, isFake);
    }
}

class withDefinitionStatement extends StatementImplementor {
    _definition;

    constructor(concept, definition) {
        super(concept);
        this._definition = definition;
    }
}

class FakeKeywordStatement extends withDefinitionStatement {

    constructor(concept, definition) {
        super(concept, definition);
        this._statement = `Sinonimos:${this._definition.getContent()}. ¿A que corresponde esta definición?`;
        this._target = "FakeKeywords";
    }

    addToConcept(content) {
        this._concept.addFakeKeyword(content);
    }

    setOptions() {
        this._solutions = this._concept.getFakeKeywords();
    }
}

class JustificationStatement extends withDefinitionStatement {
    constructor(concept, definition) {
        super(concept, definition);
        this._statement = `Justificación: ¿${concept.getKeyword()} ${definition.getContent()}?¿Por qué?`;
        this._target = "Justification";
        // this._solutions = this._concept.getJustifications();
    }

    addToConcept(content) {
        //this._concept.addJustification(content);
    }

}

class withRelationStatement extends StatementImplementor {
    #relations = [];

    constructor(concept) {
        super(concept);
        this.#relations = concept.getRelations();
    }
}

export { DefinitionStatement, ClassificationStatement, CompositionStatement, FakeKeywordStatement, JustificationStatement }