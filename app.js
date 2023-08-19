const maxCells = 64;

//each value represents the state of a cell
//0 = hidden, 1 = revealed, 2 = flagged
const hidden = 0;
const revealed = 1;
const flagged = 2;

let grid = document.getElementById("gameBox");
let gameOn = false;

class cell {
    constructor(value, hasMine) {
        this.value = value;
        this.hasMine = hasMine;
    }
}

function cellCreator() {
    while(gameOn == false) {
        for (let i = 0; i < maxCells; i++) {
            let cell = document.createElement("button");
            cell.className = "bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = "M";
            grid.appendChild(cell);
        }
    gameOn = true;
    }
}