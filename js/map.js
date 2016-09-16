function baseMap() {

    var floor = String.fromCharCode(0x2B1C);
    var wall = String.fromCharCode(0x2B1B);
    var player = new Player(3, 3);
    var monster = new Monster(6, 6);
    var mapSize = 15;

    var key = {name: 'key', symbol: String.fromCharCode(0xD83D, 0xDD11), x: 10, y: 13};
    var hammer = {name: 'hammer', symbol: String.fromCharCode(0xD83D, 0xDD28), x: 5, y: 8};
    var door = {symbol: String.fromCharCode(0xD83D, 0xDEAA)};
    var items = [key, hammer];
    var objects = [player, key, hammer, monster];
    var map = generateBaseMap();

    setObjectsLocation();
    map[key.x][key.y] = key.symbol;
    clearPlayerColumnAndHammerRow();
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

                    var chosenTile = chooseBetweenTwoThings(wall, floor);

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

    function chooseBetweenTwoThings(thing1, thing2) {
        return Math.random() < 0.5 ? thing1 : thing2;
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
        var doorPositionChoice = getRandomInt(1, 14);
        if (door.x == 0 || door.x == 14) {
            door.y = doorPositionChoice;
        } else {
            door.y = chooseBetweenTwoThings(0, 14);
        }
        map[door.x][door.y] = door.symbol;
    }

    function clearAreaAndPutHammer() {
        // var areaToClear = [[hammer.x - 1, hammer.y - 1], [hammer.x, hammer.y], [hammer.x + 1, hammer.y + 1]];
        //
        // areaToClear.forEach(function (e) {
        //     map[e[0]][e[1]] = floor;
        // });

        map[hammer.x][hammer.y] = hammer.symbol;
    }

    function clearMap() {
        /* TODO */
    }

    function clearPlayerColumnAndHammerRow() {

        map.forEach(function (elementX, indexX) {

            elementX.forEach(function (elementY, indexY) {

                /* make the player row floor tiles */
                if (!isOuterWall(indexX, indexY) && (indexX === hammer.x || indexY === player.y)) {

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
        objects.forEach(function (object) {
            object.x = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
            object.y = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
        });
    }

    function update() {
        // clearMap();

        putPlayer();
        putMonster();
        if (isOnItem()) {
            replaceItemToFloor()
        }
        if (metMonster()) {
            //TODO: action to attack the monster
            console.log('met monster');
        }
        showStatus();
        // console.log('updated, player.x:' + player.x + ', p.y:' + player.y );
    }

    function showStatus() {
        var basicStatus = 'updated, player.x:' + player.x + ', p.y:' + player.y + ', items:';
        var playerItems = player.items;
        for (var i = 0; i < playerItems.length; i++) {
            var playerItem = playerItems[i];
            if (!basicStatus.includes(playerItem.name)) {
                basicStatus = basicStatus + playerItems[i].name + ' ';
            }
        }
        console.log(basicStatus);
    }

    function replacePlayerToFloor() {
        map[player.x][player.y] = floor;
    }

    function replaceItemToFloor(item) {
        map[item.x][item.y] = floor;
    }

    /* a start of collision detection, for now it only checks for walls */
    function isAvailable(direction, x, y) {
        console.log(direction);
        var available = false;
        var directionUp = map[x - 1][y];
        var directionLeft = map[x][y - 1];
        var directionDown = map[x + 1][y];
        var directionRight = map[x][y + 1];

        if (direction === 'w') {
            available = (directionUp !== wall);
        } else if (direction === 'a') {
            available = (directionLeft !== wall);
        } else if (direction === 's') {
            available = (directionDown !== wall);
        } else if (direction === 'd') {
            available = (directionRight !== wall);
        }
        return available;
    }

    function isOnItem() {
        items.forEach(function (item) {
            if (player.x === item.x && player.y === item.y) {
                player.items.push(item);
                return true;
            }
        });
    }

    function metMonster() {
        var isNearMonster = ((monster.x >= player.x - 1 && monster.x <= player.x + 1 ) && monster.y === player.y) ||
            ((monster.y >= player.y - 1 && monster.y <= player.y + 1) && monster.x === player.x);

        if (isNearMonster) {
            return true;
        }
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
