var baseMap = baseMap();
var playing = false;

function startGame() {
    playing = true;
    while (playing) {

        console.clear();
        baseMap.update();
        baseMap.printMap();
        baseMap.replaceObjectToFloor(baseMap.player);

        var input = prompt('Which direction would you like to go? [w]: up, [s]: down, [a]: left or [d]: right. Enter [q] to stop getting prompts.');

        if (input != null) {
            input.toLowerCase();
        }
        if(isDoor(input)){
            baseMap.openDoor();
        }
        var wallPosition = getWallPosition(input);
        if(wallPosition != null){
            baseMap.smashWall(wallPosition.x, wallPosition.y);
        }
        handleInput(input);
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

function isDoor(direction){

    switch(direction){
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

function getWallPosition(direction){

    var nextTile;
    switch(direction){

        case 'w':
            nextTile = baseMap.checkNextTile('w', baseMap.player.x, baseMap.player.y);
            if(nextTile.isWall){
                return {
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            }
            break;

        case 'a':
            nextTile = baseMap.checkNextTile('a', baseMap.player.x, baseMap.player.y);
            if(nextTile.isWall) {
                return {
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            }
            break;

        case 's':
            nextTile = baseMap.checkNextTile('s', baseMap.player.x, baseMap.player.y);
            if(nextTile.isWall){
                return {
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            }
            break;

        case 'd':
            nextTile = baseMap.checkNextTile('d', baseMap.player.x, baseMap.player.y);
            if(nextTile.isWall){
                return {
                    x: nextTile.positionX,
                    y: nextTile.positionY
                }
            }
            break;

        default:
            return null;
    }
}

startGame();

