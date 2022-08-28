const gameboard = (function(){
    let board =["","","","","","","","",""]
    const makeMove = (player1,player2,position) =>{
        if(board[position] == ""){
            if(player1.isTurn){
                board[position] = player1.marker
                player1.isTurn = false
                player2.isTurn = true
                return true
            }
            if(player2.isTurn){
                board[position] = player2.marker
                player2.isTurn = false
                player1.isTurn = true
                return true
            }
            return true
        }
        return false
    }
    const checkForEnd = (player1,player2) => {
        for (let i = 0; i < 3; i++) {
            let aux = i * 3
           if(board[aux] !== "" && board[aux] === board[aux+1] && board[aux+1] === board[aux+2]){
                alert(checkMarker(player1,player2,board[aux]))
                return
            //we have a winner in the rows
           }
           if(board[i] !== "" && board[i] === board[i+3] && board[i+3] === board[i+6]){
            alert(checkMarker(player1,player2,board[i]))
            return  
            //we have a winner in the columns
           }
        }
        if(board[0] !== "" && board[0] === board[4]&& board[4] === board[8]){
            alert(checkMarker(player1,player2,board[0]))
            return
            // we have a winner on the diagonal
        }
        else if(board[2] !== "" && board[2] === board[4] && board[4] === board[6]){
            alert(checkMarker(player1,player2,board[2]))
            return
        }
    if(!board.includes("")){
        alert("Its a draw.")
        return
    }
        
    }
    const checkMarker = (player1,player2,winnerMarker) => {
        if(player1.marker == winnerMarker){
            return `Player with the ${player1.marker} marker wins`
            
        }
        if(player2.marker == winnerMarker){
            return `Player with the ${player2.marker} marker wins`
        }
    }
    const getBoard = () =>{
        return board
    }
    return{getBoard,makeMove,checkForEnd}
})() 

const playerFactory = (marker) =>{
    this.isTurn = false
    return {marker,isTurn}
}

const displayController = (function(){
    const display = document.getElementById("display")
    let board = gameboard.getBoard()
    const playerx = playerFactory("x")
    const playero = playerFactory("o")
    playerx.isTurn = true
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
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click",function(e){
                e.stopPropagation()
                let position = parseInt(buttons[i].getAttribute("data"))
                if(playerx.isTurn){
                    let valid =gameboard.makeMove(playerx,playero,position)
                    if(valid){
                        buttons[i].textContent=playerx.marker
                        gameboard.checkForEnd(playerx,playero)
                    }
                }
                if(playero.isTurn){
                    let valid =gameboard.makeMove(playero,playerx,position)
                    if(valid){
                        buttons[i].textContent=playero.marker
                        gameboard.checkForEnd(playerx,playero)
                    }
                }
            
            })
            
        }
    }
    return{createBoardDisplay,moveListener}
})()

displayController.createBoardDisplay()
displayController.moveListener()
