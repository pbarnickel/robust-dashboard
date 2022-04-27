<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Robust Dashboard</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/styles.css" rel="stylesheet">
    <link rel="icon" href="/media/favicon.png">
</head>

<body class="d-flex flex-column min-vh-100">

    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Robust Dashboard</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </header>

    <main class="container">
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Robust Dashboard (UTC)</h1>
                <p class="lead">This application serves as a general monitoring tool for robust projects. This is not part of the official Robust project. There is no guarantee for data consistency.</p>
            </div>
        </div>

        <div class="bg-light p-5 rounded">

            <h1 class="display-6">Daily RBT Burn History</h1><br />
            <div class="container">
                <div class="row">
                    <button id="btnTable" class="btn btn-dark col-sm" onclick="onClickTable()" data-bs-toggle="collapse" href="#collapseTable" role="button" aria-expanded="false" aria-controls="collapseTable">
                        Daily RBT Burned - Table
                    </button>
                </div>
                <div class="row">
                    <button id="btnChart1" class="btn btn-secondary col-sm" onclick="onClickChart1()" data-bs-toggle="collapse" href="#collapseChart1" role="button" aria-expanded="false" aria-controls="collapseChart1">
                        Daily RBT Burned - Graph
                    </button>
                    <button id="btnChart3" class="btn btn-secondary col-sm" onclick="onClickChart3()" data-bs-toggle="collapse" href="#collapseChart3" role="button" aria-expanded="false" aria-controls="collapseChart3">
                        Daily RBT Burned - Graph
                    </button>
                </div>
                <div class="row">
                    <button id="btnChart4" class="btn btn-secondary col-sm" onclick="onClickChart4()" data-bs-toggle="collapse" href="#collapseChart4" role="button" aria-expanded="false" aria-controls="collapseChart4">
                        Monthly RBT Burned - Graph
                    </button>
                    <button id="btnChart5" class="btn btn-secondary col-sm" onclick="onClickChart5()" data-bs-toggle="collapse" href="#collapseChart5" role="button" aria-expanded="false" aria-controls="collapseChart5">
                        Monthly RBT Burned - Graph
                    </button>
                </div>
                <div class="row">
                    <button id="btnChart2" class="btn btn-secondary col-sm" onclick="onClickChart2()" data-bs-toggle="collapse" href="#collapseChart2" role="button" aria-expanded="false" aria-controls="collapseChart2">
                        Total RBT Burned - Graph
                    </button>
                </div>
            </div>
            <div class="collapse" id="collapseTable">
                <div class="card card-body">
                    <?php
                    include('php/loadDashboard.php');
                    ?>
                </div>
            </div>
            <div class="collapse" id="collapseChart1">
                <div class="card card-body">
                    <canvas id="idChartBurnHistory"></canvas>
                </div>
            </div>
            <div class="collapse" id="collapseChart2">
                <div class="card card-body">
                    <canvas id="idChartTotalBurnHistory"></canvas>
                </div>
            </div>
            <div class="collapse" id="collapseChart3">
                <div class="card card-body">
                    <canvas id="idChartBurnHistoryCurrentYear"></canvas>
                </div>
            </div>
            <div class="collapse" id="collapseChart4">
                <div class="card card-body">
                    <canvas id="idChartBurnHistoryMonthly"></canvas>
                </div>
            </div>
            <div class="collapse" id="collapseChart5">
                <div class="card card-body">
                    <canvas id="idChartBurnHistoryMonthlyCurrentYear"></canvas>
                </div>
            </div>
        </div>
    </main>

    <footer class="page-footer">
        <div class="container-fluid text-center text-md-left">
            <p>
                <a target="_blank" href="https://robustprotocol.fi/">Robust Protocol</a>
                -
                <a target="_blank" href="https://robustswap.com/">Robust Swap</a>
                -
                <a href="impressum.php">Impressum</a>
            </p>
        </div>
    </footer>

    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/chart.js"></script>
    <script src="/js/data.json"></script>
    <script src="/js/main.js"></script>
</body>

</html>