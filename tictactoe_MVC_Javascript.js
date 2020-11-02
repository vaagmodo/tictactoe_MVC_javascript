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
        const gameWinningPossibility = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const gameWon = gameWinningPossibility.some(possibility => this.tictactoeBoard[possibility[0]]
            && this.tictactoeBoard[possibility[0]] === this.tictactoeBoard[possibility[1]]
            && this.tictactoeBoard[possibility[1]] === this.tictactoeBoard[possibility[2]])
        if (gameWon) {
            this.gameWinnerEvent.triggerListener(this.currrentPlayer)
        }
        return gameWon
    }

    gameDraw() {
        const draw = this.tictactoeBoard.every(boardCell => boardCell)
        if (draw) {
            this.gameDrawEvent.triggerListener()
        }
        return draw;
    }

    switchCurrentPlayer() {
        this.currrentPlayer = this.currrentPlayer === 'x' ? 'o' : 'x'
    }
}

class View {
    constructor() {
        this.playEvent = new Event();
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className)
            element.classList.add(className)
        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    gamewinner(winner) {
        this.message.innerHTML = `${winner} won the Game!!`
    }

    gameDraw() {
        this.message.innerHTML = "It's a Draw!!"
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.gameWinnerEvent.addListeners(winner => { this.view.gamewinner(winner); });
        this.model.gameDrawEvent.addListeners(() => { this.view.gameDraw(); });
    }
}

const app = new Controller(new Model(), new View())