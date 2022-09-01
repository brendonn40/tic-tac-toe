const gameboard = (function(){
    let board =["","","","","","","","",""]
    const makeMove = (player1,player2,position) =>{
        if(board[position] == ""){
            if(player1.isTurn){
                board[position] = player1.marker
                player1.isTurn = !player1.isTurn
                player2.isTurn = !player2.isTurn
                return true
            }
            if(player2.isTurn){
                board[position] = player2.marker
                player2.isTurn = !player2.isTurn
                player1.isTurn = !player1.isTurn
                return true
            }
        }
        return false
    }
    const checkForEnd = (player1,player2) => {
        for (let i = 0; i < 3; i++) {
            let aux = i * 3
           if(board[aux] !== "" && board[aux] === board[aux+1] && board[aux+1] === board[aux+2]){
                alert(checkMarker(player1,player2,board[aux]))
                return true
            //we have a winner in the rows
           }
           if(board[i] !== "" && board[i] === board[i+3] && board[i+3] === board[i+6]){
            alert(checkMarker(player1,player2,board[i]))
            return true
            //we have a winner in the columns
           }
        }
        if(board[0] !== "" && board[0] === board[4]&& board[4] === board[8]){
            alert(checkMarker(player1,player2,board[0]))
            return true
            // we have a winner on the diagonal
        }
        else if(board[2] !== "" && board[2] === board[4] && board[4] === board[6]){
            alert(checkMarker(player1,player2,board[2]))
            return true
        }
    if(!board.includes("")){
        alert("Its a tie.")
        return true
    }
     return false   
    }
    const checkMarker = (player1,player2,winnerMarker) => {
        if(player1.marker == winnerMarker){
            player1.isTurn = false
            player2.isTurn = false
            return `${player1.name} wins`
            
        }
        if(player2.marker == winnerMarker){
            player1.isTurn = false
            player2.isTurn = false
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
    const computerMove = (pc,player) => {
        ocupados =[]
        possiveis = [0,1,2,3,4,5,6,7,8]
        for (let i = 0; i < board.length; i++) {
            if(board[i] !== ""){
                ocupados.push(i)
            }   
        }
        for (let i = 0; i < possiveis.length; i++) {
            for (let j = 0; j < ocupados.length; j++) {
                if(possiveis[i] === ocupados[j]){
                    possiveis.splice(i,1)
                }
                
            }   
        }
        let pcChoice = randomItem(possiveis)
        
        gameboard.makeMove(pc,player,pcChoice)
        data = `[data="${pcChoice}"]`
        const buttonElement = document.querySelector(data)
        buttonElement.textContent = pc.marker
        checkForEnd(pc,player)

    }
    function randomItem(items){
    return items[Math.floor(Math.random()*items.length)];    
}
    return{getBoard,makeMove,checkForEnd,restart,computerMove}
})() 

const playerFactory = (marker) =>{
    this.isTurn = false
    this.name =`Player ${marker}`
    this.pc = false
    return {marker,isTurn,name,pc}
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
                    playerx.isTurn = true
                    playero.isTurn = false
                    return
                }
                if(buttons[i].getAttribute("data") === "name"){
                    changeNames()
                    return
                }
                if(buttons[i].getAttribute("data") === "pc"){
                    playero.pc = !playero.pc
                    return
                }
                let position = parseInt(buttons[i].getAttribute("data"))
                if(playerx.isTurn){
                    let valid =gameboard.makeMove(playerx,playero,position)
                    if(valid){
                        buttons[i].textContent=playerx.marker
                        let end = gameboard.checkForEnd(playerx,playero)
                        if(!end){
                            if(playero.pc){
                                gameboard.computerMove(playero,playerx)
                            }
                        }
                    }
                }
                if(playero.pc === false){
                    if(playero.isTurn){
                        let valid =gameboard.makeMove(playero,playerx,position)
                        if(valid){
                            buttons[i].textContent=playero.marker
                            gameboard.checkForEnd(playerx,playero)
                        }
                        }
                }
                
                

            })
            
        }
    }
    const clear = () =>{
        const buttons = document.querySelectorAll("button")
        for (let i = 0; i < buttons.length; i++) {
            if(buttons[i].getAttribute("data")!== "reset" && buttons[i].getAttribute("data")!== "name" && buttons[i].getAttribute("data")!== "pc"){
                buttons[i].textContent=""
            }
            
            
        }
    }
    const changeNames = () => {
        playerx.name = prompt("Player name (X marker):")
        playero.name = prompt("Player name (O marker):")
    }

    return{createBoardDisplay,moveListener,clear,changeNames}
})()

displayController.createBoardDisplay()
displayController.moveListener()
