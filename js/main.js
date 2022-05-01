const RBT_INIT_TOTAL_SUPPLY = 100000;
const RBT_LOCKED_SUPPLY = 50000;
const RBT_MANUALLY_BURN = 4950;
var oRbtData;

function p(sText) {
    console.log(sText);
}

$(document).ready(function () {
    initDisplayConfiguration();
    initTableFunctions();
    oRbtData = $('#bpsRbtMainTable').DataTable().data();
    initHeadlines();
    initCharts();
});

$('.bpsMenuItem').click(function () {
    $('#content div').hide();
    var oTarget = '#' + $(this).data('target');
    $(oTarget).show();
});

$('#bpsMenuItemT1').click(function () {
    $('#bpsRbtMainTable').DataTable().clear();
    $('#bpsRbtMainTable').DataTable().destroy();
    initTableFunctions();
    $('#bpsRbtMainTable').DataTable().clear().rows.add(oRbtData).draw();
});

$('#bpsMenuItemHome').click(function () {
    var sNewHtml = $('#bpsHome').html().replaceAll(' style="display: none;"', '');
    $('#bpsHome').html(sNewHtml);
});

function initDisplayConfiguration() {

    //icons
    feather.replace();

    //responsive table
    $('#bpsRbtMainTable').parent().addClass('bpsScrollable');

}

function initTableFunctions() {
    $('#bpsRbtMainTable').DataTable({
        columnDefs: [{
                targets: 1,
                type: 'num-fmt'
            },
            {
                targets: 2,
                type: 'num-fmt'
            },
            {
                targets: 3,
                type: 'num-fmt'
            },
            {
                targets: 4,
                type: 'num-fmt'
            }
        ],
        pageLength: 50,
        responsive: true,
        language: {
            emptyTable: 'No data available',
            info: '_START_ to _END_ of _TOTAL_',
            infoEmpty: '0 to 0 of 0',
            infoFiltered: '(Filtered _MAX_)',
            lengthMenu: 'Show _MENU_',
            loadingRecords: 'Data loading...',
            processing: '...',
            search: '',
            searchPlaceholder: 'Search',
            zeroRecords: 'No data found',
            paginate: {
                first: 'Start',
                last: 'End',
                next: 'Forward',
                previous: 'Back'
            }
        },
        order: [
            [0, 'dsc']
        ]
    });
}

function initMenuCards(oData) {
    var iCurrentSupply = RBT_INIT_TOTAL_SUPPLY - oData.Total;
    var iAvailableSupply = iCurrentSupply - RBT_LOCKED_SUPPLY;
    $('#bpsRbtTotalBurned').html(parseFloat(oData.Total).toLocaleString());
    $('#bpsRbtCurrentSupply').html(iCurrentSupply.toLocaleString());
    $('#bpsRbtAvailableSupply').html(iAvailableSupply.toLocaleString());
}

function initCharts() {
    aHistoryData = $.getJSON("/js/data.json", function (oJSON) {
        initChartBurnHistory(oJSON);
        initChartBurnHistoryCurrentYear(oJSON);
        initChartTotalBurnHistory(oJSON);
        initChartBurnHistoryMonthly(oJSON);
        initChartBurnHistoryMonthlyCurrentYear(oJSON);
        initChartSupply(oJSON);

        initMenuCards(oJSON[0]);
    });
}

function initHeadlines() {
    var iCurrentYear = new Date().getFullYear();
    $('#bpsHdlC3').html('RBT Burned Daily ' + iCurrentYear);
    $('#bpsMenuItemC3').html(feather.icons['trending-up'].toSvg() + ' RBT Burned Daily ' + iCurrentYear);
    $('#bpsHdlC5').html('RBT Burned Monthly ' + iCurrentYear);
    $('#bpsMenuItemC5').html(feather.icons['trending-up'].toSvg() + ' RBT Burned Monthly ' + iCurrentYear);
}

// chart 1 - RBT burned daily
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

// chart 2 - RBT burned total
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

// chart 3 - RBT burned daily (current year)
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

// chart 4 - RBT burned monthly
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

// chart 5 - RBT burned monthly (current year)
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

// chart 6 - RBT supply
function initChartSupply(oJSON) {

    var aDataCurrent = [];
    var aDataAvailable = [];

    for (var i = oJSON.length - 1; i > -1; i--) {

        aDataCurrent.push({
            x: oJSON[i].Date,
            y: RBT_INIT_TOTAL_SUPPLY - RBT_MANUALLY_BURN - oJSON[i].Total
        });

        aDataAvailable.push({
            x: oJSON[i].Date,
            y: RBT_INIT_TOTAL_SUPPLY - RBT_LOCKED_SUPPLY - RBT_MANUALLY_BURN - oJSON[i].Total
        });
    }

    iCurrentSupply = RBT_INIT_TOTAL_SUPPLY - oJSON[0].Total;
    iAvailableSupply = RBT_INIT_TOTAL_SUPPLY - RBT_LOCKED_SUPPLY - oJSON[0].Total;

    sLabelCS = 'RBT Current Supply: ' + iCurrentSupply.toLocaleString() + ' RBT';
    sLabelAS = 'RBT Available Supply: ' + iAvailableSupply.toLocaleString() + ' RBT';

    const data = {
        datasets: [{
            label: sLabelCS,
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aDataCurrent
        }, {
            label: sLabelAS,
            backgroundColor: 'rgb(50, 50, 255)',
            borderColor: 'rgb(50, 50, 255)',
            data: aDataAvailable
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    max: 100000,
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    };

    const oChartSupply = new Chart(
        document.getElementById('idChartSupply'),
        config
    );
}