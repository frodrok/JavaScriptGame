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

        handleInput(input);
    }
}

function handleInput(input) {

    switch (input) {

        case 'w':
            if (floorIsAvailable(input)) {
                baseMap.player.moveUp();
            }
            break;

        case 's':
            if (floorIsAvailable(input)) {
                baseMap.player.moveDown();
            }
            break;

        case 'a':
            if (floorIsAvailable(input)) {
                baseMap.player.moveLeft();
            }
            break;

        case 'd':
            if (floorIsAvailable(input)) {
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

function floorIsAvailable(direction) {

    switch (direction) {

        case 'w':
            return baseMap.isAvailable('w', baseMap.player.x, baseMap.player.y);
            break;

        case 'a':
            return baseMap.isAvailable('a', baseMap.player.x, baseMap.player.y);
            break;

        case 's':
            return baseMap.isAvailable('s', baseMap.player.x, baseMap.player.y);
            break;

        case 'd':
            return baseMap.isAvailable('d', baseMap.player.x, baseMap.player.y);
            break;
    }
}

startGame();

