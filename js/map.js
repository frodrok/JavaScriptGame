function baseMap() {

    var floor = String.fromCharCode(0x2B1C);
    var wall = String.fromCharCode(0x2B1B);
    var player = new Player(3, 3);
    var monster = new Monster(6, 6);
    var mapSize = 15;

    var key = {name: 'key', life: 1, symbol: String.fromCharCode(0xD83D, 0xDD11), x: 10, y: 13};
    var hammer = {name: 'hammer', life: 3, symbol: String.fromCharCode(0xD83D, 0xDD28), x: 5, y: 8};
    var sword = {name: 'sword', life: 1, symbol: String.fromCharCode(0xD83D, 0xDDE1), x: 4, y: 13};
    var door = {symbol: String.fromCharCode(0xD83D, 0xDEAA)};
    var items = [key, hammer, sword];
    var objects = [player, key, hammer, monster, sword];
    var map = generateBaseMap();
    var playerItems = player.items;
    player.life = 3;
    monster.dead = false;

    setObjectsLocation();
    clearPlayerColumnAndHammerRow();
    putItems();
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

                    var chosenTile = chooseBetween(wall, floor);

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

    function chooseBetween(thing1, thing2) {
        return Math.random() < 0.5 ? thing1 : thing2;
    }

    function putItems() {
        items.forEach(function (item) {
            map[item.x][item.y] = item.symbol;
        })
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
            door.y = chooseBetween(0, 14);
        }
        map[door.x][door.y] = door.symbol;
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
        if (!monster.dead) {
            putMonster();
        }
        var pickedItem = pickItem();
        if (pickedItem != null) {
            replaceObjectToFloor(pickedItem)
        }
        if (metMonster()) {
            attackMonster();
            console.log('met monster');
        }
        putPlayer();
        showStatus();
    }

    function showStatus() {
        var basicStatus = 'updated, player.x:' + player.x + ', p.y:' + player.y + ', p.life:' + player.life;
        var playerItems = player.items;
        for (var i = 0; i < playerItems.length; i++) {
            var playerItem = playerItems[i];
            if (!basicStatus.includes(playerItem.name)) {
                basicStatus = basicStatus + ', ' + playerItem.name + ':' + playerItem.life;
            }
        }
        console.log(basicStatus);
    }

    // function replacePlayerToFloor() {
    //     map[player.x][player.y] = floor;
    // }

    function replaceObjectToFloor(object) {
        map[object.x][object.y] = floor;
    }

    /* a start of collision detection */
    function checkNextTile(direction, x, y) {
        console.log(direction);
        var available = false;
        var isDoor = false;
        var isWall = false;
        var directionUp = map[x - 1][y];
        var directionLeft = map[x][y - 1];
        var directionDown = map[x + 1][y];
        var directionRight = map[x][y + 1];
        var positionX;
        var positionY;

        if (direction === 'w') {
            isDoor = (directionUp === door.symbol);
            isWall = (directionUp === wall);
            available = (!isWall && !isDoor);
            positionX = x - 1;
            positionY = y;
        } else if (direction === 'a') {
            isDoor = (directionLeft === door.symbol);
            isWall = (directionLeft === wall);
            available = (!isWall && !isDoor);
            positionX = x;
            positionY = y - 1;
        } else if (direction === 's') {
            isDoor = (directionDown === door.symbol);
            isWall = (directionDown === wall);
            available = (!isWall && !isDoor);
            positionX = x + 1;
            positionY = y;
        } else if (direction === 'd') {
            isDoor = (directionRight === door.symbol);
            isWall = (directionRight === wall);
            available = (!isWall && !isDoor);
            positionX = x;
            positionY = y + 1;
        }
        return {
            isDoor: isDoor,
            isWall: isWall,
            available: available,
            positionX: positionX,
            positionY: positionY
        };
    }

    function openDoor() {
        if (playerItems.includes(key)) {
            map[door.x][door.y] = floor;
            var indexOfKey = playerItems.indexOf(key);
            playerItems.splice(indexOfKey, 1);
        }
    }

    function smashWall(positionX, positionY) {
        if (playerItems.includes(hammer)) {
            var indexOfHammer = playerItems.indexOf(hammer);
            var hammerLife = playerItems[indexOfHammer].life;
            if (hammerLife > 0) {
                map[positionX][positionY] = floor;
                playerItems[indexOfHammer].life = playerItems[indexOfHammer].life - 1;
            }
        }
    }

    function pickItem() {
        var pickedItem = null;
        items.forEach(function (item) {
            if (player.x === item.x && player.y === item.y) {
                player.items.push(item);
                pickedItem = item;
            }
        });
        return pickedItem;
    }

    function metMonster() {
        var isNearMonster = ((monster.x >= player.x - 1 && monster.x <= player.x + 1 ) && monster.y === player.y) ||
            ((monster.y >= player.y - 1 && monster.y <= player.y + 1) && monster.x === player.x);

        if (isNearMonster) {
            return true;
        }
    }

    function attackMonster() {
        var hasSword = playerItems.includes(sword);
        if (hasSword) {
            var indexOfSword = playerItems.indexOf(sword);
            var swordLife = playerItems[indexOfSword].life;
        }
        if (hasSword && swordLife > 0) {
            replaceObjectToFloor(monster);
            monster.dead = true;
            playerItems[indexOfSword].life = playerItems[indexOfSword].life - 1;
        }
        else if (!hasSword || swordLife <= 0) {
            player.life = player.life - 1;
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
        replaceObjectToFloor: replaceObjectToFloor,
        checkNextTile: checkNextTile,
        printMap: printMap,
        openDoor: openDoor,
        smashWall: smashWall
    }
}
