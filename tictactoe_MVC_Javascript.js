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

    gameStart(moveIndex) {
        if (this.gameFinished || moveIndex > 8 || moveIndex < 0 || this.tictactoeBoard[moveIndex]) {
            return false;
        }
        this.tictactoeBoard[moveIndex] = this.currrentPlayer;
        this.gameFinished = this.gameWinner() || this.gameDraw()
        if (!this.gameFinished) {
            this.switchCurrentPlayer();
        }
        return true;
    }

    gameWinner() {

    }

    gameDraw() {

    }

    switchCurrentPlayer() {

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