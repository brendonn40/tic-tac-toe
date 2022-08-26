const gameboard = (function(){
    let board =["x","o","x","x","o","x","x","o","x"]

    const getBoard = () =>{
        return board
    }
    return{getBoard}
})()


const displayController = (function(){
    const display = document.getElementById("display")
    const createBoardDisplay = (board) => {
        for (let index = 0; index < board.length; index++) {
            let play = document.createElement("button")
            display.appendChild(play)
        }
    }
    return{createBoardDisplay}
})()
console.log(gameboard.getBoard())
displayController.createBoardDisplay(gameboard.getBoard())
