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

    setObjectsLocation();
    clearPlayerColumnAndHammerRow();
    // clearAreaAndPutHammer();
    putItems();
    // map[key.x][key.y] = key.symbol;
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

    function putItems(){
        items.forEach(function(item){
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

    // function clearAreaAndPutHammer() {
    //     // var areaToClear = [[hammer.x - 1, hammer.y - 1], [hammer.x, hammer.y], [hammer.x + 1, hammer.y + 1]];
    //     //
    //     // areaToClear.forEach(function (e) {
    //     //     map[e[0]][e[1]] = floor;
    //     // });
    //
    //     map[hammer.x][hammer.y] = hammer.symbol;
    // }

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
        putMonster();
        var pickedItem = pickItem();
        if (pickedItem != null) {
            replaceItemToFloor(pickedItem)
        }
        if (metMonster()) {
            //TODO: action to attack the monster
            console.log('met monster');
        }
        putPlayer();
        showStatus();
        // console.log('updated, player.x:' + player.x + ', p.y:' + player.y );
    }

    function showStatus() {
        var basicStatus = 'updated, player.x:' + player.x + ', p.y:' + player.y;
        var playerItems = player.items;
        for (var i = 0; i < playerItems.length; i++) {
            var playerItem = playerItems[i];
            if (!basicStatus.includes(playerItem.name)) {
                basicStatus = basicStatus + ', ' + playerItem.name + ':' + playerItem.life;
            }
        }
        console.log(basicStatus);
    }

    function replacePlayerToFloor() {
        map[player.x][player.y] = floor;
    }

    function replaceItemToFloor(pickedItem) {
        map[pickedItem.x][pickedItem.y] = floor;
    }

    /* a start of collision detection, for now it only checks for walls */
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
            if(hammerLife > 0){
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

    function printMap() {
        for (var i = 0; i < map.length; i++) {
            console.log(map[i].join(' '));
        }
    }

    return {
        player: player,
        update: update,
        replacePlayerToFloor: replacePlayerToFloor,
        checkNextTile: checkNextTile,
        printMap: printMap,
        openDoor: openDoor,
        smashWall: smashWall
    }
}
