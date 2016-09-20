function map() {

    var floor = String.fromCharCode(0x2B1C);
    var wall = String.fromCharCode(0x2B1B);
    var player = new Player(3, 3);
    var monster = new Monster(6, 6);
    var mapSize = 15;

    var key = {name: 'key', life: 1, symbol: String.fromCharCode(0xD83D, 0xDD11), x: 10, y: 13};
    var hammer = {name: 'hammer', life: 3, symbol: String.fromCharCode(0xD83D, 0xDD28), x: 5, y: 8};
    var sword = {name: 'sword', life: 1, symbol: String.fromCharCode(0xD83D, 0xDDE1), x: 4, y: 13};
    var door = {symbol: String.fromCharCode(0xD83D, 0xDEAA), isOpen: false};
    var items = [key, hammer, sword];
    var objects = [player, key, hammer, monster, sword];
    var map = generateBaseMap();
    var playersItems = player.items;
    var level = 1;
    var monsterRests = false;
    var restCount = 0;

    player.life = 3;
    monster.dead = false;
    playersItems.push(
        {name: 'key', life: 0, symbol: key.symbol},
        {name: 'hammer', life: 0, symbol: hammer.symbol},
        {name: 'sword', life: 0, symbol: sword.symbol}
    );

    setPositionToObjects();
    clearPlayerColumnAndHammerRow();
    putItems();
    setDoor();

    function update() {
        pickUpItem();
        handleMonsterMovement();
        putItems();
        if (!monster.dead) {
            putMovableObject(monster);
        }
        handleBattle();
        changePlayerFace();
        putMovableObject(player);
        showStatus();
    }

    function generateBaseMap() {
        var innerMap = new Array(mapSize);

        for (var i = 0; i < mapSize; i++) {
            var oneRow = new Array(mapSize);

            for (var j = 0; j < mapSize; j++) {

                var lastIndex = mapSize - 1;

                /* first and last row should be wall */
                if (i == 0 || i == lastIndex) {
                    oneRow[j] = wall;
                } else {

                    /* choose wall or floor randomly */
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

    function printMap() {
        for (var i = 0; i < map.length; i++) {
            console.log(map[i].join(' '));
        }
    }

    function putItems() {
        items.forEach(function (item) {
            if (item.x !== -1 || item.y !== -1) {
                map[item.x][item.y] = item.symbol;
            }
        })
    }

    function putMovableObject(movableObject) {
        map[movableObject.x][movableObject.y] = movableObject.symbol;
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

    function clearPlayerColumnAndHammerRow() {
        map.forEach(function (rows, positionX) {
            rows.forEach(function (columns, positionY) {
                if (!isOuterWall(positionX, positionY) && (positionX === hammer.x || positionY === player.y)) {
                    map[positionX][positionY] = floor;
                }
            })
        })
    }

    function isOuterWall(positionX, positionY) {
        return positionX === 0 || positionX === 14 || positionY === 0 || positionY === 14;
    }

    /* to set the first positions randomly */
    function setPositionToObjects() {
        var firstIndexOfInnerMap = 1;
        var lastIndexOfInnerMap = 13;

        var length = objects.length;
        var i, j;
        for (i = 0; i < length; i++) {
            objects[i].x = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
            objects[i].y = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
            for (j = i + 1; j < length; j++) {
                var x = null;
                var y = null;
                while (x === null || y === null || (objects[i].x === x && objects[i].y === y)) {
                    x = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
                    y = getRandomInt(firstIndexOfInnerMap, lastIndexOfInnerMap);
                }
                objects[j].x = x;
                objects[j].y = y;
            }
        }
    }

    function showStatus() {
        var status = 'level:' + level + ', ' + String.fromCharCode(0x2665) + ' ' + player.life;
        for (var i = 0; i < playersItems.length; i++) {
            var playerItem = playersItems[i];
            status = status + ', ' + playerItem.symbol + ' ' + playerItem.life;
        }
        console.log(status);
    }

    /* to replace the symbols of the movable objects to floor when they move out from the tile */
    function replaceMovableObjectToFloor(movableObject) {
        map[movableObject.x][movableObject.y] = floor;
    }

    /* to replace object to floor when the player picked up or killed it */
    function replaceObjectToFloor(object) {
        map[object.x][object.y] = floor;
        object.x = -1;
        object.y = -1;
    }

    /* collision detection */
    function checkNextTile(direction, x, y) {
        var directionUp = map[x - 1][y];
        var directionLeft = map[x][y - 1];
        var directionDown = map[x + 1][y];
        var directionRight = map[x][y + 1];

        var available = false;
        var isDoor = false;
        var isWall = false;
        var isMonster = false;
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

    /*　check if player has the item */
    function checkIfPlayerHas(item) {
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
        door.isOpen = false;
        var keySearch = checkIfPlayerHas(key);
        var playersKey = keySearch.foundItem;
        if (playersKey.life > 0) {
            map[door.x][door.y] = floor;
            playersKey.life = playersKey.life - 1;
            door.isOpen = true;
            if (monster.x >= 0 && monster.y >= 0) {
                map[monster.x][monster.y] = floor;
            }
        }
        return {
            doorIsOpen: door.isOpen
        };
    }

    function smashWall(positionX, positionY) {
        var hammerSearch = checkIfPlayerHas(hammer);
        if (!isOuterWall(positionX, positionY) && hammerSearch.hasItem) {
            var playersHammer = hammerSearch.foundItem;
            if (playersHammer.life > 0) {
                map[positionX][positionY] = floor;
                playersHammer.life = playersHammer.life - 1;
            }
        }
    }

    function pickUpItem() {
        var pickedItem = null;
        items.forEach(function (item) {
            if (player.x === item.x && player.y === item.y) {
                var itemSearch = checkIfPlayerHas(item);
                if (itemSearch.hasItem) {
                    var playersItem = itemSearch.foundItem;
                    playersItem.life = playersItem.life + item.life;
                } else {
                    var newItem = {name: item.name, life: item.life};
                    playersItems.push(newItem);
                }
                pickedItem = item;
                replaceObjectToFloor(pickedItem);
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

    function attackMonster() {
        var swordSearch = checkIfPlayerHas(sword);
        var playersSword = swordSearch.foundItem;
        if (swordSearch.hasItem && playersSword.life > 0) {
            replaceObjectToFloor(monster);
            monster.dead = true;
            playersSword.life = playersSword.life - 1;
            player.symbol = String.fromCharCode(0xD83D, 0xDE04);
        }
    }

    function playerIsDead() {
        if (player.life <= 0) {
            return true;
        }
    }

    function goToNextRoom() {
        monster.dead = false;
        map = generateBaseMap();
        setPositionToObjects();
        console.log(monster.x + ', ' + monster.y);
        clearPlayerColumnAndHammerRow();
        putItems();
        setDoor();
        level++;
    }

    /* simple monster movement */
    function setMonsterPosition() {
        if (player.x > monster.x && checkNextTile('s', monster.x, monster.y).available) {
            monster.moveDown();
        } else if (player.y > monster.y && checkNextTile('d', monster.x, monster.y).available) {
            monster.moveRight();
        } else if (player.x < monster.x && checkNextTile('w', monster.x, monster.y).available) {
            monster.moveUp();
        } else if (player.y < monster.y && checkNextTile('a', monster.x, monster.y).available) {
            monster.moveLeft();
        }
    }

    function changePlayerFace() {
        if (playerIsDead()) {
            player.symbol = String.fromCharCode(0xD83D, 0xDE31)
        } else if (isNearMonster()) {
            player.symbol = String.fromCharCode(0xD83D, 0xDE2B);
        } else {
            player.symbol = String.fromCharCode(0xD83D, 0xDE04);
        }
    }

    function handleMonsterMovement() {
        if (!monster.dead && (!monsterRests || restCount > 2)) {
            replaceMovableObjectToFloor(monster);
            setMonsterPosition();
            monsterRests = false;
        }
    }

    function handleBattle() {
        if (metMonster()) {
            attackMonster(monster.x, monster.y);
            if (!monster.dead) {
                player.life = player.life - 1;
                restCount = 0;
                monsterRests = true;
            }
        }
        if (monsterRests) {
            restCount++;
        }
    }

    function getLevel() {
        return level;
    }

    return {
        player: player,
        update: update,
        replaceMovableObjectToFloor: replaceMovableObjectToFloor,
        checkNextTile: checkNextTile,
        printMap: printMap,
        openDoor: openDoor,
        smashWall: smashWall,
        attackMonster: attackMonster,
        playerIsDead: playerIsDead,
        goToNewRoom: goToNextRoom,
        getLevel: getLevel
    }
}
