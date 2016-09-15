var Map = function() {
    var that = {};

    var floor = String.fromCharCode(0x2B1C);
    var walls = String.fromCharCode(0x2B1B);
    that.player = new Player(3, 3);
    var monster = new Monster(6, 6);
    var mapSize = 15;

    var key = {symbol: String.fromCharCode(0xD83D, 0xDD11), x: 10, y: 13};
    var hammer = {symbol: String.fromCharCode(0xD83D, 0xDD28), x: 5, y: 8, pickedUp: false};
    var door = {symbol: String.fromCharCode(0xD83D, 0xDEAA)};

    function generateBaseMap() {
        var currentInnerWalls = 0; /* there's too many walls inside i think, i always get stuck */
        var innerMap = new Array(mapSize);

        for (var i = 0; i < mapSize; i++) {
            var oneRow = new Array(mapSize);

            for (var j = 0; j < mapSize; j++) {

                /* first and last row == walls */
                if (i == 0 || i == mapSize - 1) {
                    oneRow[j] = walls;
                } else {

                    var chosenTile = chooseFloorOrWall();

                    /* left most tile and right most tile == wall */
                    if (j == 0 || j == mapSize - 1) {
                        oneRow[j] = walls;
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
        /* we can increase factor here for less or more walls,
         * 0 = all walls, 0.5 = 50% walls, 0.65 = 35% walls */
        return Math.random() < 0.75 ? floor : walls;
    }

    that.map = generateBaseMap();

    function putPlayer() {
        var p = that.player;
        if (p.x === hammer.x && p.y === hammer.y) {
            p.hasHammer = true;
            hammer.pickedUp = true;
        }
        that.map[that.player.x][that.player.y] = that.player.symbol;
    }

    function putMonster() {
        that.map[monster.x][monster.y] = monster.symbol;
    }

    function getRandomIntBetween(minNumber, maxNumber) {
        return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    }

    function setDoor() {
        door.x = getRandomIntBetween(0, 15);
        var doorPositionChoice = getRandomIntBetween(0,15);
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

        that.map[door.x][door.y] = door.symbol;

    }



    function putHammer() {
        if (hammer.pickedUp === false) {
            that.map[hammer.x][hammer.y] = hammer.symbol;
        }
    }

    function clearMap() {
        /* TODO */
    }

    function isOuterWall(indexX, indexY) {

            return indexX === 0 || indexX === 14 || indexY === 0 || indexY === 14;
    }

    that.map[key.x][key.y] = key.symbol;

    putHammer();
    setDoor();

    that.printMap = function() {
        for (var i = 0; i < that.map.length; i++) {
            console.log(that.map[i].join(' '));
        }
    };

    /* a start of collision detection, for now it only checks for walls */
    that.isAvailable = function(direction, x, y) {
        console.log(direction);
        var available = false;
        if (direction === 'w') {
            available = that.map[x - 1][y] !== walls;
        } else if (direction === 'a') {
            available = that.map[x][y - 1] !== walls;
        } else if (direction === 's') {
            available = that.map[x + 1][y] !== walls;
        } else if (direction === 'd') {
            available = that.map[x][y + 1] !== walls;
        }

        return available;
    };

    function logStatus() {
        console.log("p.x: " + that.player.x + ", p.y: " + that.player.y + ", hasHammer: " + that.player.hasHammer);
        console.log("m.x: " + monster.x + ", m.y: " + monster.y);

    }
    that.replacePlayerToFloor = function () {
        that.map[monster.x][monster.y] = floor;
        that.map[that.player.x][that.player.y] = floor;
    };

    that.replaceOldTiles = function () {
        that.map[that.player.x][that.player.y] = floor;
        that.map[monster.x][monster.y] = floor;
    };

    that.update = function() {
        // clearMap();
        // that.replaceOldTiles();
        putPlayer();
        putMonster();
        putHammer();

        logStatus();
    };

    that.moveMonster = function () {
        var moveX = getRandomIntBetween(0, 2);
        var moveY = getRandomIntBetween(0, 2);

        switch (moveY) {
            case 0:
                if (that.isAvailable('w', monster.x, monster.y)) {
                    monster.moveUp();
                }
                break;
            case 1: break; /* dont move on the X axis */
            case 2:
                if (that.isAvailable('s', monster.x, monster.y)) {
                    monster.moveDown();
                }
                break;
            default: throw new Error("value was way off");
        }

        switch (moveX) {
            case 0:
                if (that.isAvailable('a', monster.x, monster.y)) {
                    monster.moveLeft();
                }
                break;
            case 1: break; /* dont move on the Y axis */
            case 2:
                if (that.isAvailable('d', monster.x, monster.y)) {
                    monster.moveRight();
                }
                break;
            default: throw new Error("value was way off");
        }


    };

    return that;
};
