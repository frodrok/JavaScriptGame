console.log("start");

document.onkeydown = checkKey;

var map = generateArray();

map[3][3] = '@';

function checkKey(e) {

    e = e || window.event;

    console.log(e);

    if (e.keyCode == '38') {
        console.clear();
        printArray(map);

    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
        // left arrow
    }
    else if (e.keyCode == '39') {
        // right arrow
    }
}

function printArray(multiArray) {
    for(var i = 0; i < multiArray.length; i++) {
        console.log(i + " " + multiArray[i].join(" "));
    }
    // console.log(multiArray);
}

function generateArray() {
    var wholeArray = new Array(15);
    for (var i = 0; i < 15; i++) {
        var oneRow = new Array(15);
        for(var j = 0; j < 15; j++) {
            oneRow[j] = '#';
        }
        wholeArray[i] = oneRow;
    }

    return wholeArray;
}