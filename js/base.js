/* entry point for the javascript game */

var map = null;

/* javascript objects for the game */
var mapLayout = {walls: '#', floor: '.', key: '~'};
var player = {symbol: '@', x: 3, y: 3};
var monster = {symbol: 'X', x: 1, y: 2};

var playing = false;

function startGame() {
    playing = true;
    generateMap();

    while (playing) {

        console.clear();
        updateMap();
        printArray(map);

        var input = prompt('Which direction would you like to go? [u]p, [d]own, [l]eft or [r]ight. Enter [s]top to stop getting prompts.');

        replacePlayerToTrail();
        handleInput(input);
    }
}

function handleInput(input) {
    switch (input) {

        case 'u':
            moveUp();
            break;

        case 'd':
            moveDown();
            break;

        case 'l':
            moveLeft();
            break;

        case 'r':
            moveRight();
            break;

        case 's':
            playing = false;
            break;

        default:
            console.log('Invalid input, get rekt.');
            break;
    }
}

function moveUp() {
    player.x = player.x - 1;
}
function moveRight() {
    player.y = player.y + 1;
}
function moveLeft() {
    player.y = player.y - 1;
}
function moveDown() {
    player.x = player.x + 1;
}

/* the player tile becomes a floor tile after the player left */
function replacePlayerToTrail(){
    map[player.x][player.y] = mapLayout.floor;
}

/* make a new - clear - map and puts the player and monsters */
function updateMap() {
    // map = generateMap();
    map[monster.x][monster.y] = monster.symbol;
    map[player.x][player.y] = player.symbol;
}

/* prints out the map to the console */
function printArray(multiArray) {
    for (var i = 0; i < multiArray.length; i++) {
        console.log(multiArray[i].join(''));
    }
}

/* creates a new clear map */
function generateMap() {

    var wholeArray = new Array(15);

    for (var i = 0; i < 15; i++) {
        var oneRow = new Array(15);

        for (var j = 0; j < 15; j++) {

            /* first and last row should be '#' for walls */
            if (i == 0 || i == 14) {
                oneRow[j] = mapLayout.walls;
            } else {

                var randomTile = createTrails();

                /* left most tile and right most tile should be wall */
                if (j == 0 || j == 14) {
                    oneRow[j] = mapLayout.walls;
                } else {
                    // oneRow[j] = mapLayout.floor;
                    oneRow[j] = randomTile;
                }
            }
        }

        wholeArray[i] = oneRow;
    }

    map = wholeArray;
    return map;
}

/* get a random value to generate a floor or a wall tile randomly */
function createTrails(){

    return Math.random() < 0.5 ? mapLayout.floor : mapLayout.walls;
}