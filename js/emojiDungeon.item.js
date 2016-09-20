emojiDungeon.item = function () {

    function createItem(name, life, symbol){
        return {
            name: name,
            life: life,
            symbol: symbol,
            x: -1,
            y: -1
        }
    }

    var key = createItem('key', 1, String.fromCharCode(0xD83D, 0xDD11));
    var hammer = createItem('hammer', 3, String.fromCharCode(0xD83D, 0xDD28));
    var sword = createItem('sword', 1, String.fromCharCode(0xD83D, 0xDDE1));

    return {
        key: key,
        hammer: hammer,
        sword: sword
    }
};