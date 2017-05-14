
//var userLang = getUserLang();
var Translate = function (lang) {
    if (!lang) {
        lang = navigator.language || navigator.userLanguage;
    }
    this.lang = lang;

    this.languagePaths = {};
    if (window.languagePaths) {
        this.languagePaths = window.languagePaths;
    }
};

Translate.prototype.translateTags = function (refresh) {
    var _this = this;

    if (window.lang && !refresh) {
        console.log("!refresh translateTags");
        this.loadTranslations();
        return;
    }

    console.log("translateTags() " + obj_size(this.languagePaths));
    var loaded = 0;
    for (var path in this.languagePaths) {
        this.loadLanguage(path, function () {
            loaded++;
            console.log("loaded " + loaded);
            if (obj_size(this.languagePaths) == loaded) {
                _this.loadTranslations(refresh);
            }
        });
    }
};

Translate.prototype.loadLanguage = function (path, callback) {
    var _this = this;
    if (!window.lang) {
        window.lang = {};
    }

    this.languagePaths[path] = 1;

    //http://papaparse.com/
    var first = true;
    var pos = 1;
    requirejs(["text!" + path + "/lang.csv"], function (data) {
        if (!data) {
            console.log("ERROR NOT DATA IN " + path + "/lang.csv");
            return;
        }

//        try {
        //console.log(data)
        Papa.parse(data, {
            step: function (results) {
                if (first) {
                    for (var i = 1; i < results.data[0].length; i++) {
                        if (_this.lang.toLowerCase()
                                == results.data[0][i].toLowerCase()) {
                            pos = i;
                            break;
                        }
                    }
                    first = false;
                    return;
                }

                var key = results.data[0][0];
                if (key && key[0] !== "/") {
                    var result = results.data[0][pos];
                    //english[1] if not found language:
                    if (!result) {
                        result = results.data[0][1];
                    }
                    lang[key] = result;
                    $("[data-lang='" + key + "']").html(lang[key]); //translate them!
                }
            },
            complete: function () {
                if (callback) {
                    callback();
                }
            }, error: function (e, file) {
                console.log("PAPA.PARSE ERROR: " + e.code + " in " + file);
            }
        });
//        } catch (e) {
//            console.log("CATCH PAPA.PARSE ERROR: " + e.message);
//        }
    });
};

Translate.prototype.loadTranslations = function (refresh) {
    console.log("loadTranslations() " + refresh)
    if (!window.lang) {
        console.log("!window.lang");
        return;
    }

    $("[data-lang]").each(function () {
        var textKey = $(this).attr("data-lang");

        //prevent re-translate
        if ($(this).text() && !refresh && $(this).text() != textKey) {
            //console.log($(this).text() + " != " + textKey)
            return true; //continue
        }

        var translation = window.lang[textKey];
        if (translation) {
            $(this).html(translation);
        } else {
            $(this).html(textKey);
            console.log(textKey + " not have translation!");
        }
        //remove lang 4 prevent re-translate
        //$(this).removeAttr("data-lang");
    });

    $("[data-placeholder]").each(function () {
        var textKey = $(this).attr("data-placeholder");
        var translation = window.lang[textKey];
        if (translation) {
            $(this).attr("placeholder", translation);
        } else {
            $(this).attr("placeholder", translation);
            console.log(textKey + " not have translation!");
        }
        //remove lang 4 prevent re-translate
        $(this).removeAttr("data-placeholder");
    });
};
