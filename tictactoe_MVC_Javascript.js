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
    constructor() {
        this.tictactoeBoard = Array(9).fill();
        this.currrentPlayer = 'x';
        this.gameFinished = false;

        this.gameRestartEvent = new Event();
        this.cellUpdateEvent = new Event();
        this.gameWinnerEvent = new Event();
        this.gameDrawEvent = new Event();
    }


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