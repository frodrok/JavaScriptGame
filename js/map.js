var Map = function() {
    var that = {};

    var floor = String.fromCharCode(0x2B1C);
    var walls = String.fromCharCode(0x2B1B);
    that.player = new Player(3, 3);
    var monster = new Monster(6, 6);

    var key = {symbol: String.fromCharCode(0xD83D, 0xDD11), x: 10, y: 13};
    var hammer = {symbol: String.fromCharCode(0xD83D, 0xDD28), x: 5, y: 8};
    var door = {symbol: String.fromCharCode(0xD83D, 0xDEAA)};

    function generateBaseMap() {
        var innerMap = new Array(15);

        for (var i = 0; i < 15; i++) {
            var oneRow = new Array(15);

            for (var j = 0; j < 15; j++) {

                /* first and last row should be '#' for walls */
                if (i == 0 || i == 14) {
                    oneRow[j] = walls;
                } else {

                    var chosenTile = chooseFloorOrWall();

                    /* left most tile and right most tile should be wall */
                    if (j == 0 || j == 14) {
                        oneRow[j] = walls;
                    } else {
                        oneRow[j] = chosenTile;
                    }
                }
            }

            innerMap[i] = oneRow;
        }

        return innerMap;
    };

    function chooseFloorOrWall() {
        return Math.random() < 0.5 ? floor : walls;
    };

    that.map = generateBaseMap();

    function putPlayer() {
        that.map[that.player.x][that.player.y] = that.player.symbol;
    };

    function putMonster() {
        that.map[monster.x][monster.y] = monster.symbol;
    };

    function getRandomIntToCreateDoor(minNumber, maxNumber) {
        return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    };

    function setDoor() {
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

        that.map[door.x][door.y] = door.symbol;

    };

    function clearAreaAndPutHammer() {
        var areaToClear = [[hammer.x - 1, hammer.y - 1], [hammer.x, hammer.y], [hammer.x + 1, hammer.y + 1]];

        areaToClear.forEach(function(e) {
            that.map[e[0]][e[1]] = floor;
        });

        that.map[hammer.x][hammer.y] = hammer.symbol;
    };

    function clearMap() {
        /* TODO */
    };

    function isOuterWall(indexX, indexY) {

            return indexX === 0 || indexX === 14 || indexY === 0 || indexY === 14;
    };

    that.map[key.x][key.y] = key.symbol;

    clearAreaAndPutHammer();
    setDoor();

    that.printMap = function() {
        for (var i = 0; i < this.map.length; i++) {
            console.log(this.map[i].join(' '));
        }
    };

    /* a start of collision detection, for now it only checks for walls */
    that.isAvailable = function(direction, x, y) {
        console.log(direction);
        var available = false;
        if (direction === 'w') {
            if (that.map[x-1][y] === walls) {
                available = false;
            } else {
                available = true;
            }
        } else if (direction === 'a') {
            if (that.map[x][y-1] === walls) {
                available = false;
            } else {
                available = true;
            }
        } else if (direction === 's') {
            if (that.map[x+1][y] === walls) {
                available = false;
            } else {
                available = true;
            }
        } else if (direction === 'd') {
            if (that.map[x][y+1] === walls) {
                available = false;
            } else {
                available = true;
            }
        }

        return available;
    }

    that.update = function() {
        // clearMap();
        putPlayer();
        putMonster();
        console.log("updated, player.x:" + that.player.x + ", p.y:" + that.player.y);
    };

    return that;
};
