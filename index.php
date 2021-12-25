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
            <h5>Daily RBT Burned</h5>
            <p>Select a target area to take a closer look at it. Double-click on the chart to return to the standard view.</p><br />
            <div id="chart_1"></div>
            <h5>Total RBT Burned</h5>
            <p>Select a target area to take a closer look at it. Double-click on the chart to return to the standard view.</p><br />
            <div id="chart_2"></div>
            <?php
            include('php/loadDashboard.php');
            ?>
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