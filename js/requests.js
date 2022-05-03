function requestData() {
    var request = $.ajax({
        url: "/php/scripts/loadData.php",
        method: "GET",
    });

    request.done(function (sMsg) {
        $.getJSON("/js/data/RBT.json", function (oJSON) {
            oDataRBT = oJSON;
            $('.bpsSpinnerRBT').remove();
            initTableRBT();
        });
    });

    /*request.done(function (sMsg) {
        $.getJSON("/js/data/RBS.json", function (oJSON) {
            oDataRBS = oJSON;
            initTableRBS();
        });
    });*/

    request.fail(function (jqXHR, textStatus) {
        p("Request failed for loading data");
    });
}