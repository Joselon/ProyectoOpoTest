export const UpdateAtModelChangedMixin = (superclass) =>
    class extends superclass {
        constructor() {
            super();
            document.addEventListener('model-changed', this.stateUpdate.bind(this));
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            document.removeEventListener('model-changed', this.stateUpdate.bind(this));
        }
        stateUpdate(e) {
            this.requestUpdate();
        }
    }