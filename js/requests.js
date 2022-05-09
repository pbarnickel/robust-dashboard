function requestData() {
    var request = $.ajax({
        url: "/php/scripts/loadData.php",
        method: "GET",
    });

    request.done(function (sMsg) {
        $.getJSON("/js/data/RBT.json", function (oJSON) {
            oDataRBT = oJSON;
            $.when(initTableRBT()).then(function () {
                $('#bpsRbtMainTable').parent().addClass('table-responsive');
                $.when(initChartsRBT()).then(function (){
                    $('#bpsSpinnerRBT').fadeOut();
                });
            });

            $.getJSON("/js/data/RBS.json", function (oJSON) {
                oDataRBS = oJSON;
                $.when(initTableRBS()).then(function () {
                    $('#bpsRbsMainTable').parent().addClass('table-responsive');
                    $.when(initChartsRBS()).then(function (){
                        $('#bpsSpinnerRBS').fadeOut();
                    });
                });
            });
        });
    });

    request.fail(function (jqXHR, textStatus) {
        p("Request failed for loading data");
    });
}

function updateData() {
    var request = $.ajax({
        url: "/php/scripts/updateData.php",
        method: "GET",
    });

    request.done(function (sMsg) {
    });

    request.fail(function (jqXHR, textStatus) {
        p("Request failed for updating data");
    });
}