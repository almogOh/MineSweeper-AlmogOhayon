'use strict'

const BEGINNER_TABLE = 4
const BEGINNER_MINE = 2
const MINE = '💣'

// The Model
var gBoard
var gGameInterval
var gLife = 3


function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    var elLife = document.querySelector('.life')
    elLife.innerText = '❤❤❤'
    
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
    for (var i = 0; i < BEGINNER_TABLE; i++) {
        board[i] = [];
        for (var j = 0; j < BEGINNER_TABLE; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };
        }
    }

    var randNotDoubled = [-1,-1]
    
    for (var i = 0; i < BEGINNER_MINE; i++) {

        var rndI = getRandomInclusive(0, BEGINNER_TABLE - 1)
        var rndJ = getRandomInclusive(0, BEGINNER_TABLE - 1)

        if(randNotDoubled[0] === rndI && randNotDoubled[1] === rndJ) { //There were some cases that the random i & j are the same so the "if" was created for prevention
            i = 0
            continue
        }
        if(i === 0) randNotDoubled[0] = rndI
        if(i === 0) randNotDoubled[1] = rndJ

        board[rndI][rndJ].innerText = MINE //רק עוזר לי לעקוב, אפשר למחוק אחכ
        board[rndI][rndJ].isMine = true
    }

    setMinesNegsCount(board)
    //console.log('setMinesNegsCount ',board)

    console.log('board', board)
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
            onclick="onCellClicked(this,${i},${j})">(${i},${j})</td>`
        }
        strHTML += '</tr>\n'
    }
    console.log(strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(board){
    for (var i = 0; i < BEGINNER_TABLE; i++) {
        for (var j = 0; j < BEGINNER_TABLE; j++) {
            board[i][j].minesAroundCount = countMineNegs(i, j, board) // countMineNegs > util.js
        }
    }
}

function onCellClicked(elCell, i, j){  

    //console.log('gBoard ',gBoard)
    //console.log('elCell ',elCell)

    var elLife = document.querySelector('.life')
    
    if(gBoard[i][j].isMine){
        elCell.innerText = MINE
        gBoard[i][j].isShown = true

        var elBtn = document.querySelector('.restart')
        elBtn.innerText = '😫'
        
        gLife--
        switch (gLife) {
            case 0:
                elLife.innerText = 'Game Over';
                pauseGame()
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
            console.log('Get into the if')
            showAllZeros(elCell, i, j)

        }else {
            elCell.innerText = gBoard[i][j].minesAroundCount
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
    elCell.innerText = '🚩'
    gBoard[i][j].isMarked = true
    checkGameOver()   
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




