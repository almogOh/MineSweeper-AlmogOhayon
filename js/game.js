function onRestart(){
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    gStartClicking = 0

    if(gLevel.SIZE === 4){
        changeLevel('easy')
    }else if(gLevel.SIZE === 8){
        changeLevel('medium')
    }else changeLevel('hard')

}

//להוסיף הצגת תאים צמודיםv
function showAllZeros(elCell, i, j){
    

    console.log('Get into the showAllZeros')
    //console.log('i ', i)
    //console.log('j ', j)
    if (i < 0 || i > gLevel.SIZE - 1 || j < 0 || j > gLevel.SIZE - 1) return; // check for bounds

        var elNextCell1 = document.querySelector(`[data-i="${i+1}"][data-j="${j}"]`)
        var elNextCell2 = document.querySelector(`[data-i="${i-1}"][data-j="${j}"]`)
        var elNextCell3 = document.querySelector(`[data-i="${i}"][data-j="${j-1}"]`)
        var elNextCell4 = document.querySelector(`[data-i="${i}"][data-j="${j+1}"]`)

        if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isShown) {
            if(gBoard[i][j].isMarked){
                gLevel.FLAGS++
                updateFlags()
            }
            gBoard[i][j].isShown = true;
            elCell.innerText = ' '
            elCell.style.background = '#D0C9C0'
            expandShown(i, j, elCell)
            showAllZeros(elNextCell1, (i+1), j );
            showAllZeros(elNextCell2, (i-1), j );
            showAllZeros(elNextCell3, i, (j-1) );
            showAllZeros(elNextCell4, i, (j+1) );
        } else {
               return;
           }
}

function changeLevel(str){

    switch(str) {
        case 'easy':
            gLevel.SIZE = 4
            gLevel.MINES = 2
            gLevel.FLAGS = 2
            updateFlags()
            mouseReleased()
            document.documentElement.style.setProperty('--table-width', '200px');
            onInit()
          break;
        case 'medium':
            gLevel.SIZE = 8
            gLevel.MINES = 14
            gLevel.FLAGS = 14
            updateFlags()
            mouseReleased()
            document.documentElement.style.setProperty('--table-width', '400px');
            onInit()
          break;
        case 'hard':
            gLevel.SIZE = 12
            gLevel.MINES = 32
            gLevel.FLAGS = 32
            updateFlags()
            mouseReleased()
            //$(':root').css('--table-width', '595px');
            document.documentElement.style.setProperty('--table-width', '700px');
            onInit()
          break;
        //default: The default is easy by the gVars statement
      }
}

function showAllMines(){
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {

            if(gBoard[i][j].isMine) {

                var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.innerText = MINE
                elCell.style.background = 'red'

            }
        }
    }

}

function openModal(){
    var elModal = document.querySelector('.modal')
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

function mineMouse(){
    var elBtn = document.querySelector('.restart')
    elBtn.innerText = '😫'
}

/*function pauseGame(){
    var elBtn = document.querySelector('.onClick')
    elBtn.pointer = 'none'
}*/

function updateFlags(){
    var elFlag = document.querySelector('h4')
    elFlag.innerText = gLevel.FLAGS + ' ' + FLAG
}

function hint(numOfHint){
    
    switch(numOfHint) {
        case '1':
            var elHint1 = document.querySelector('.hint1')
            if(elHint1.innerText === '✖') return
            elHint1.innerText = '✖'
            gIsHint = true
          break;
        case '2':
            var elHint2 = document.querySelector('.hint2')
            if(elHint2.innerText === '✖') return
            elHint2.innerText = '✖'
            gIsHint = true
          break;
        case '3':
            var elHint3 = document.querySelector('.hint3')
            if(elHint3.innerText === '✖') return
            elHint3.innerText = '✖'
            gIsHint = true
          break;
      }
}

function timer() {

    var x = setInterval(()=> {

        // Get todays date and time
        var now = new Date().getTime();
    
        // Find the distance between now an the count down date
        var distance = now - gStartTime
    
        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        var elTime = document.querySelector('.time')
        elTime.innerText = `${hours}:${minutes}:${seconds}`

    }, 1000);

    /*
    var Interval = setInterval(function () { 
        var timer = new Date().getTime() - gStartTime

        var elTime = document.querySelector('.time')

        elTime.innerText = `Timer: ${Math.floor(timer/60000)}:${Math.floor(timer/1000)} `
    }, 10)*/
}




