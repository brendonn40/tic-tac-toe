const gameboard = (function(){
    let board =["","","","","","","","",""]
    const makeMove = (player,position) =>{
        if(board[position] == ""){
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
    const buttons = document.querySelectorAll("button")
    const playerx = playerFactory("x")
    let board = gameboard.getBoard()
    const createBoardDisplay = () => {
        for (let index = 0; index < board.length; index++) {
            let play = document.createElement("button")
            play.textContent= board[index]
            play.setAttribute("data",index)
            display.appendChild(play)
        }
    }
    const moveListener = () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click",() => {
                gameboard.makeMove(playerx,buttons[i].getAttribute("data"))
                displayController.createBoardDisplay(gameboard.getBoard())
                
            })
            
        }
    }
    return{createBoardDisplay,moveListener}
})()
brendon = playerFactory("o")
gameboard.makeMove(brendon,8)
gameboard.makeMove(brendon,5)
// console.log(gameboard.getBoard())
displayController.createBoardDisplay()
displayController.moveListener()
