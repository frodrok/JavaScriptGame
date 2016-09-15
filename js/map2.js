function baseMap() {

    var floor = String.fromCharCode(0x2B1C);
    var wall = String.fromCharCode(0x2B1B);
    var player = new Player(3, 3);
    var monster = new Monster(6, 6);
    var mapSize = 15;

    var key = {symbol: String.fromCharCode(0xD83D, 0xDD11), x: 10, y: 13};
    var hammer = {symbol: String.fromCharCode(0xD83D, 0xDD28), x: 5, y: 8};
    var door = {symbol: String.fromCharCode(0xD83D, 0xDEAA)};

    var map = generateBaseMap();
    map[key.x][key.y] = key.symbol;

    setObjectsLocation();
    clearPlayerRowAndColumn();
    clearAreaAndPutHammer();
    setDoor();

    function generateBaseMap() {
        var innerMap = new Array(mapSize);

        for (var i = 0; i < mapSize; i++) {
            var oneRow = new Array(mapSize);

            for (var j = 0; j < mapSize; j++) {

                var lastIndex = mapSize - 1;

                /* first and last row should be '#' for walls */
                if (i == 0 || i == lastIndex) {
                    oneRow[j] = wall;
                } else {

                    var chosenTile = chooseFloorOrWall();

                    /* left most tile and right most tile should be wall */
                    if (j == 0 || j == lastIndex) {
                        oneRow[j] = wall;
                    } else {
                        oneRow[j] = chosenTile;
                    }
                }
            }

            innerMap[i] = oneRow;
        }

        return innerMap;
    }

    function chooseFloorOrWall() {
        return Math.random() < 0.5 ? floor : wall;
    }

    function putPlayer() {
        map[player.x][player.y] = player.symbol;
    }

    function putMonster() {
        map[monster.x][monster.y] = monster.symbol;
    }

    function getRandomInt(minNumber, maxNumber) {
        return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    }

    function setDoor() {
        door.x = getRandomInt(0, 15);
        var doorPositionChoice = getRandomInt(0, 15);
        if (door.x == 0 || door.x == 14) {
            door.y = doorPositionChoice;
        }
        else {
            if (doorPositionChoice < 7) {
                door.y = 0;
            }
            else {
                door.y = 14;
            }
        }

        map[door.x][door.y] = door.symbol;
    }

    function clearAreaAndPutHammer() {
        var areaToClear = [[hammer.x - 1, hammer.y - 1], [hammer.x, hammer.y], [hammer.x + 1, hammer.y + 1]];

        areaToClear.forEach(function (e) {
            map[e[0]][e[1]] = floor;
        });

        map[hammer.x][hammer.y] = hammer.symbol;
    }

    function clearMap() {
        /* TODO */
    }

    function clearPlayerRowAndColumn() {

        map.forEach(function (elementX, indexX) {

            elementX.forEach(function (elementY, indexY) {

                /* make the player row floor tiles */
                if (!isOuterWall(indexX, indexY) && (indexX === player.x || indexY === player.y)) {

                    map[indexX][indexY] = floor;
                }
            })
        })
    }

    function isOuterWall(indexX, indexY) {

        return indexX === 0 || indexX === 14 || indexY === 0 || indexY === 14;
    }

    function setObjectsLocation() {

        var firstIndexOfInnerMap = 1;
        var lastIndexOfInnerMap = 13;
        var objects = [];
        objects.push(player, monster, key, hammer);
        objects.forEach(function (element) {
            element.x = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
            element.y = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
        });
    }

    function update() {
        // clearMap();
        putPlayer();
        putMonster();
        console.log("updated, player.x:" + player.x + ", p.y:" + player.y);
    }

    function replacePlayerToFloor() {
        map[player.x][player.y] = floor;
    }

    /* a start of collision detection, for now it only checks for walls */
    function isAvailable (direction, x, y) {
        console.log(direction);
        var available = false;
        if (direction === 'w') {
            available = map[x - 1][y] !== wall;
        } else if (direction === 'a') {
            available = map[x][y - 1] !== wall;
        } else if (direction === 's') {
            available = map[x + 1][y] !== wall;
        } else if (direction === 'd') {
            available = map[x][y + 1] !== wall;
        }
        return available;
    }

    function printMap() {
        for (var i = 0; i < map.length; i++) {
            console.log(map[i].join(' '));
        }
    }

    return {
        player: player,
        update: update,
        replacePlayerToFloor: replacePlayerToFloor,
        isAvailable: isAvailable,
        printMap: printMap
    }
}
