$('#bpsMenuItemRbtT1').click(function () {
    $('#bpsRbtMainTable').DataTable().clear();
    $('#bpsRbtMainTable').DataTable().destroy();
    initTableFunctionsRBT();
    $('#bpsRbtMainTable').DataTable().clear().rows.add(oDataRBT).draw();
});

$('#bpsMenuItemRbsT1').click(function () {
    $('#bpsRbsMainTable').DataTable().clear();
    $('#bpsRbsMainTable').DataTable().destroy();
    initTableFunctionsRBS();
    $('#bpsRbsMainTable').DataTable().clear().rows.add(oDataRBS).draw();
});

function initTables() {
    initTableFunctionsRBT();
    oRbtData = $('#bpsRbtMainTable').DataTable().data();
    initTableFunctionsRBS();
    oRbsData = $('#bpsRbsMainTable').DataTable().data();
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