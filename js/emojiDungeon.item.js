emojiDungeon.item = function () {

    var item = {
        name: 'item',
        lite: 1,
        symbol: '*',
        x: 6,
        y: 6
    };

    var key = Object.create(item);
    key.name = 'key';
    key.life = 1;
    key.symbol = String.fromCharCode(0xD83D, 0xDD11);

    var hammer = Object.create(item);
    hammer.name = 'hammer';
    hammer.life = 3;
    hammer.symbol = String.fromCharCode(0xD83D, 0xDD28);

    var sword = Object.create(item);
    sword.name = 'sword';
    sword.life = 1;
    sword.symbol = String.fromCharCode(0xD83D, 0xDDE1);

    return {
        key: key,
        hammer: hammer,
        sword: sword
    }
};