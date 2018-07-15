var input = [4,2,3,2,5,0,1,3];
// function randomInteger(min, max) {
//     var rand = min - 0.5 + Math.random() * (max - min + 1)
//     rand = Math.round(rand);
//     return rand;
// }
//
// var input = [];
// for (var i = 0; i < 100000; i++){
//     input.push(randomInteger(0, 100000));
// }

var drawBlock = function (x, y, type) {
    var elem = document.getElementById('sn' + x + '-' + y).classList;
    elem.add('j_' + type);
};

var drawLine = function (sandBlocks, level, x) {
    for (var i = 0; i < sandBlocks; i++) {
        drawBlock(x, i, 'sand');
    }
    for (var i = sandBlocks; i < level; i++) {
        drawBlock(x, i, 'water');
    }
};

var calcWater = function (mas) {
    var obj = [],
        max = {
            height: 0,
            index: 0,
        },
        waterBlocks = 0;

    for (var i = 0; i < mas.length; i++) {
        if (mas[i] > max.height) {
            max.height = mas[i];
            max.index = i;
        }
        obj.push({
            height: mas[i],
            index: i
        })

    }
    var currMax = obj[0];
    for (var i = 0; i <= max.index; i++) {
        if (obj[i].height > currMax.height) {
            currMax = obj[i];
        }

        drawLine(obj[i].height, currMax.height, i);
        waterBlocks += (currMax.height - obj[i].height)
    }
    currMax = obj[obj.length - 1];


    for (var i = obj.length - 1; i >= max.index; i--) {
        if (obj[i].height > currMax.height) {
            currMax = obj[i];
        }

        drawLine(obj[i].height, currMax.height, i);
        waterBlocks += (currMax.height - obj[i].height)
    }
    console.log('waterBlocks ' + waterBlocks);
    return waterBlocks;
}

calcWater(input);