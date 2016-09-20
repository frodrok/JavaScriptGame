emojiDungeon.movableObject = function () {

    function createMovableObject(symbol) {
        return {
            x: -1,
            y: -1,
            symbol: symbol,
            moveUp: function moveUp() {
                this.x = this.x - 1;
            },
            moveRight: function moveRight() {
                this.y = this.y + 1;
            },
            moveLeft: function moveLeft() {
                this.y = this.y - 1;
            },
            moveDown: function moveDowm() {
                this.x = this.x + 1;
            }
        }
    }

    function createPlayer() {
        var that = createMovableObject(String.fromCharCode(0xD83D, 0xDE04));

        that.life = 3;
        that.items = [];
        that.items.push(
            {name: 'key', life: 0, symbol: emojiDungeon.item().key.symbol},
            {name: 'hammer', life: 0, symbol: emojiDungeon.item().hammer.symbol},
            {name: 'sword', life: 0, symbol: emojiDungeon.item().sword.symbol}
        );
        return that;
    }

    var player = createPlayer();
    var monster = createMovableObject(String.fromCharCode(0xD83D, 0xDC79));

    return {
        player: player,
        monster: monster
    }
};