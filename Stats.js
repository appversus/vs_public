
var Stats = function (arr) {
    console.log(arr)
    this.stats_div = $("<div id='stats'>").appendTo("#world_container");

    //med
    this.stats_div.append("<div class='med'>");

    var data = {};
    for (var i = 0; i < 2; i++) {
        data["v" + (i + 1)] = {
            countries: 0,
            points: 0
        };
    }

    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if (obj.v1 > obj.v2) {
            data.v1.countries++;
        } else if (obj.v2 > obj.v1) {
            data.v2.countries++;
        }
        data.v1.points += obj.v1 / (obj.v1 + obj.v2);
        data.v2.points += obj.v2 / (obj.v1 + obj.v2);
    }

    data.v1.total = data.v1.points / (data.v1.points + data.v2.points);
    data.v2.total = data.v2.points / (data.v1.points + data.v2.points);

    this.stat(data.v1, 1);
    this.stat(data.v2, 2);
};

Stats.prototype.stat = function (data, n) {
    var stat_div = $("<div class='stat'>").appendTo(this.stats_div);
    var index = stat_div.index(".stat");

    //img
    stat_div.append("<div class='img' style='background-image:url(img/opt" + (index + 1) + ".jpg)'>");

    //punct:
    var p = parseInt(data.total * 100);

    //countries
    var countries = $("<div class='countries'>").appendTo(stat_div);
    countries.text(data.countries);

    var background = "rgb(255,70,70)";
    if (2 == n) {
        background = "rgb(70,70,255)";
    }
    stat_div.append("<div class='punct'><div class='barInner' style='height:" + p + "%; background-color:" + background + "' data-points:" + data.points + "></div></div>");

};
