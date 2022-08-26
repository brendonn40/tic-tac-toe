const gameboard = (function(){
    let board =["x","o","x","x","o","x","x","o",""]
    const makeMove = (player,position) =>{
        if(board[position] === ""){
            board[position] = player.marker
        }
    }

    const getBoard = () =>{
        return board
    }
    return{getBoard,makeMove}
})()

const playerFactory = (marker) =>{
    return {marker}
}

const displayController = (function(){
    const display = document.getElementById("display")
    const createBoardDisplay = (board) => {
        for (let index = 0; index < board.length; index++) {
            let play = document.createElement("button")
            play.textContent= board[index]
            display.appendChild(play)
        }
    }
    return{createBoardDisplay}
})()
// brendon = playerFactory("o")
// gameboard.makeMove(brendon,8)
console.log(gameboard.getBoard())
displayController.createBoardDisplay(gameboard.getBoard())
