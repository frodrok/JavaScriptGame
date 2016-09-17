function map() {

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
    var playersItems = player.items;
    player.life = 3;
    monster.dead = false;

    setPositionToObjects();
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

        map.forEach(function (rows, positionX) {

            rows.forEach(function (columns, positionY) {

                /* make the player row floor tiles */
                if (!isOuterWall(positionX, positionY) && (positionX === hammer.x || positionY === player.y)) {

                    map[positionX][positionY] = floor;
                }
            })
        })
    }

    function isOuterWall(positionX, positionY) {

        return positionX === 0 || positionX === 14 || positionY === 0 || positionY === 14;
    }

    function setPositionToObjects() {
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
        var pickedItem = pickItem().pickedItem;
        if (pickedItem != null) {
            replaceObjectToFloor(pickedItem)
        }
        if (metMonster()) {
            player.life = player.life - 1;
        }
        if (isNearMonster()) {
            player.symbol = String.fromCharCode(0xD83D, 0xDE2B);
        } else if (playerIsDead()) {
            player.symbol = String.fromCharCode(0xD83D, 0xDE31);
        } else {
            player.symbol = String.fromCharCode(0xD83D, 0xDE04);
        }
        putPlayer();
        showStatus();
    }

    function showStatus() {
        var basicStatus = 'updated, player.x:' + player.x + ', p.y:' + player.y + ', p.life:' + player.life;
        for (var i = 0; i < playersItems.length; i++) {
            var playerItem = playersItems[i];
            if (!basicStatus.includes(playerItem.name)) {
                basicStatus = basicStatus + ', ' + playerItem.name + ':' + playerItem.life;
            }
        }
        console.log(basicStatus);
    }

    function replaceObjectToFloor(object) {
        map[object.x][object.y] = floor;
    }

    /* a start of collision detection */
    function checkNextTile(direction, x, y) {
        console.log(direction);
        var available = false;
        var isDoor = false;
        var isWall = false;
        var isMonster = false;
        var directionUp = map[x - 1][y];
        var directionLeft = map[x][y - 1];
        var directionDown = map[x + 1][y];
        var directionRight = map[x][y + 1];
        var positionX;
        var positionY;

        if (direction === 'w') {
            isDoor = (directionUp === door.symbol);
            isWall = (directionUp === wall);
            isMonster = (directionUp === monster.symbol);
            available = (!isWall && !isDoor);
            positionX = x - 1;
            positionY = y;
        } else if (direction === 'a') {
            isDoor = (directionLeft === door.symbol);
            isWall = (directionLeft === wall);
            isMonster = (directionLeft === monster.symbol);
            available = (!isWall && !isDoor);
            positionX = x;
            positionY = y - 1;
        } else if (direction === 's') {
            isDoor = (directionDown === door.symbol);
            isWall = (directionDown === wall);
            isMonster = (directionDown === monster.symbol);
            available = (!isWall && !isDoor);
            positionX = x + 1;
            positionY = y;
        } else if (direction === 'd') {
            isDoor = (directionRight === door.symbol);
            isWall = (directionRight === wall);
            isMonster = (directionRight === monster.symbol);
            available = (!isWall && !isDoor);
            positionX = x;
            positionY = y + 1;
        }
        return {
            isDoor: isDoor,
            isWall: isWall,
            isMonster: isMonster,
            available: available,
            positionX: positionX,
            positionY: positionY
        };
    }

    function searchItem(item) {
        var hasItem = false;
        var foundItem = null;
        playersItems.forEach(function (playerItem) {
            if (item.name === playerItem.name) {
                hasItem = true;
                foundItem = playerItem;
            }
        });
        return {
            foundItem: foundItem,
            hasItem: hasItem
        }
    }

    function openDoor() {
        var doorIsOpen = false;
        var keySearch = searchItem(key);
        var playersKey = keySearch.foundItem;
        if (keySearch.hasItem) {
            map[door.x][door.y] = floor;
            playersKey.life = playersKey.life - 1;
            doorIsOpen = true;
            if (monster.x >= 0 && monster.y >= 0) {
                map[monster.x][monster.y] = floor;
            }
        }
        return {
            doorIsOpen: doorIsOpen
        };
    }

    function smashWall(positionX, positionY) {
        var hammerSearch = searchItem(hammer);
        if (!isOuterWall(positionX, positionY) && hammerSearch.hasItem) {
            // var indexOfHammer = playersItems.indexOf(hammer);
            // var hammerLife = playersItems[indexOfHammer].life;
            var playersHammer = hammerSearch.foundItem;
            if (playersHammer.life > 0) {
                map[positionX][positionY] = floor;
                playersHammer.life = playersHammer.life - 1;
            }
        }
    }

    function pickItem() {
        var pickedItem = null;
        items.forEach(function (item) {
            if (player.x === item.x && player.y === item.y) {
                var itemSearch = searchItem(item);
                if (itemSearch.hasItem) {
                    var playersItem = itemSearch.foundItem;
                    playersItem.life = playersItem.life + item.life;
                }else {
                    var newItem = {name: item.name, life: item.life};
                    playersItems.push(newItem);
                }
                pickedItem = item;
            }
        });
        return {
            pickedItem: pickedItem
        }
    }

    function isNearMonster() {
        var isNearMonster = ((monster.x >= player.x - 1 && monster.x <= player.x + 1 ) && monster.y === player.y) ||
            ((monster.y >= player.y - 1 && monster.y <= player.y + 1) && monster.x === player.x);

        if (isNearMonster) {
            return true;
        }
    }

    function metMonster() {
        if (monster.x === player.x && monster.y === player.y) {
            return true;
        }
    }

    function attackMonster(positionX, positionY) {
        var swordSearch = searchItem(sword);
        var playersSword = swordSearch.foundItem;
        if (swordSearch.hasItem && playersSword.life > 0) {
            map[positionX][positionY] = floor;
            monster.dead = true;
            playersSword.life = playersSword.life - 1;
            player.symbol = String.fromCharCode(0xD83D, 0xDE04);
            monster.x = -1;
            monster.y = -1;
        }
    }

    function playerIsDead() {
        if (player.life <= 0) {
            return true;
        }
    }

    function printMap() {
        for (var i = 0; i < map.length; i++) {
            console.log(map[i].join(' '));
        }
    }

    function goToNewRoom() {
        monster.dead = false;
        // setPositionToPlayer();
        map = generateBaseMap();
        setPositionToObjects();
        console.log(monster.x + ', ' + monster.y);
        clearPlayerColumnAndHammerRow();
        putItems();
        setDoor();
    }

    return {
        player: player,
        update: update,
        replaceObjectToFloor: replaceObjectToFloor,
        checkNextTile: checkNextTile,
        printMap: printMap,
        openDoor: openDoor,
        smashWall: smashWall,
        attackMonster: attackMonster,
        playerIsDead: playerIsDead,
        goToNewRoom: goToNewRoom
    }
}
