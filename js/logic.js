var baseMap = new Map();

var playing = false;

function startGame() {
    playing = true;
    while (playing) {

        console.clear();
        baseMap.update();
        baseMap.printMap();

        var input = prompt('Which direction would you like to go? [w]: up, [s]: down, [a]: left or [d]: right. Enter [q] to stop getting prompts.');

        if(input != null) {
            input.toLowerCase();
        }

        handleInput(input);
    }
};

function handleInput(input) {

    var cleaned = input.toLowerCase();

    switch (cleaned) {

        case 'w':
            var go = checkAvailable(cleaned);
            if (go) {
                baseMap.player.moveUp();
            }
            break;

        case 's':
            var go = checkAvailable(cleaned);
            if (go) {
                baseMap.player.moveDown();
            }
            break;

        case 'a':
            var go = checkAvailable(cleaned);
            if (go) {
                baseMap.player.moveLeft();
            }
            break;

        case 'd':
            var go = checkAvailable(cleaned);
            if (go) {
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

};

function checkAvailable(direction) {

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

