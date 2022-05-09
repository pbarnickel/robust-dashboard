const RBT_INIT_TOTAL_SUPPLY = 100000;
const RBT_LOCKED_SUPPLY = 50000;
const RBT_MANUALLY_BURN = 4950;
var oTableRBT;
var oTableRBS;
var oDataRBT;
var oDataRBS;

$(document).ready(function () {
    feather.replace()
    initHeadlines();
    requestData();
});

function p(sText) {
    console.log(sText);
}

function convertDate(sDate) {
    if (sDate) {
        return sDate.substr(6, 4) + '/' + sDate.substr(3, 2) + '/' + sDate.substr(0, 2);
    }
    return sDate;
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
    $('#bpsHome *').css('display', '');
});