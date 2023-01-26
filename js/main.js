'use strict'

const FLAG = '🚩'
const MINE = '💣'

// The Model
var gBoard

var gLevel = {SIZE: 4, MINES: 2, FLAGS: 2}
var gLife = 3
var gIsHint = false
var gStartTime = new Date().getTime()
var gStartClicking = 0

function onInit() {
    console.log(gLevel.FLAGS)
    gBoard = buildBoard()
    renderBoard(gBoard)
    gLife = 3
    var elLife = document.querySelector('.life')
    elLife.innerText = '❤❤❤'
    gStartTime = new Date().getTime()
    updateFlags()
    showHints()
    
    
    //console.log('setMinesNegsCount ',gBoard)
}

function buildBoard() {
    /*var board = []
    for (var i = 0; i < BEGINNER_TABLE; i++) {
        board.push([])
        for (var j = 0; j < BEGINNER_TABLE; j++) {
            board[i][j] = (Math.random() > 0.5) ? MINE : ''
        }
    }
    return board*/
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };
        }
    }

    var randNotDoubled = [{i: -1, j:-1}]
    
    check: for (var i = 0; i < gLevel.MINES; i++) {

        var rndI = getRandomInclusive(0, gLevel.SIZE - 1)
        var rndJ = getRandomInclusive(0, gLevel.SIZE - 1)

        for (var j = 0; j < randNotDoubled.length; j++) { //There were some cases that the random i & j are the same so this for loop was created for prevention
            if(randNotDoubled[j].i === rndI && randNotDoubled[j].j === rndJ){
                i--
                continue check;
            }
            
        }

        randNotDoubled[i] = {i: rndI, j: rndJ};

        board[rndI][rndJ].innerText = MINE //רק עוזר לי לעקוב, אפשר למחוק אחכ
        board[rndI][rndJ].isMine = true
    }

    setMinesNegsCount(board)

    console.log('board', board) //רק עוזר לי לעקוב, אפשר למחוק אחכ
    return board;
}


function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var className = (currCell) ? 'occupied' : ''
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}" oncontextmenu="onCellMarked(this,${i},${j})" onmousedown="mouseRemoved()" onmouseup="mouseReleased()"
            onclick="onCellClicked(this,${i},${j})"></td>`
        }
        strHTML += '</tr>\n'
    }
    console.log(strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(board){
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j].minesAroundCount = countMineNegs(i, j, board) // countMineNegs > util.js
        }
    }
}

function onCellClicked(elCell, i, j){  

    if(!gStartClicking){
        timer()
    }
    gStartClicking++

    if(gIsHint && !gBoard[i][j].isShown){
        showNegs(elCell, i, j)
        gIsHint = false
        return
    }

    if(gBoard[i][j].isShown) return

    //console.log('gBoard ',gBoard)
    //console.log('elCell ',elCell)

    if(gBoard[i][j].isMarked){
        gLevel.FLAGS++
        gBoard[i][j].isMarked = false
        updateFlags()
    }


    var elLife = document.querySelector('.life')
    
    if(gBoard[i][j].isMine){
        
        elCell.innerText = MINE
        elCell.style.background = '#D0C9C0'
        gBoard[i][j].isShown = true
        
        mineMouse()
        
        gLife--

        switch (gLife) {
            case 0:
                elLife.innerText = 'Game Over';
                showAllMines()
                //pauseGame()
                //gameOver();
                break;
            case 1:
                elLife.innerText = '❤';
                break;
            case 2:
                elLife.innerText = '❤❤';
                break;
        }
    }else if(gBoard[i][j].minesAroundCount === 0){
            showAllZeros(elCell, i, j)

        }else {
            elCell.innerText = gBoard[i][j].minesAroundCount
            elCell.style.background = '#D0C9C0'
            gBoard[i][j].isShown = true
        }
    

    console.log(gBoard)

    checkGameOver()

}

/*
gBoard[i][j].mousedown(function(ev){
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    if(ev.which == 3)
    {
        onCellMarked(elCell)
    }
});

function onCellMarked(elCell){
    elCell.innerText = '🚩'
}

window.oncontextmenu = function () {
    alert('Right Click')
  }*/


function onCellMarked(elCell, i, j){
    if(gBoard[i][j].isShown && !gBoard[i][j].isMine) return

    if(gLevel.FLAGS){
        elCell.innerText = FLAG

        gLevel.FLAGS--
        gBoard[i][j].isMarked = true
        updateFlags()
        
        checkGameOver()
    } 
}

function checkGameOver(){

    console.log('get into checkGameOver()')

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            if(!gBoard[i][j].isMine && !gBoard[i][j].isShown) return false
        
            if(gBoard[i][j].isMine && !gBoard[i][j].isMarked) return false
            
        }
    }
    
    openModal()
    return true
}




