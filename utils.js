
//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b) {
    //console.log(r + "," + g + "," + b)
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getArrKey(arr, key, val) { //cn, "AF"
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == val) {
            return arr[i];
        }
    }
}

function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}
