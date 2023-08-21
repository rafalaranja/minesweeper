const maxCells = 64;
const maxMines = 10;

let gameOn = false;

let grid = document.getElementById("gameBox");
grid.addEventListener("contextmenu", e => e.preventDefault()); //prevents the context menu from appearing when right clicking



function cellCreator(){
    while(gameOn == false){
        const cellArray = [];
        
        //create the cells without mines
        for (let i = 0; i < (maxCells - maxMines); i++) {
            let cell = document.createElement("button");
            cell.id = i;
            cell.className = "bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = "?";
            cellArray.push(cell);
        }
        //create the cells with mines
        for (let i = 0; i < maxMines; i++) {
            let cell = document.createElement("button");
            cell.id = "MINA";
            cell.className = "bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = "?";
            cellArray.push(cell);
        }
        
        cellArray.sort(() => Math.random() - 0.5);      //randomizes the array
        
        cellArray.forEach(cell => grid.appendChild(cell));  //adds the cells to the grid

        cellRevealer(cellArray);

        gameOn = true;
    }
    return cellArray;
}



function cellRevealer(cellArray){
    cellArray.forEach(cell => cell.addEventListener("click", () => {    //reveals the cell when clicked or endgame if it's a mine
        if (cell.id == "MINA"){
            cell.className = "bg-red-100 hover:bg-red-50 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
            cell.innerHTML = "💥";
            setTimeout(gameOver, 500);      //waits 0.5 seconds before calling the gameOver function
            
        }
        else {
            cell.innerHTML = "R";
            cell.className = "bg-zinc-300 hover:bg-zinc-200 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
        }
    }));
    cellArray.forEach(cell => cell.addEventListener("contextmenu", () => {      //flags the cell when right clicked
        if(cell.innerHTML == "F"){      //if the cell is already flagged, it changes it to a question mark
            cell.innerHTML = "?";
            cell.className = "bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 border border-orange-500 rounded";
        }
        else if(cell.innerHTML == "?"){     //if the cell is a question mark, it changes it to a flag
                cell.innerHTML = "F";
                cell.className = "bg-red-500 hover:bg-red-300 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
        }
        else if(cell.innerHTML == "R"){     //if the cell is revealed, it stays revealed
                cell.innerHTML = "R";
                cell.className = "bg-zinc-300 hover:bg-zinc-200 text-dark font-bold py-2 px-4 border border-orange-500 rounded";
        }
    }));
}



function gameOver(){
    alert("It was a mine! Game Over");
    gameOn = false;
    grid.innerHTML = "";
}
