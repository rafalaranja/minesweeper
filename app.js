let grid = document.getElementById("gameBox");
const maxCells = 64;
let gameOn = false;


// var cell = document.createElement("button");
// cell.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded";
// cell.innerHTML = "BUTTON";
// grid.appendChild(cell);

function cellCreator() {
    while(gameOn == false) {
        for (let i = 0; i < maxCells; i++) {
            let cell = document.createElement("button");
            cell.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded";
            cell.innerHTML = "M";
            grid.appendChild(cell);
        }
    gameOn = true;
    }
}