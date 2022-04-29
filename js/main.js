$(document).ready(function () {

    feather.replace();
    initHeadlines();

    aHistoryData = $.getJSON("/js/data.json", function (oJSON) {
        initChartBurnHistory(oJSON);
        initChartBurnHistoryCurrentYear(oJSON);
        initChartTotalBurnHistory(oJSON);
        initChartBurnHistoryMonthly(oJSON);
        initChartBurnHistoryMonthlyCurrentYear(oJSON);
    });
});

$('.bpsMenuItem').click(function() {
    $('#content div').hide();
    var oTarget = '#' + $(this).data('target');
    $(oTarget).show();
});

function initHeadlines(){
    var iCurrentYear = new Date().getFullYear();
    $('#bpsHdlC3').html('RBT Burned Daily for ' + iCurrentYear);
    $('#bpsMenuItemC3').html(feather.icons['trending-up'].toSvg() + ' RBT Burned Monthly ' + iCurrentYear);
    $('#bpsHdlC5').html('RBT Burned Monthly for ' + iCurrentYear);
    $('#bpsMenuItemC5').html(feather.icons['trending-up'].toSvg() + ' RBT Burned Monthly ' + iCurrentYear);
}

function p(sText) {
    console.log(sText);
}

// chart 1
function initChartBurnHistory(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        aData.push({
            x: oJSON[i].Date,
            y: oJSON[i].Burned
        });
    }

    const data = {
        datasets: [{
            label: 'RBT Burned',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartBurnHistory = new Chart(
        document.getElementById('idChartBurnHistory'),
        config
    );
}

// chart 3
function initChartBurnHistoryCurrentYear(oJSON) {

    var aData = [];

    var iCurrentYear = new Date().getFullYear();
    for (var i = oJSON.length - 1; i > -1; i--) {
        if (oJSON[i].Date.indexOf(iCurrentYear.toString()) > -1) {
            aData.push({
                x: oJSON[i].Date,
                y: oJSON[i].Burned
            });
        }
    }

    const data = {
        datasets: [{
            label: 'RBT Burned',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartBurnHistoryCurrentYear = new Chart(
        document.getElementById('idChartBurnHistoryCurrentYear'),
        config
    );
}


// chart 2
function initChartTotalBurnHistory(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        aData.push({
            x: oJSON[i].Date,
            y: oJSON[i].Total
        });
    }

    const data = {
        datasets: [{
            label: 'RBT Burned',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartTotalBurnHistory = new Chart(
        document.getElementById('idChartTotalBurnHistory'),
        config
    );
}

// chart 4
function initChartBurnHistoryMonthly(oJSON) {

    var aData = [];
    var sKey;
    var bFound;

    for (var i = oJSON.length - 1; i > -1; i--) {

        sKey = oJSON[i].Date.substring(3);

        bFound = false;
        for (var j = 0; j < aData.length; j++) {
            if (aData[j].x === sKey) {
                aData[j].y = String(parseFloat(aData[j].y) + parseFloat(oJSON[i].Burned));
                bFound = true;
                break;
            }
        }
        if (!bFound) {
            aData.push({
                x: sKey,
                y: oJSON[i].Burned
            });
        }
    }

    const data = {
        datasets: [{
            label: 'RBT Burned',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartBurnHistoryMonthly = new Chart(
        document.getElementById('idChartBurnHistoryMonthly'),
        config
    );
}

// chart 5
function initChartBurnHistoryMonthlyCurrentYear(oJSON) {

    var aData = [];
    var sKey;
    var bFound;

    var iCurrentYear = new Date().getFullYear();
    for (var i = oJSON.length - 1; i > -1; i--) {

        if (oJSON[i].Date.indexOf(iCurrentYear.toString()) > -1) {

            sKey = oJSON[i].Date.substring(3);

            bFound = false;
            for (var j = 0; j < aData.length; j++) {
                if (aData[j].x === sKey) {
                    aData[j].y = String(parseFloat(aData[j].y) + parseFloat(oJSON[i].Burned));
                    bFound = true;
                    break;
                }
            }
            if (!bFound) {
                aData.push({
                    x: sKey,
                    y: oJSON[i].Burned
                });
            }
        }
    }

    const data = {
        datasets: [{
            label: 'RBT Burned',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartBurnHistoryMonthlyCurrentYear = new Chart(
        document.getElementById('idChartBurnHistoryMonthlyCurrentYear'),
        config
    );
}