function initTableRBT() {
    renderTableRBT();
    //initDataTableRBT();
}

function renderTableRBT() {

    let oTable = $('#bpsRbtMainTable');

    //render head
    let sHtml = '<thead><tr class="table-dark">';
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

    oTable.html(sHtml);
}

function renderRowRBT(oRow, bFirst) {
    let sHtml;
    if (bFirst) {
        sHtml = '<tr class="table-primary">';
    } else {
        sHtml = '<tr>';
    }
    sHtml += '<th scope="row">' + convertDate(oRow.Date) + '</th>';
    sHtml += '<td class="align-middle">' + convertFloat(oRow.TotalBurned) + '</td>';
    sHtml += '<td class="align-middle">' + convertFloat(oRow.Burned) + '</td>';
    let iCurrentSupply = RBT_INIT_TOTAL_SUPPLY - oRow.TotalBurned;
    sHtml += '<td class="align-middle">' + convertFloat(iCurrentSupply) + '</td>';
    let iAvailableSupply = iCurrentSupply - RBT_LOCKED_SUPPLY;
    sHtml += '<td class="align-middle">' + convertFloat(iAvailableSupply) + '</td>';
    sHtml += '<td class="align-middle">' + convertFloat(oRow.MarketCap) + '</td>';
    sHtml += '<td class="align-middle">' + convertInt(oRow.Holders) + '</td></tr>';
    return sHtml;
}

function initDataTableRBT() {
    debugger;
    let oTable = $('#bpsRbtMainTable').DataTable({
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

    oTable.rows.add(oDataRBT);
    oTableRBT = $('#bpsRbtMainTable').DataTable().data();
}

/*$('#bpsMenuItemRbtT1').click(function () {
    $('#bpsRbtMainTable').DataTable().clear();
    $('#bpsRbtMainTable').DataTable().destroy();
    initTableRBT();
    $('#bpsRbtMainTable').DataTable().clear().rows.add(oTableRBT).draw();
});

$('#bpsMenuItemRbsT1').click(function () {
    $('#bpsRbsMainTable').DataTable().clear();
    $('#bpsRbsMainTable').DataTable().destroy();
    initTableRBS();
    $('#bpsRbsMainTable').DataTable().clear().rows.add(oTableRBS).draw();
});

function initTableRBS() {
    debugger;
    let oTable = $('#bpsRbsMainTable').DataTable({
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

    oTable.rows.add(oDataRBS);
    oTableRBS = $('#bpsRbsMainTable').DataTable().data();
}*/