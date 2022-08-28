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
        alert("Its a tie.")
        return
    }
        
    }
    const checkMarker = (player1,player2,winnerMarker) => {
        if(player1.marker == winnerMarker){
            return `${player1.name} wins`
            
        }
        if(player2.marker == winnerMarker){
            return `${player2.name} wins`
        }
    }
    const getBoard = () =>{
        return board
    }
    const restart = () => {
        board =["","","","","","","","",""]
        displayController.clear()
    }
    return{getBoard,makeMove,checkForEnd,restart}
})() 

const playerFactory = (marker) =>{
    this.isTurn = false
    this.name =`Player ${marker}`
    return {marker,isTurn,name}
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
                if(buttons[i].getAttribute("data") === "reset"){
                    gameboard.restart()
                    return
                }
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
    const clear = () =>{
        const buttons = document.querySelectorAll("button")
        for (let i = 0; i < buttons.length; i++) {
            if(buttons[i].getAttribute("data")!== "reset"){
                buttons[i].textContent=""
            }
            
            
        }
    }
    return{createBoardDisplay,moveListener,clear}
})()

displayController.createBoardDisplay()
displayController.moveListener()
