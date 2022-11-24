let okStopPlaying;

let playCells = new Array(9);
for (let i = 1; i <= 9; ++i){
    playCells[i] = new Array(9);
}

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
                let aux = e.target.id;
                let X =  Math.floor(aux / 10);
                let Y =  aux % 10;
                if (Number.isInteger(playCells[X][Y]) && playCells[X][Y] != 10 && okStopPlaying == 0) {
                    playCells[X][Y] += 0.1;
                    document.getElementById(aux).src = 'flagged_unused_cell.png';
                } else if (playCells[X][Y] != 10){
                    playCells[X][Y] -= 0.1;
                    document.getElementById(aux).src = 'unused_cell.png';
                }
            })
            document.getElementById(i).appendChild(playingCells);
        }
    }
    while (bombCounter < 8) {
        let X = Math.floor(Math.random() * 9) + 1;
        let Y = Math.floor(Math.random() * 9) + 1;
        if (playCells[X][Y] == 0) {
            playCells[X][Y] -= 1;
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
    let X =  Math.floor(id / 10);
    let Y =  id % 10;
    
    if(playCells[X][Y] == -1 && okStopPlaying == 0) {
        okStopPlaying = 1;
        document.getElementById(id).src = 'bomb_cell.png';
        document.getElementById("YouLostMessage").innerHTML = "You Lost";
    }
    if(playCells[X][Y] == 1 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_1.png';
    }
    if(playCells[X][Y] == 2 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_2.png';
    }
    if(playCells[X][Y] == 3 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_3.png';
    }
    if(playCells[X][Y] == 4 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_4.png';
    }
    if(playCells[X][Y] == 5 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_5.png';
    }
    if(playCells[X][Y] == 6 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_6.png';
    }
    if(playCells[X][Y] == 7 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_7.png';
    }
    if(playCells[X][Y] == 8 && okStopPlaying == 0) {
        playCells[X][Y] = 10;
        document.getElementById(id).src = 'used_cell_8.png';
    }

    
    if(playCells[X][Y] == 0 && okStopPlaying == 0) {
        document.getElementById(id).src = 'used_cell.png';
        let rightY = Y;
        let leftY = Y;

        while (rightY <= 9 && playCells[X][rightY] == 0) {
            document.getElementById(X * 10 + rightY).src = 'used_cell.png';
            try {
                if (playCells[X][rightY + 1] != 0) {
                    imageChange(X,rightY + 1);
                }
            }catch(e){}

            let upX = X;
            let downX = X;
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

        while (leftY >= 1 && playCells[X][leftY] == 0) {
            document.getElementById(X * 10 + leftY).src = 'used_cell.png'
            try{
                if (playCells[X][leftY - 1] != 0) {
                    imageChange(X,leftY - 1);
                }
            }catch(e) {}
            let upX = X;
            let downX = X;
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
    if (playCells[x][y] == 1) {
        document.getElementById(x * 10 + y).src = 'used_cell_1.png';
    }
    if (playCells[x][y] == 2) {
        document.getElementById(x * 10 + y).src = 'used_cell_2.png';
    }
    if (playCells[x][y] == 3) {
        document.getElementById(x * 10 + y).src = 'used_cell_3.png';
    }
    if (playCells[x][y] == 4) {
        document.getElementById(x * 10 + y).src = 'used_cell_4.png';
    }
    if (playCells[x][y] == 5) {
        document.getElementById(x * 10 + y).src = 'used_cell_5.png';
    }
    if (playCells[x][y] == 6) {
        document.getElementById(x * 10 + y).src = 'used_cell_6.png';
    }
    if (playCells[x][y] == 7) {
        document.getElementById(x * 10 + y).src = 'used_cell_7.png';
    }
    if (playCells[x][y] == 8) {
        document.getElementById(x * 10 + y).src = 'used_cell_8.png';
    }
}
