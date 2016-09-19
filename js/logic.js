var baseMap = map();
var playing = false;

function startGame() {
    playing = true;
    while (playing) {

        console.clear();
        baseMap.update();
        baseMap.printMap();
        baseMap.replaceMovableObjectToFloor(baseMap.player);

        /* declare it here because of reuse on :34 */
        var playerIsDead = baseMap.playerIsDead();

        if(!playerIsDead && baseMap.getLevel() < 3) {
            // var input = prompt('Which direction would you like to go? [w]: up, [s]: down, [a]: left or [d]: right. ' +
            //     'Enter [q] to stop getting prompts.');
            // if (input !== null) {
            //     input.toLowerCase();
            // }
            var input = askDirection();
//             if (isDoor(input) && baseMap.openDoor().doorIsOpen) {
//                 baseMap.goToNewRoom();
//             }
//             var position = getPosition(input);
//             if (position != null && position.isWall) {
//                 baseMap.smashWall(position.x, position.y);
//             } else if (position != null && position.isMonster) {
//                 baseMap.attackMonster(position.x, position.y);
//             }
// =======
//         if(!baseMap.playerIsDead()){
//             var input = askDirection();
            handlePosition(input);
// >>>>>>> remotes/origin/underScore
            handleInput(input);
        } else {
            gameOver(playerIsDead);
        }
    }
}

function askDirection(){
    var input = prompt('Which direction would you like to go? [w]: up, [s]: down, [a]: left or [d]: right. ' +
        'Enter [q] to stop getting prompts.');
    if (input !== null) {
        input.toLowerCase();
    }

    return input
}

function handlePosition(input){
    var position = getPosition(input);

    if(position != null) {
        if (position.isDoor && baseMap.openDoor().doorIsOpen) {
            baseMap.goToNewRoom();
        }else if (position.isWall) {
            baseMap.smashWall(position.x, position.y);
        } else if (position.isMonster) {
            baseMap.attackMonster(position.x, position.y);
        }
    }
}

function handleInput(input) {

    switch (input) {

        case 'w':
            if (isWalkable(input)) {
                baseMap.player.moveUp();
            }
            break;

        case 's':
            if (isWalkable(input)) {
                baseMap.player.moveDown();
            }
            break;

        case 'a':
            if (isWalkable(input)) {
                baseMap.player.moveLeft();
            }
            break;

        case 'd':
            if (isWalkable(input)) {
                baseMap.player.moveRight();
            }
            break;

        case 'q':
            playing = false;
            break;

        default:
            console.log('Invalid input, get rekt.');
            break;
    }
}

function isWalkable(direction) {

    switch (direction) {

        case 'w':
            return baseMap.checkNextTile('w', baseMap.player.x, baseMap.player.y).available;
            break;

        case 'a':
            return baseMap.checkNextTile('a', baseMap.player.x, baseMap.player.y).available;
            break;

        case 's':
            return baseMap.checkNextTile('s', baseMap.player.x, baseMap.player.y).available;
            break;

        case 'd':
            return baseMap.checkNextTile('d', baseMap.player.x, baseMap.player.y).available;
            break;
    }
}

function getPosition(direction) {

    var nextTile;
    switch (direction) {

        case 'w':
            nextTile = baseMap.checkNextTile('w', baseMap.player.x, baseMap.player.y);
            if (nextTile.isWall) {
                return {
                    isWall: nextTile.isWall,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isMonster) {
                return {
                    isMonster: nextTile.isMonster,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isDoor) {
                return {
                    isDoor: nextTile.isDoor
                }
            }
            break;

        case 'a':
            nextTile = baseMap.checkNextTile('a', baseMap.player.x, baseMap.player.y);
            if (nextTile.isWall) {
                return {
                    isWall: nextTile.isWall,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isMonster) {
                return {
                    isMonster: nextTile.isMonster,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isDoor) {
                return {
                    isDoor: nextTile.isDoor
                }
            }
            break;

        case 's':
            nextTile = baseMap.checkNextTile('s', baseMap.player.x, baseMap.player.y);
            if (nextTile.isWall) {
                return {
                    isWall: nextTile.isWall,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isMonster) {
                return {
                    isMonster: nextTile.isMonster,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isDoor) {
                return {
                    isDoor: nextTile.isDoor
                }
            }
            break;

        case 'd':
            nextTile = baseMap.checkNextTile('d', baseMap.player.x, baseMap.player.y);
            if (nextTile.isWall) {
                return {
                    isWall: nextTile.isWall,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isMonster) {
                return {
                    isMonster: nextTile.isMonster,
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            } else if (nextTile.isDoor) {
                return {
                    isDoor: nextTile.isDoor
                }
            }
            break;

        default:
            return null;
    }
}

function gameOver(playerIsDead) {
    var replayAnswer;
    var gameOverSign;
    if (playerIsDead) {
        gameOverSign = String.fromCharCode(0xD83C, 0xDFAE) + String.fromCharCode(0x274C);
        console.log(gameOverSign + ' GAME OVER ' + gameOverSign);
        playing = false;
        replayAnswer = prompt('Game over! Play again? y/n');
    } else {
        gameOverSign = String.fromCharCode(0x2B50) + ' ' + String.fromCharCode(0x2B50);
        console.log(gameOverSign + '    YOU WIN    ' + gameOverSign);
        playing = false;
        /* maybe change this text, I was a little too excited :D */
        replayAnswer = prompt('YOU FUCKING DID IT, GOOD JOB! WANNA GO AGAIN?? y/n');
    }
    if(replayAnswer != null){
        replayAnswer.toLowerCase();
    }
    if(replayAnswer === 'y'){
        baseMap = map();
        startGame();
    }
}

startGame();

