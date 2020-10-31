class Event {
    constructor() {
        this.listeners = []
    }

    addListeners(listener) {
        this.listeners.push(listener)
    }

    triggerListener(params) {
        this.listeners.forEach(listener => {
            listener(params)
        })
    }
}

class Model {

}

class View {

}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View())