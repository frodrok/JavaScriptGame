var Monster = function (x, y) {
    var that = MovableObject(x, y);

    that.symbol = String.fromCharCode(0xD83D, 0xDC79);

    return that;
};


