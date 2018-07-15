var input = [1, 2, 4, 4, 3, 4, 2, 3, 5, 0, 4, 1, 3]
var masToObj = function (mas) {
    var obj = [],
        max = {
            height: 0,
            index: 0,
            border: true

        }
    for (var i = 0; i < mas.length; i++) {
        if (mas[i] > max.height) {
            max.height = mas[i];
            max.index = i;
        }
        obj.push({
            height: mas[i],
            index: i,
            border: false
        })

    }
    var currMax = obj[0].height;
    for (var i = 1; i < max.index; i++) {
        if (obj[i].height > currMax) {
            currMax = obj[i].height;
        }


    }
    currMax = obj[obj.length - 1].height;
    for (var i = obj.length - 1; i > max.index; i--) {
        if (obj[i].height > currMax) {
            currMax = obj[i].height;
        }
    }
}
masToObj(input);

