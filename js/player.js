var Player = function (x, y) {

    var that = MovableObject(x, y);

    that.symbol = String.fromCharCode(0xD83D, 0xDE04);
    that.items = [];
    return that;
};
