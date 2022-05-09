function initTableRBT() {
    renderTableRBT();
    initDataTableRBT();
    oTableRBT = $("#bpsRbtMainTable").DataTable();
}

function initTableRBS() {
    renderTableRBS();
    initDataTableRBS();
    oTableRBS = $("#bpsRbsMainTable").DataTable();
}

$('#bpsMenuItemRbtT1').click(function () {
    $('#bpsRbtMainTable_wrapper').remove();
    $.when(renderTableRBT()).then(function () {
        initDataTableRBT();
        $('#bpsRbtT1 *').css('display', '');
        $('#bpsRbtMainTable').parent().addClass('table-responsive');
    });
});

$('#bpsMenuItemRbsT1').click(function () {
    $('#bpsRbsMainTable_wrapper').remove();
    $.when(renderTableRBS()).then(function () {
        initDataTableRBS();
        $('#bpsRbsT1 *').css('display', '');
        $('#bpsRbsMainTable').parent().addClass('table-responsive');
    });
});

function formatNumber(iNumber){
    return iNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function renderTableRBT() {

    //render head
    let sHtml = '<table class="table table-responsive bpsScrollable" id="bpsRbtMainTable">'
    sHtml += '<thead><tr class="table-dark">';
    sHtml += '<th scope="col" class="align-middle">Date</th>';
    sHtml += '<th scope="col" class="align-middle">RBT Total Burned</th>';
    sHtml += '<th scope="col" class="align-middle">RBT Burned at Day</th>';
    sHtml += '<th scope="col" class="align-middle">RBT Current Supply</th>';
    sHtml += '<th scope="col" class="align-middle">RBT Available Supply</th>';
    sHtml += '<th scope="col" class="align-middle">Market Cap</th>';
    sHtml += '<th scope="col" class="align-middle">Holders</th>';
    sHtml += '</tr></thead><tbody>';

    //render primary row
    sHtml += renderRowRBT(oDataRBT[0], true);

    //render history
    for (let i = 1; i < oDataRBT.length; i++) {
        sHtml += renderRowRBT(oDataRBT[i], false);
    }

    sHtml += '</table>';
    $('#bpsRbtT1').append(sHtml);
}

function renderTableRBS() {

    //render head
    let sHtml = '<table class="table table-responsive bpsScrollable" id="bpsRbsMainTable">'
    sHtml += '<thead><tr class="table-dark">';
    sHtml += '<th scope="col" class="align-middle">Date</th>';
    sHtml += '<th scope="col" class="align-middle">RBS Total Supply</th>';
    sHtml += '<th scope="col" class="align-middle">RBS Supply at Day</th>';
    sHtml += '<th scope="col" class="align-middle">Market Cap</th>';
    sHtml += '<th scope="col" class="align-middle">Holders</th>';
    sHtml += '</tr></thead><tbody>';

    //render primary row
    sHtml += renderRowRBS(oDataRBS[0], true);

    //render history
    for (let i = 1; i < oDataRBS.length; i++) {
        sHtml += renderRowRBS(oDataRBS[i], false);
    }

    sHtml += '</table>';
    $('#bpsRbsT1').append(sHtml);
}

function renderRowRBT(oRow, bFirst) {
    let sHtml;
    if (bFirst) {
        sHtml = '<tr class="table-primary">';
    } else {
        sHtml = '<tr>';
    }
    sHtml += '<th scope="row">' + convertDate(oRow.Date) + '</th>';
    sHtml += '<td class="align-middle">' + formatNumber(oRow.TotalBurned) + '</td>';
    sHtml += '<td class="align-middle">' + formatNumber(oRow.Burned) + '</td>';
    let iCurrentSupply = RBT_INIT_TOTAL_SUPPLY - oRow.TotalBurned;
    sHtml += '<td class="align-middle">' + formatNumber(iCurrentSupply.toFixed(2)) + '</td>';
    let iAvailableSupply = iCurrentSupply - RBT_LOCKED_SUPPLY;
    sHtml += '<td class="align-middle">' + formatNumber(iAvailableSupply.toFixed(2)) + '</td>';
    let iMarketCap = formatNumber(oRow.MarketCap);
    if(iMarketCap === '0.00'){
        iMarketCap = '';
    }
    sHtml += '<td class="align-middle">' + iMarketCap + '</td>';
    let iHolders = formatNumber(oRow.Holders);
    if(iHolders === '0'){
        iHolders = '';
    }
    sHtml += '<td class="align-middle">' + iHolders + '</td></tr>';
    return sHtml;
}

function renderRowRBS(oRow, bFirst) {
    let sHtml;
    if (bFirst) {
        sHtml = '<tr class="table-primary">';
    } else {
        sHtml = '<tr>';
    }
    sHtml += '<th scope="row">' + convertDate(oRow.Date) + '</th>';
    sHtml += '<td class="align-middle">' + formatNumber(oRow.TotalSupply) + '</td>';
    sHtml += '<td class="align-middle">' + formatNumber(oRow.Supply) + '</td>';
    sHtml += '<td class="align-middle">' + formatNumber(oRow.MarketCap) + '</td>';
    sHtml += '<td class="align-middle">' + formatNumber(oRow.Holders) + '</td></tr>';
    return sHtml;
}

function initDataTableRBT() {
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

function initDataTableRBS() {
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