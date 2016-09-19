var MovableObject = function (x, y) {

    var that = {};

    that.symbol = 'X';

    if (x === undefined) {
        that.x = 0;
    } else {
        that.x = x;
    }

    if (y === undefined) {
        that.y = 0;
    } else {
        that.y = y;
    }

    that.moveUp = function () {
        that.x = that.x - 1;
    };

    that.moveRight = function () {
        that.y = that.y + 1;
    };

    that.moveLeft = function () {
        that.y = that.y - 1;
    };

    that.moveDown = function () {
        that.x = that.x + 1;
    };

    return that;
};



