const RBT_INIT_TOTAL_SUPPLY = 100000;
const RBT_LOCKED_SUPPLY = 50000;
const RBT_MANUALLY_BURN = 4950;
var oDataRBT;
var oDataRBS;

$(document).ready(function () {
    feather.replace()
    initHeadlines();
    $.when(requestData()).then(function () {
        //initTables();
        //initCharts();
    });
});

function p(sText) {
    console.log(sText);
}

function initHeadlines() {
    var iCurrentYear = new Date().getFullYear();
    $('#bpsHdlRbtC3').html('RBT Burned Daily ' + iCurrentYear);
    $('#bpsMenuItemRbtC3').html(feather.icons['trending-up'].toSvg() + ' RBT Burned Daily ' + iCurrentYear);
    $('#bpsHdlRbtC5').html('RBT Burned Monthly ' + iCurrentYear);
    $('#bpsMenuItemRbtC5').html(feather.icons['trending-up'].toSvg() + ' RBT Burned Monthly ' + iCurrentYear);
}

$('.bpsMenuItem').click(function () {
    $('#content div').hide();
    var oTarget = '#' + $(this).data('target');
    $(oTarget).show();
});

$('#bpsMenuItemHome').click(function () {
    var sNewHtml = $('#bpsHome').html().replaceAll(' style="display: none;"', '');
    $('#bpsHome').html(sNewHtml);
});