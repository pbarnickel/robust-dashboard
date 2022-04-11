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

    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Robust Dashboard</a>
        </div>
    </nav>

    <main class="container">
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Robust Dashboard (UTC)</h1>
                <p class="lead">This application serves as a general monitoring tool for robust projects. This is not part of the official Robust project. There is no guarantee for data consistency.</p>
            </div>
        </div>
        <div class="bg-light p-5 rounded">

            <h1 class="display-6">Daily RBT Burn History</h1><br />
            <p>
                <button id="btnTable" class="btn btn-dark w-100" onclick="onClickTable()" data-bs-toggle="collapse" href="#collapseTable" role="button" aria-expanded="false" aria-controls="collapseTable">
                    Daily RBT Burned - Table
                </button>
                <button id="btnChart1" class="btn btn-secondary w-100" onclick="onClickChart1()" data-bs-toggle="collapse" href="#collapseChart1" role="button" aria-expanded="false" aria-controls="collapseChart1">
                    Daily RBT Burned - Graph
                </button>
                <button id="btnChart3" class="btn btn-secondary w-100" onclick="onClickChart3()" data-bs-toggle="collapse" href="#collapseChart3" role="button" aria-expanded="false" aria-controls="collapseChart3">
                    Daily RBT Burned - Graph
                </button>
                <button id="btnChart2" class="btn btn-secondary w-100" onclick="onClickChart2()" data-bs-toggle="collapse" href="#collapseChart2" role="button" aria-expanded="false" aria-controls="collapseChart2">
                    Total RBT Burned - Graph
                </button>

            </p>
            <div class="collapse" id="collapseTable">
                <div class="card card-body">
                    <?php
                    include('php/loadDashboard.php');
                    ?>
                </div>
            </div>
            <div class="collapse" id="collapseChart1">
                <div class="card card-body">
                    <p>Select a target area to take a closer look at it. Double-click on the chart to return to the standard view.</p><br />
                    <div id="chart_1"></div>
                </div>
            </div>
            <div class="collapse" id="collapseChart2">
                <div class="card card-body">
                    <p>Select a target area to take a closer look at it. Double-click on the chart to return to the standard view.</p><br />
                    <div id="chart_2"></div>
                </div>
            </div>
            <div class="collapse" id="collapseChart3">
                <div class="card card-body">
                    <p>Select a target area to take a closer look at it. Double-click on the chart to return to the standard view.</p><br />
                    <div id="chart_3"></div>
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
            </p>
        </div>
    </footer>

    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/d3.v4.min.js"></script>
    <script src="/js/data.json"></script>
    <script src="/js/main.js"></script>
</body>

</html>