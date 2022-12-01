let okStopPlaying;

let playCells = Array(11).fill(0).map(() => Array(11).fill(0));

function startGame() {
    let bombCounter = 0;
    okStopPlaying = 0;
    for (let i = 1; i <= 9; ++i) {
        document.getElementById(i).innerHTML = "";
        for (let j = 1; j <= 9; ++j) {
            playCells[i][j] = 0;
        }
    }
    document.getElementById("YouLostMessage").innerHTML = "";
    document.getElementById("startGame").innerHTML = "Restart";
    for (let i = 1; i <= 9; ++i) {
        for (let j = 1; j <= 9; ++j) {
            const playingCells = document.createElement("img");
            Object.assign(playingCells, {
                id : i * 10 + j,
                src :  'unused_cell.png',
                onclick: () => clickAction(i * 10 + j),
            })
            playingCells.addEventListener("contextmenu", e => {
                let value = new getID(e.target.id);
                if (Number.isInteger(playCells[value.row][value.column]) && playCells[value.row][value.column] != 10 && okStopPlaying == 0) {
                    playCells[value.row][value.column] += 0.1;
                    document.getElementById(e.target.id).src = 'flagged_unused_cell.png';
                } else if (playCells[value.row][value.column] != 10){
                    playCells[value.row][value.column] -= 0.1;
                    document.getElementById(e.target.id).src = 'unused_cell.png';
                }
            })
            document.getElementById(i).appendChild(playingCells);
        }
    }
    while (bombCounter < 8) {
        let row = Math.floor(Math.random() * 9) + 1;
        let column = Math.floor(Math.random() * 9) + 1;
        if (playCells[row][column] == 0) {
            playCells[row][column] -= 1;
            ++bombCounter;
        }
    }
    for (let i = 1; i <= 9; ++i) {
        for (let j = 1; j <= 9; ++j) {
            if (playCells[i][j] == -1) {
                try {
                    if (playCells[i - 1][j - 1] != -1) {
                        ++playCells[i- 1][j - 1];
                    }
                } catch(e) {}
                 try {
                    if (playCells[i - 1][j] != -1) {
                        ++playCells[i - 1][j];
                    }
                } catch(e) {}
                try {
                    if (playCells[i - 1][j + 1] != -1) {
                        ++playCells[i - 1][j + 1];
                    }
                } catch(e) {}
                try {
                    if (playCells[i][j + 1] != -1) {
                        ++playCells[i][j + 1];
                    }
                } catch(e) {}
                try {
                    if (playCells[i + 1][j + 1] != -1) {
                        ++playCells[i + 1][j + 1];
                    }
                } catch(e) {}
                try {
                    if (playCells[i + 1][j] != -1) {
                        ++playCells[i + 1][j];
                    }
                } catch(e) {}
                try {
                    if (playCells[i + 1][j - 1] != - 1) {
                        ++playCells[i + 1][j - 1];
                    }
                } catch(e) {}
                try {
                    if (playCells[i][j - 1] != -1) {    
                        ++playCells[i][j - 1];
                    }
                } catch(e) {}
            }
        }
    }
}

function clickAction(id) {
    let row =  Math.floor(id / 10);
    let column =  id % 10;
    
    if(playCells[row][column] == -1 && okStopPlaying == 0) {
        okStopPlaying = 1;
        document.getElementById(id).src = 'bomb_cell.png';
        document.getElementById("YouLostMessage").innerHTML = "You Lost";
    }
    for (let i = 1; i <= 8; ++i) {
        if(playCells[row][column] == i && okStopPlaying == 0) {
            playCells[row][column] = 10;
            document.getElementById(id).src = 'used_cell_' + i + '.png'; 
        }
    }

    if(playCells[row][column] == 0 && okStopPlaying == 0) {
        document.getElementById(id).src = 'used_cell.png';
        let rightY = column;
        let leftY = column;

        while (rightY <= 9 && playCells[row][rightY] == 0) {
            document.getElementById(row * 10 + rightY).src = 'used_cell.png';
            try {
                if (playCells[row][rightY + 1] != 0) {
                    imageChange(row,rightY + 1);
                }
            }catch(e){}

            let upX = row;
            let downX = row;
            while (upX >= 1 && playCells[upX][rightY] == 0){
                document.getElementById(upX * 10 + rightY).src = 'used_cell.png';
                try {
                    if (playCells[upX - 1][rightY] != 0) {
                        imageChange(upX - 1,rightY);
                    }
                }catch(e) {}

                let upRightY = rightY;
                while (upRightY <= 9 && playCells[upX][upRightY] == 0) {
                    document.getElementById(upX * 10 + upRightY).src = 'used_cell.png';
                    try {
                        if (playCells[upX][upRightY + 1] != 0) {
                            imageChange(upX, upRightY + 1);
                        }
                    }catch(e) {}
                    ++upRightY;
                }
                let upLeftY = leftY;
                while (upLeftY >= 1 && playCells[upX][upLeftY] == 0) {
                    document.getElementById(upX * 10 + upLeftY).src = 'used_cell.png';
                    try {
                        if (playCells[upX][upLeftY - 1] != 0) {
                            imageChange(upX, upLeftY - 1);
                        }
                    }catch(e) {}
                    --upLeftY;
                }
                --upX;
            }

            while (downX <= 9 && playCells[downX][rightY] == 0){
                document.getElementById(downX * 10 + rightY).src = 'used_cell.png';
                try{
                    if (playCells[downX + 1][rightY] != 0) {
                        imageChange(downX + 1,rightY);
                    }
                }catch(e) {}

                let downRightY = rightY;
                while (downRightY <= 9 && playCells[downX][downRightY] == 0) {
                    document.getElementById(downX * 10 + downRightY).src = 'used_cell.png';
                    try {
                        if (playCells[downX][downRightY + 1] != 0) {
                            imageChange(downX, downRightY + 1);
                        }
                    }catch(e) {}
                    ++downRightY;
                }
                let downLeftY = leftY;
                while (downLeftY >= 1 && playCells[downX][downLeftY] == 0) {
                    document.getElementById(downX * 10 + downLeftY).src = 'used_cell.png';
                    try {
                        if (playCells[downX][downLeftY - 1] != 0) {
                            imageChange(downX, downLeftY - 1);
                        }
                    }catch(e) {}
                    --downLeftY;
                }
                ++downX;
            }
            ++rightY;
        } 

        while (leftY >= 1 && playCells[row][leftY] == 0) {
            document.getElementById(row * 10 + leftY).src = 'used_cell.png'
            try{
                if (playCells[row][leftY - 1] != 0) {
                    imageChange(row,leftY - 1);
                }
            }catch(e) {}
            let upX = row;
            let downX = row;
            while (upX >= 1 && playCells[upX][leftY] == 0){
                document.getElementById(upX * 10 + leftY).src = 'used_cell.png';
                try {
                    if (playCells[upX - 1][leftY] != 0) {
                        imageChange(upX - 1,leftY);
                    }
                }catch(e) {}
                --upX;
            }
            while (downX <= 9 && playCells[downX][leftY] == 0){
                document.getElementById(downX * 10 + leftY).src = 'used_cell.png';
                try {
                    if (playCells[downX + 1][leftY] != 0) {
                        imageChange(downX + 1,leftY);
                    }
                }catch(e) {}
                ++downX;
            }
            --leftY;
        }
    }
}

function imageChange(x, y) {
    for (let i = 1; i <= 8 ; ++i) {
        if (playCells[x][y] == i) {
            document.getElementById(x * 10 + y).src = 'used_cell_' + i + '.png';
        }
    }
}

class getID {
    constructor(id) {
        this.row = Math.floor(id / 10);
        this.column = id % 10;
    }
}
