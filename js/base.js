console.log("start");

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    console.log(e);

    if (e.keyCode == '38') {
        // up arrow
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

    console.log(multiArray.join());
}

function generateArray() {
    var firstRow = ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#' ];
    var wholeArray = [firstRow, firstRow, firstRow, firstRow, firstRow,
        firstRow, firstRow,firstRow,firstRow,firstRow,
        firstRow,firstRow,firstRow,firstRow,firstRow];

    return wholeArray;
}

printArray(generateArray());