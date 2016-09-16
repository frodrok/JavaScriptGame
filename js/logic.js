var baseMap = baseMap();
var playing = false;

function startGame() {
    playing = true;
    while (playing) {

        console.clear();
        baseMap.update();
        baseMap.printMap();
        baseMap.replacePlayerToFloor();

        var input = prompt('Which direction would you like to go? [w]: up, [s]: down, [a]: left or [d]: right. Enter [q] to stop getting prompts.');

        if (input != null) {
            input.toLowerCase();
        }
        if(isDoor(input)){
            baseMap.openDoor();
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

startGame();

