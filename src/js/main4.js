// var input = [1, 5, 3, 4, 3, 1, 15, 1, 15, 15, 10, 2, 4, 10, 10, 1, 2, 1, 1, 4, 1, 9, 1, 1, 2, 5, 3, 4, 3, 1, 15, 1, 15, 15, 10, 2, 4, 10, 10, 1, 2, 1, 1, 4, 1, 9, 1, 1, 2, 5, 3, 4, 3, 1, 15, 1, 15, 15, 10, 2, 4, 10, 10, 1, 2, 1, 1, 4, 1, 9, 1, 1, 2, 5, 3, 4, 3, 1, 15, 1, 15, 15, 10, 2, 4, 10, 10, 1, 2, 1, 1, 4, 1, 9, 1, 1, 2, 5, 3, 4, 3, 1, 15, 1, 15, 15, 10, 2, 4, 10, 10, 1, 2, 1, 1, 4, 1, 9, 1, 1, 2];
var input = [4, 2, 3, 2, 5, 0, 1, 3];

var maxCalls = 0;
var getMaxOfArray = function (numArray) {
    maxCalls++;
    console.log('max has been called ' + maxCalls);
    return Math.max.apply(null, numArray.slice());

};

var drawBlock = function (x, y, type) {
    var elem = document.getElementById('sn' + x + '-' + y).classList;
    elem.add('j_' + type);
};

var drawLine = function (sandBlocks, level, x) {
    var waterBlocks = 0;
    for (var i = 0; i < sandBlocks; i++) {
        drawBlock(x, i, 'sand');
    }
    for (var i = sandBlocks; i < level; i++) {
        drawBlock(x, i, 'water');
        waterBlocks++;
    }
    return waterBlocks;
};

var drawArea = function (sandMas, firstIndex, secondIndex, level) {
    var waterBlocks = 0;
    for (var i = Math.min(firstIndex, secondIndex); i <= Math.max(firstIndex, secondIndex); i++) {
        waterBlocks += drawLine(sandMas[i], level, i);
    }
    return waterBlocks;
}

var calcWater = function (sandMas) {
    function Point() {
        this.refresh = function (first, second, reverse = false) {
            this.sandMasBite = sandMas.slice(first, second);
            this.sand = getMaxOfArray(this.sandMasBite);
            if (reverse) {
                this.index = sandMas.lastIndexOf(this.sand);
                this.index = this.index == -1 ? sandMas.length : this.index;
            } else {
                this.index = sandMas.indexOf(this.sand);
            }
        }
    }

    var firstPoint = new Point(),
        secondPoint = new Point(),
        waterBlocks = 0;

    firstPoint.refresh();
    console.log(firstPoint);
    var hasFilled = false;
    while (!hasFilled) {
        secondPoint.refresh(0, firstPoint.index);
        waterBlocks += drawArea(sandMas, firstPoint.index, secondPoint.index, secondPoint.sand);
        if (secondPoint.index == 0) {
            hasFilled = true;
        } else {
            firstPoint.index = secondPoint.index;
        }

    }
    hasFilled = false;
    firstPoint.refresh();
    while (!hasFilled) {
        secondPoint.refresh(firstPoint.index + 1, sandMas.length, true);
        console.log(secondPoint)
        waterBlocks += drawArea(sandMas, firstPoint.index, secondPoint.index, secondPoint.sand);
        if (secondPoint.index == sandMas.length) {
            hasFilled = true;
        } else {
            firstPoint.index = secondPoint.index;
        }
    }
    console.log(waterBlocks);
}

calcWater(input);