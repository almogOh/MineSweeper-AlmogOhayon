'use strict'

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getTime() {
    return new Date().toString().split(' ')[4];
}


function countMineNegs(cellI, cellJ, mat) {
    var mineNegsCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (i === cellI && j === cellJ) continue
            if (mat[i][j].isMine === true) mineNegsCount++
            //if (mat[i][j]) negsCount++
        }
    }
    return mineNegsCount
}

function ShowNegs(cellI, cellJ, currCell) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (j < 0 || j >= gBoard[i].length) continue
            if(gBoard[i][j].isShown) continue

            if(gBoard[i][j].minesAroundCount !== 0) {
                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.innerText = gBoard[i][j].minesAroundCount
                gBoard[i][j].isShown = true
            }
        }
    }
}


