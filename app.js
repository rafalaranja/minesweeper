const maxCells = 64;
const maxMines = 10;

const mine = "MINE bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 border border-orange-500 rounded";

let gameOn = false;

let grid = document.getElementById("gameBox");
grid.addEventListener("contextmenu", e => e.preventDefault()); //prevents the context menu from appearing when right clicking



function cellCreator(){
    while(gameOn == false){
        const cellArray = [];
        
        //create the cells without mines
        for (let i = 0; i < (maxCells - maxMines); i++) {
            let cell = document.createElement("button");
            cell.className = "bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = "?";
            cellArray.push(cell);
        }
        //create the cells with mines
        for (let i = 0; i < maxMines; i++) {
            let cell = document.createElement("button");
            cell.className = mine;
            cell.innerHTML = "?";
            cellArray.push(cell);
        }
        
        cellArray.sort(() => Math.random() - 0.5);      //randomizes the array
        cellArray.forEach(cell => cell.id = cellArray.indexOf(cell));       //gives each cell an id
        cellArray.forEach(cell => grid.appendChild(cell));  //adds the cells to the grid

        cellRevealer(cellArray);

        gameOn = true;
    }
    return cellArray;
}



function cellRevealer(cellArray){
    cellArray.forEach(cell => cell.addEventListener("click", () => {    //reveals the cell when clicked or endgame if it's a mine
        if (cell.className == mine){
            cell.className = "bg-red-100 hover:bg-red-50 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = "💥";
            setTimeout(gameOver, 500);      //waits 0.5 seconds before calling the gameOver function
            
        }
        else {
            //reveal the cell and all the cells around it until it reaches a cell with a mine around it 
            //and shows the number of mines around it
            revealCells(cell);
        }
        
    }));
    cellArray.forEach(cell => cell.addEventListener("contextmenu", () => {      //flags the cell when right clicked
        if(cell.innerHTML == "🚩"){      //if the cell is already flagged, it changes it to a question mark
            cell.innerHTML = "?";
            cell.className = "bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 border border-orange-500 rounded";
        }
        else if(cell.innerHTML == "?"){     //if the cell is a question mark, it changes it to a flag
                cell.innerHTML = "🚩";
                cell.className = "bg-yellow-300 hover:bg-yellow-200 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
        }
        else{     //if the cell is revealed, it stays revealed
                return;
        }
    }));
}



function gameOver(){
    alert("It was a mine! Game Over");
    gameOn = false;
    grid.innerHTML = "";
}

function gameWon(){
    alert("Congratulations! You won!");
    gameOn = false;
    grid.innerHTML = "";
}

function resetGame(){
    if(gameOn == true){
    gameOn = false;
    grid.innerHTML = "";
    cellCreator();
    }
    else{
        return;
    }
}

function revealCells(cell){
    let mineFound = false;

    while(mineFound == false){
        if(cell.className == mine){
            mineFound = true;
        }
        else if(countMinesAround(cell) <= 0){
            cell.className = "bg-gray-300 hover:bg-gray-200 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = countMinesAround(cell);
            cell = document.getElementById(parseInt(cell.id) + 1);
        }
        else{
            cell.className = "bg-gray-300 hover:bg-gray-200 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = countMinesAround(cell);
            mineFound = true;
        }
    }
}

function countMinesAround(cell){
    let mineCount = 0;
    let cellRight = document.getElementById(parseInt(cell.id) + 1);
    let cellLeft = document.getElementById(parseInt(cell.id) - 1);
    let cellUp = document.getElementById(parseInt(cell.id) - 8);
    let cellDown = document.getElementById(parseInt(cell.id) + 8);
    let cellUpRight = document.getElementById(parseInt(cell.id) - 7);
    let cellUpLeft = document.getElementById(parseInt(cell.id) - 9);
    let cellDownRight = document.getElementById(parseInt(cell.id) + 9);
    let cellDownLeft = document.getElementById(parseInt(cell.id) + 7);

    let aroundCells = [cellRight, cellLeft, cellUp, cellDown, cellUpRight, cellUpLeft, cellDownRight, cellDownLeft];

    if(cell.id == 0 || cell.id == 8 || cell.id == 16 || cell.id == 24 || cell.id == 32 || cell.id == 40 || cell.id == 48 || cell.id == 56){
        cellUpLeft = null;
        cellLeft = null;
        cellDownLeft = null;
    }
    else if(cell.id == 7 || cell.id == 15 || cell.id == 23 || cell.id == 31 || cell.id == 39 || cell.id == 47 || cell.id == 55 || cell.id == 63){
        cellUpRight = null;
        cellRight = null;
        cellDownRight = null;
    }
    else if(cell.id == 0 || cell.id == 1 || cell.id == 2 || cell.id == 3 || cell.id == 4 || cell.id == 5 || cell.id == 6 || cell.id == 7){
        cellUp = null;
        cellUpRight = null;
        cellUpLeft = null;
    }
    else if(cell.id == 56 || cell.id == 57 || cell.id == 58 || cell.id == 59 || cell.id == 60 || cell.id == 61 || cell.id == 62 || cell.id == 63){
        cellDown = null;
        cellDownRight = null;
        cellDownLeft = null;
    }
    else{
        aroundCells.forEach(cell => {
            if(cell.className == mine){
                mineCount++;
            }
        });
    }
    //console.log(mineCount);
    return mineCount;
}