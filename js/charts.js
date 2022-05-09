function initChartsRBT() {
    initMenuCardsRBT();
    initChartRbtC1();
    initChartRbtC2();
    initChartRbtC3();
    initChartRbtC4();
    initChartRbtC5();
    initChartRbtC6();
    initChartRbtC7();
    initChartRbtC8();
}

function initChartsRBS(){
    initMenuCardsRBS();
    initChartRbsC1();
    initChartRbsC2();
    initChartRbsC3();
    initChartRbsC4();
}

function initMenuCardsRBT() {
    var oData = oDataRBT[0];
    var iCurrentSupply = RBT_INIT_TOTAL_SUPPLY - oData.TotalBurned;
    var iAvailableSupply = iCurrentSupply - RBT_LOCKED_SUPPLY;
    $('#bpsRbtTotalBurned').html(formatNumber(oData.TotalBurned) + " RBT");
    $('#bpsRbtCurrentSupply').html(formatNumber(iCurrentSupply) + " RBT");
    $('#bpsRbtAvailableSupply').html(formatNumber(iAvailableSupply) + " RBT");
    $('#bpsRbtMarketCap').html(formatNumber(oData.MarketCap) + " $");
    $('#bpsRbtHolders').html(formatNumber(oData.Holders));
}

function initMenuCardsRBS() {
    var oData = oDataRBS[0];
    $('#bpsRbsTotalSupply').html(formatNumber(oData.TotalSupply) + " RBS");
    $('#bpsRbsDifferenceSupply').html(formatNumber(oData.Supply) + " RBS");
    $('#bpsRbsMarketCap').html(formatNumber(oData.MarketCap) + " $");
    $('#bpsRbsHolders').html(formatNumber(oData.Holders));
}

// chart 1 - RBT burned daily
function initChartRbtC1() {

    var aData = [];

    for (var i = oDataRBT.length - 1; i > -1; i--) {
        aData.push({
            x: oDataRBT[i].Date,
            y: oDataRBT[i].Burned
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
function initChartRbtC2() {

    var aData = [];

    for (var i = oDataRBT.length - 1; i > -1; i--) {
        aData.push({
            x: oDataRBT[i].Date,
            y: oDataRBT[i].TotalBurned
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
            scales: {
                y: {
                    max: 100000,
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
        document.getElementById('idChartRbtC2'),
        config
    );
}

// chart 3 - RBT burned daily (current year)
function initChartRbtC3() {

    var aData = [];

    var iCurrentYear = new Date().getFullYear();
    for (var i = oDataRBT.length - 1; i > -1; i--) {
        if (oDataRBT[i].Date.indexOf(iCurrentYear.toString()) > -1) {
            aData.push({
                x: oDataRBT[i].Date,
                y: oDataRBT[i].Burned
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
function initChartRbtC4() {

    var aData = [];
    var sKey;
    var bFound;

    for (var i = oDataRBT.length - 1; i > -1; i--) {

        sKey = oDataRBT[i].Date.substring(3);

        bFound = false;
        for (var j = 0; j < aData.length; j++) {
            if (aData[j].x === sKey) {
                aData[j].y = String(parseFloat(aData[j].y) + parseFloat(oDataRBT[i].Burned));
                bFound = true;
                break;
            }
        }
        if (!bFound) {
            aData.push({
                x: sKey,
                y: oDataRBT[i].Burned
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
function initChartRbtC5() {

    var aData = [];
    var sKey;
    var bFound;

    var iCurrentYear = new Date().getFullYear();
    for (var i = oDataRBT.length - 1; i > -1; i--) {

        if (oDataRBT[i].Date.indexOf(iCurrentYear.toString()) > -1) {

            sKey = oDataRBT[i].Date.substring(3);

            bFound = false;
            for (var j = 0; j < aData.length; j++) {
                if (aData[j].x === sKey) {
                    aData[j].y = String(parseFloat(aData[j].y) + parseFloat(oDataRBT[i].Burned));
                    bFound = true;
                    break;
                }
            }
            if (!bFound) {
                aData.push({
                    x: sKey,
                    y: oDataRBT[i].Burned
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
function initChartRbtC6() {

    var aDataCurrent = [];
    var aDataAvailable = [];

    for (var i = oDataRBT.length - 1; i > -1; i--) {

        aDataCurrent.push({
            x: oDataRBT[i].Date,
            y: RBT_INIT_TOTAL_SUPPLY - RBT_MANUALLY_BURN - oDataRBT[i].TotalBurned
        });

        aDataAvailable.push({
            x: oDataRBT[i].Date,
            y: RBT_INIT_TOTAL_SUPPLY - RBT_LOCKED_SUPPLY - RBT_MANUALLY_BURN - oDataRBT[i].TotalBurned
        });
    }

    iCurrentSupply = RBT_INIT_TOTAL_SUPPLY - oDataRBT[0].TotalBurned;
    iAvailableSupply = RBT_INIT_TOTAL_SUPPLY - RBT_LOCKED_SUPPLY - oDataRBT[0].TotalBurned;

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
            /*scales: {
                y: {
                    max: 100000,
                    min: 0,
                }
            },*/
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
function initChartRbtC7() {

    var aData = [];

    for (var i = oDataRBT.length - 1; i > -1; i--) {
        if (oDataRBT[i].MarketCap !== '0.00') {
            aData.push({
                x: oDataRBT[i].Date,
                y: oDataRBT[i].MarketCap
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
            /*scales: {
                y: {
                    max: 10000000,
                    min: 0,
                }
            },*/
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
function initChartRbtC8() {

    var aData = [];

    for (var i = oDataRBT.length - 1; i > -1; i--) {
        if (oDataRBT[i].Holders !== '0') {
            aData.push({
                x: oDataRBT[i].Date,
                y: oDataRBT[i].Holders.replace(',', '')
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
            /*scales: {
                y: {
                    max: 20000,
                    min: 0,
                }
            },*/
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
function initChartRbsC1() {

    var aData = [];

    for (var i = oDataRBS.length - 1; i > -1; i--) {
        aData.push({
            x: oDataRBS[i].Date,
            y: oDataRBS[i].TotalSupply
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
function initChartRbsC2() {

    var aData = [];

    for (var i = oDataRBS.length - 1; i > -1; i--) {
        aData.push({
            x: oDataRBS[i].Date,
            y: oDataRBS[i].Supply
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
            /*scales: {
                y: {
                    max: 106050,
                    min: 0,
                }
            },*/
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
function initChartRbsC3() {

    var aData = [];

    for (var i = oDataRBS.length - 1; i > -1; i--) {
        if (oDataRBS[i].MarketCap) {
            aData.push({
                x: oDataRBS[i].Date,
                y: oDataRBS[i].MarketCap
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
            /*scales: {
                y: {
                    max: 1000000,
                    min: 0,
                }
            },*/
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
function initChartRbsC4() {

    var aData = [];

    for (var i = oDataRBS.length - 1; i > -1; i--) {
        if (oDataRBS[i].Holders) {
            aData.push({
                x: oDataRBS[i].Date,
                y: oDataRBS[i].Holders.replace(',', '')
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
            /*scales: {
                y: {
                    max: 20000,
                    min: 0,
                }
            },*/
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