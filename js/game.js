function onRestart(){
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    onInit()
}

//להוסיף הצגת תאים צמודיםv
function showAllZeros(elCell, i, j){
    

    console.log('Get into the showAllZeros')
    console.log('i ', i)
    console.log('j ', j)
    if (i < 0 || i > BEGINNER_TABLE - 1 || j < 0 || j > BEGINNER_TABLE - 1) return; // check for bounds

        var elNextCell1 = document.querySelector(`[data-i="${i+1}"][data-j="${j}"]`)
        var elNextCell2 = document.querySelector(`[data-i="${i-1}"][data-j="${j}"]`)
        var elNextCell3 = document.querySelector(`[data-i="${i}"][data-j="${j-1}"]`)
        var elNextCell4 = document.querySelector(`[data-i="${i}"][data-j="${j+1}"]`)

        if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isShown) {
            console.log('Get into the showAllZeros and IF inside')
            gBoard[i][j].isShown = true;
            elCell.innerText = ' '
            //ShowNegs(i, j, elCell)
            showAllZeros(elNextCell1, (i+1), j );
            showAllZeros(elNextCell2, (i-1), j );
            showAllZeros(elNextCell3, i, (j-1) );
            showAllZeros(elNextCell4, i, (j+1) );
        } else {
               return;
           }
}

function openModal(){
    var elModal = document.querySelector('.modal')
    //var elBtn = document.querySelector('.restart')
    //elBtn.style.display = 'block'
    elModal.innerText = 'Winner! 😍'
    elModal.style.display = 'block'
}

function mouseRemoved(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😮'
}

function mouseReleased(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😁'
}

function movingMouse(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😈'
}

/*function pauseGame(){
    var elBtn = document.querySelector('.onClick')
    elBtn.pointer = 'none'
}*/

