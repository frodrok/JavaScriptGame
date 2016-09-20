emojiDungeon.randomUtils = function () {

    var getRandomInt = function (minNumber, maxNumber) {
        return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    };

    var chooseBetween = function (thing1, thing2) {
        return Math.random() < 0.5 ? thing1 : thing2;
    };

    return {
        getRandomInt: getRandomInt,
        chooseBetween: chooseBetween
    }
};
