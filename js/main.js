const RBT_INIT_TOTAL_SUPPLY = 100000;
const RBT_LOCKED_SUPPLY = 50000;
const RBT_MANUALLY_BURN = 4950;
var oRbtData;
var oRbsData;

function p(sText) {
    console.log(sText);
}

$(document).ready(function () {
    initDisplayConfiguration();
    initTableFunctionsRBT();
    oRbtData = $('#bpsRbtMainTable').DataTable().data();
    initTableFunctionsRBS();
    oRbsData = $('#bpsRbsMainTable').DataTable().data();
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
    initTableFunctionsRBT();
    $('#bpsRbtMainTable').DataTable().clear().rows.add(oRbtData).draw();
});

$('#bpsMenuItemRbsT1').click(function () {
    $('#bpsRbsMainTable').DataTable().clear();
    $('#bpsRbsMainTable').DataTable().destroy();
    initTableFunctionsRBS();
    $('#bpsRbsMainTable').DataTable().clear().rows.add(oRbsData).draw();
});

$('#bpsMenuItemHome').click(function () {
    var sNewHtml = $('#bpsHome').html().replaceAll(' style="display: none;"', '');
    $('#bpsHome').html(sNewHtml);
});

function initDisplayConfiguration() {

    //icons
    feather.replace();

    //responsive table
    $('#bpsRbtMainTable').parent().addClass('table-responsive');
    $('#bpsRbsMainTable').parent().addClass('table-responsive');

}

function initTableFunctionsRBT() {
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
            },
            {
                targets: 5,
                type: 'num-fmt'
            },
            {
                targets: 6,
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

function initTableFunctionsRBS() {

    $('#bpsRbsMainTable').DataTable({
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
    $('#bpsRbtTotalBurned').html(parseFloat(oData.Total).toLocaleString() + " RBT");
    $('#bpsRbtCurrentSupply').html(iCurrentSupply.toLocaleString() + " RBT");
    $('#bpsRbtAvailableSupply').html(iAvailableSupply.toLocaleString() + " RBT");
    $('#bpsRbtMarketCap').html(parseFloat(oData.MarketCap).toLocaleString() + " USD");
    $('#bpsRbtHolders').html(oData.Holders);
}

function initMenuCardsRBS(oData) {
    $('#bpsRbsTotalSupply').html(parseFloat(oData.Total).toLocaleString() + " RBS");
    $('#bpsRbsDifferenceSupply').html(parseFloat(oData.Supply).toLocaleString() + " RBS");
    $('#bpsRbsMarketCap').html(parseFloat(oData.MarketCap).toLocaleString() + " USD");
    $('#bpsRbsHolders').html(oData.Holders);
}

function initCharts() {
    aHistoryData = $.getJSON("/js/data.json", function (oJSON) {
        initChartBurnHistory(oJSON);
        initChartBurnHistoryCurrentYear(oJSON);
        initChartTotalBurnHistory(oJSON);
        initChartBurnHistoryMonthly(oJSON);
        initChartBurnHistoryMonthlyCurrentYear(oJSON);
        initChartSupply(oJSON);
        initChartMarketCap(oJSON);
        initChartHolders(oJSON);

        initMenuCards(oJSON[0]);
    });

    aHistoryDataRBS = $.getJSON("/js/dataRBS.json", function (oJSON) {
        initChartRbsC1(oJSON);
        initChartRbsC2(oJSON);
        initChartRbsC3(oJSON);
        initChartRbsC4(oJSON);

        initMenuCardsRBS(oJSON[0]);
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

// chart 7 - RBT market cap
function initChartMarketCap(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        if(oJSON[i].MarketCap){
            aData.push({
                x: oJSON[i].Date,
                y: oJSON[i].MarketCap
            });    
        }
    }

    const data = {
        datasets: [{
            label: 'RBT Market Cap',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    max: 10000000,
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartMarketCap = new Chart(
        document.getElementById('idChartMarketCap'),
        config
    );
}


// chart 8 - RBT holders
function initChartHolders(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        if(oJSON[i].Holders){
            aData.push({
                x: oJSON[i].Date,
                y: oJSON[i].Holders.replace(',', '')
            });    
        }
    }

    const data = {
        datasets: [{
            label: 'RBT Holders',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    max: 20000,
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartHolders = new Chart(
        document.getElementById('idChartHolders'),
        config
    );
}

// chart 1 - RBS total supply
function initChartRbsC1(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        aData.push({
            x: oJSON[i].Date,
            y: oJSON[i].Total
        });
    }

    const data = {
        datasets: [{
            label: 'RBS Total Supply',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    max: 106050,
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartRbsC1 = new Chart(
        document.getElementById('idChartRbsC1'),
        config
    );
}

// chart 2 - RBS supply daily
function initChartRbsC2(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        aData.push({
            x: oJSON[i].Date,
            y: oJSON[i].Supply
        });
    }

    const data = {
        datasets: [{
            label: 'RBS Supply',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    max: 106050,
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartRbsC2 = new Chart(
        document.getElementById('idChartRbsC2'),
        config
    );
}

// chart 3 - RBS market cap
function initChartRbsC3(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        if(oJSON[i].MarketCap){
            aData.push({
                x: oJSON[i].Date,
                y: oJSON[i].MarketCap
            });    
        }
    }

    const data = {
        datasets: [{
            label: 'RBS Market Cap',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    max: 1000000,
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartRbsC3 = new Chart(
        document.getElementById('idChartRbsC3'),
        config
    );
}


// chart 4 - RBS holders
function initChartRbsC4(oJSON) {

    var aData = [];

    for (var i = oJSON.length - 1; i > -1; i--) {
        if(oJSON[i].Holders){
            aData.push({
                x: oJSON[i].Date,
                y: oJSON[i].Holders.replace(',', '')
            });    
        }
    }

    const data = {
        datasets: [{
            label: 'RBS Holders',
            backgroundColor: 'rgb(150, 150, 255)',
            borderColor: 'rgb(150, 150, 255)',
            data: aData
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    max: 20000,
                    min: 0,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

    const oChartRbsC4 = new Chart(
        document.getElementById('idChartRbsC4'),
        config
    );
}