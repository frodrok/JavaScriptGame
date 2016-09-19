function getRandomInt(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
}

function chooseBetween(thing1, thing2) {
    return Math.random() < 0.5 ? thing1 : thing2;
}