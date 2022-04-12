$(document).ready(function () {
    aHistoryData = $.getJSON("/js/data.json", function (oJSON) {
        initChartBurnHistory(oJSON);
        initChartBurnHistoryCurrentYear(oJSON);
        initChartTotalBurnHistory(oJSON);
    });

    $('#collapseTable').collapse('show');
    var iCurrentYear = new Date().getFullYear();
    $('#btnChart3').html('Daily RBT Burned - Graph for ' + iCurrentYear);
});

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

function onClickTable(oEvent) {
    $('#collapseChart1').collapse('hide');
    $('#collapseChart2').collapse('hide');
    $('#collapseChart3').collapse('hide');
    $('#btnTable').removeClass('btn-secondary').addClass('btn-dark');
    $('#btnChart1').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart2').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart3').removeClass('btn-dark').addClass('btn-secondary');
}

function onClickChart1(oEvent) {
    $('#collapseTable').collapse('hide');
    $('#collapseChart2').collapse('hide');
    $('#collapseChart3').collapse('hide');
    $('#btnTable').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart1').removeClass('btn-secondary').addClass('btn-dark');
    $('#btnChart2').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart3').removeClass('btn-dark').addClass('btn-secondary');
}

function onClickChart2(oEvent) {
    $('#collapseTable').collapse('hide');
    $('#collapseChart1').collapse('hide');
    $('#collapseChart3').collapse('hide');
    $('#btnTable').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart1').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart2').removeClass('btn-secondary').addClass('btn-dark');
    $('#btnChart3').removeClass('btn-dark').addClass('btn-secondary');
}

function onClickChart3(oEvent) {
    $('#collapseTable').collapse('hide');
    $('#collapseChart1').collapse('hide');
    $('#collapseChart2').collapse('hide');
    $('#btnTable').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart1').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart2').removeClass('btn-dark').addClass('btn-secondary');
    $('#btnChart3').removeClass('btn-secondary').addClass('btn-dark');
}