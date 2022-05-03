function requestData() {
    var request = $.ajax({
        url: "/php/scripts/loadData.php",
        method: "POST",
        data: {}
    });

    request.done(function (sMsg) {
        p(sMsg);
        $.getJSON("/js/data/RBT.json", function (oJSON) {
            debugger;
        });
    });

    request.done(function (sMsg) {
        p(sMsg);
        $.getJSON("/js/data/RBS.json", function (oJSON) {
            debugger;
        });
    });

    request.fail(function (jqXHR, textStatus) {
        p("Request failed for loading data");
    });
}