/* entry point for the javascript game */

var map = null;

/* javascript objects for the game */
var mapLayout = {walls:  String.fromCharCode(0x2B1B), floor: String.fromCharCode(0x2B1C)};
var player = {symbol: String.fromCharCode(0xD83D, 0xDE04), x: 3, y: 3};
var monster = {symbol: String.fromCharCode(0xD83D, 0xDC79), x: 1, y: 2};
var key = {symbol: String.fromCharCode(0xD83D, 0xDD11), x: 10, y: 13};
var hammer = {symbol: String.fromCharCode(0xD83D, 0xDD28), x: 5, y: 8};
var door = {symbol: String.fromCharCode(0xD83D, 0xDEAA)};

var playing = false;


function startGame() {

    playing = true;
    generateMap();
    createDoor();
    setObjectsLocation();
    createTrails();

    while (playing) {

        console.clear();
        updateMap();
        printMap(map);
        replacePlayerToFloor();

        var input = prompt('Which direction would you like to go? [u]p, [d]own, [l]eft or [r]ight. Enter [s]top to stop getting prompts.');

        if(input != null) {
            input.toLowerCase();
        }

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
function replacePlayerToFloor() {
    map[player.x][player.y] = mapLayout.floor;
}

/* make a new - clear - map and puts the player and monsters */
function updateMap() {
    // map = generateMap();
    map[monster.x][monster.y] = monster.symbol;
    map[player.x][player.y] = player.symbol;
    map[key.x][key.y] = key.symbol;
    map[hammer.x][hammer.y] = hammer.symbol;
    map[door.x][door.y] = door.symbol;
}

/* prints out the map to the console */
function printMap(map) {
    for (var i = 0; i < map.length; i++) {
        console.log(map[i].join(' '));
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

                var chosenTile = chooseFloorOrWall();

                /* left most tile and right most tile should be wall */
                if (j == 0 || j == 14) {
                    oneRow[j] = mapLayout.walls;
                } else {
                    // oneRow[j] = mapLayout.floor;
                    oneRow[j] = chosenTile;
                }
            }
        }

        wholeArray[i] = oneRow;
    }

    map = wholeArray;
    return map;
}

/* get a random value to generate a floor or a wall tile randomly */
function chooseFloorOrWall() {

    return Math.random() < 0.5 ? mapLayout.floor : mapLayout.walls;
}

function getRandomMapIndex() {

    return Math.floor((Math.random() * 13) + 1);
}

function createTrails() {

    var randomIndex = getRandomMapIndex();

    map.forEach(function (elementX, indexX) {

        elementX.forEach(function (elementY, indexY) {

            /* make the key row, player row, player column a floor tile */
            if (!isOuterWall(indexX, indexY) && (indexX === hammer.x || indexX === player.x || player.y === indexY)) {

                map[indexX][indexY] = mapLayout.floor;
            }
        })
    })
}

function isOuterWall(indexX, indexY) {

    return indexX === 0 || indexX === 14 || indexY === 0 || indexY === 14;
}

function setObjectsLocation() {

    player.x = getRandomMapIndex();
    player.y = getRandomMapIndex();
    monster.x = getRandomMapIndex();
    monster.y = getRandomMapIndex();
    key.x = getRandomMapIndex();
    key.y = getRandomMapIndex();
    hammer.x = getRandomMapIndex();
    hammer.y = getRandomMapIndex();
}

function getRandomIntToCreateDoor(minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
}

function createDoor(){
  door.x = getRandomIntToCreateDoor(0, 15);
  var doorPositionChoice = getRandomIntToCreateDoor(0,15);
  if (door.x == 0 || door.x == 14){
    door.y = doorPositionChoice;
  }
  else{
    if (doorPositionChoice < 7)
    {
      door.y = 0;
    }
    else {
      door.y = 14;
    }
  }
}
