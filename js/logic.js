var baseMap = map();
var playing = false;

function startGame() {
    playing = true;
    while (playing) {

        console.clear();
        baseMap.update();
        baseMap.printMap();
        baseMap.replaceObjectToFloor(baseMap.player);
        if (baseMap.playerIsDead()) {
            gameOver();
        } else {
            var input = prompt('Which direction would you like to go? [w]: up, [s]: down, [a]: left or [d]: right. ' +
                'Enter [q] to stop getting prompts.');

            if (input !== null) {
                input.toLowerCase();
            }
            if (isDoor(input)) {
                baseMap.openDoor();
            }
            var position = getPosition(input);
            if (position != null && position.isWall) {
                baseMap.smashWall(position.x, position.y);
            } else if (position != null && position.isMonster) {
                baseMap.attackMonster(position.x, position.y);
            }

            handleInput(input);
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

function isDoor(direction) {

    switch (direction) {
        case 'w':
            return baseMap.checkNextTile('w', baseMap.player.x, baseMap.player.y).isDoor;
            break;

        case 'a':
            return baseMap.checkNextTile('a', baseMap.player.x, baseMap.player.y).isDoor;
            break;

        case 's':
            return baseMap.checkNextTile('s', baseMap.player.x, baseMap.player.y).isDoor;
            break;

        case 'd':
            return baseMap.checkNextTile('d', baseMap.player.x, baseMap.player.y).isDoor;
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
            }
            break;

        default:
            return null;
    }
}

function gameOver() {
    var gameOverSign = String.fromCharCode(0xD83C, 0xDFAE) + String.fromCharCode(0x274C);
    console.log(gameOverSign + ' GAME OVER ' + gameOverSign);
    playing = false;
    var replayAnswer = prompt('Game over! Play again? y/n');
    if(replayAnswer != null){
        replayAnswer.toLowerCase();
    }
    if(replayAnswer === 'y'){
        baseMap = map();
        startGame();
    }
}

startGame();

