function requestData() {
    var request = $.ajax({
        url: "/php/scripts/loadData.php",
        method: "POST",
        data: {}
    });

    request.done(function (msg) {
        $.getJSON("/js/data/RBT.json", function (oJSON) {
            //TODO
        });
    });

    request.done(function (msg) {
        $.getJSON("/js/data/RBS.json", function (oJSON) {
            //TODO
        });
    });

    request.fail(function (jqXHR, textStatus) {
        p("Request failed for loading data");
    });
}