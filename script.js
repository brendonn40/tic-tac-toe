const gameboard = (function(){
    let board =["","","","","","","","",""]
    const makeMove = (player,position) =>{
        if(board[position] == ""){
            board[position] = player.marker
            player.isTurn = false
            return true
        }
        return false
    }

    const getBoard = () =>{
        return board
    }
    return{getBoard,makeMove}
})()

const playerFactory = (marker) =>{
    this.isTurn = null
    return {marker,isTurn}
}

const displayController = (function(){
    const display = document.getElementById("display")
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
        const buttons = document.querySelectorAll("button")
        const playerx = playerFactory("x")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click",function(e){
                e.stopPropagation()
                let position = parseInt(buttons[i].getAttribute("data"))
                let valid =gameboard.makeMove(playerx,position)
                if(valid){
                    buttons[i].textContent=playerx.marker
                }
                
                
            })
            
        }
    }
    return{createBoardDisplay,moveListener}
})()
brendon = playerFactory("o")
// gameboard.makeMove(brendon,8)
// gameboard.makeMove(brendon,5)
// console.log(gameboard.getBoard())
displayController.createBoardDisplay()
displayController.moveListener()
