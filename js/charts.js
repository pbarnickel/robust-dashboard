function initCharts() {
    $.getJSON("/js/data/RBT.json", function (oJSON) {
        initChartRbt1(oJSON);
        initChartRbt2(oJSON);
        initChartRbt3(oJSON);
        initChartRbt4(oJSON);
        initChartRbt5(oJSON);
        initChartRbt6(oJSON);
        initChartRbt7(oJSON);
        initChartRbt8(oJSON);

        initMenuCardsRBT(oJSON[0]);
    });

    $.getJSON("/js/data/RBS.json", function (oJSON) {
        initChartRbsC1(oJSON);
        initChartRbsC2(oJSON);
        initChartRbsC3(oJSON);
        initChartRbsC4(oJSON);

        initMenuCardsRBS(oJSON[0]);
    });
}

function initMenuCardsRBT(oData) {
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

// chart 1 - RBT burned daily
function initChartRbtC1(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC1'),
        config
    );
}

// chart 2 - RBT burned total
function initChartRbtC2(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC2'),
        config
    );
}

// chart 3 - RBT burned daily (current year)
function initChartRbtC3(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC3'),
        config
    );
}

// chart 4 - RBT burned monthly
function initChartRbtC4(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC4'),
        config
    );
}

// chart 5 - RBT burned monthly (current year)
function initChartRbtC5(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC5'),
        config
    );
}

// chart 6 - RBT supply
function initChartRbtC6(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC6'),
        config
    );
}

// chart 7 - RBT market cap
function initChartRbtC7(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC7'),
        config
    );
}


// chart 8 - RBT holders
function initChartRbtC8(oJSON) {

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

    const oChart = new Chart(
        document.getElementById('idChartRbtC8'),
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

    const oChart = new Chart(
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

    const oChart = new Chart(
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

    const oChart = new Chart(
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

    const oChart = new Chart(
        document.getElementById('idChartRbsC4'),
        config
    );
}