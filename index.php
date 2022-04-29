<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Robust Dashboard</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/dashboard.css" rel="stylesheet">
    <link href="/css/styles.css" rel="stylesheet">
    <link rel="icon" href="/media/favicon.png">
</head>

<body class="d-flex flex-column min-vh-100">

    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a id="bpsHdrBrand" class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="index.php">Robust Dashboard</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </header>

    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <a class="bpsBtnMenuHdl" data-bs-toggle="collapse" href="#collapseRBT" role="button" aria-expanded="true" aria-controls="collapseRBT">
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted bpsSidebarHdl">
                            <img class="bpsMenuHdlIcon" src="/media/RBT.svg" />
                            <span>
                                RBT
                            </span>
                        </h6>
                    </a>
                    <div class="collapse show" id="collapseRBT">
                        <div id="bpsMenuCardRBT" class="card card-body bpsMenuCard">
                            <table class="table table-borderless">
                                <tr>
                                    <td class="align-middle">Total Burned</td>
                                    <td id="bpsRbtTotalBurned" class="align-middle"></td>
                                </tr>
                                <tr>
                                    <td class="align-middle">Current Supply</td>
                                    <td id="bpsRbtCurrentSupply" class="align-middle"></td>
                                </tr>
                                <tr>
                                    <td class="align-middle">Available Supply</td>
                                    <td id="bpsRbtAvailableSupply" class="align-middle"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <ul class="nav flex-column mb-2">
                        <li class="nav-item">
                            <a id="bpsMenuItemT1" class="bpsMenuItem nav-link" data-target="bpsT1">
                                <span data-feather="align-justify"></span>
                                RBT Burned Daily
                            </a>
                        </li>
                        <li class="nav-item">
                            <a id="bpsMenuItemC1" class="bpsMenuItem nav-link" data-target="bpsC1">
                                <span data-feather="trending-up"></span>
                                RBT Burned Daily
                            </a>
                        </li>
                        <li class="nav-item">
                            <a id="bpsMenuItemC3" class="bpsMenuItem nav-link" data-target="bpsC3">
                                <span data-feather="trending-up"></span>
                                RBT Burned Daily
                            </a>
                        </li>
                        <li class="nav-item">
                            <a id="bpsMenuItemC4" class="bpsMenuItem nav-link" data-target="bpsC4">
                                <span data-feather="trending-up"></span>
                                RBT Burned Monthly
                            </a>
                        </li>
                        <li class="nav-item">
                            <a id="bpsMenuItemC5" class="bpsMenuItem nav-link" data-target="bpsC5">
                                <span data-feather="trending-up"></span>
                                RBT Burned Monthly
                            </a>
                        </li>
                        <li class="nav-item">
                            <a id="bpsMenuItemC2" class="bpsMenuItem nav-link" data-target="bpsC2">
                                <span data-feather="trending-up"></span>
                                RBT Burned Total
                            </a>
                        </li>
                        <li class="nav-item">
                            <a id="bpsMenuItemC6" class="bpsMenuItem nav-link" data-target="bpsC6">
                                <span data-feather="trending-up"></span>
                                RBT Supply
                            </a>
                        </li>
                    </ul>

                    <a class="bpsBtnMenuHdl" data-bs-toggle="collapse" href="#collapseRBS" role="button" aria-expanded="true" aria-controls="collapseRBS">
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted bpsSidebarHdl">
                            <img class="bpsMenuHdlIcon" src="/media/RBS.svg" />
                            <span>
                                RBS
                            </span>
                        </h6>
                    </a>
                    <div class="collapse show" id="collapseRBS">
                        <div id="bpsMenuCardRBS" class="card card-body bpsMenuCard">
                            Coming soon
                        </div>
                    </div>
                </div>
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <div id="content" class="container">
                        <div id="bpsT1" class="bpsTarget">
                            <h1 id="bpsHdlT1" class="h2">RBT Burned Daily</h1>
                            <p>This application serves as a general monitoring tool for robust projects. This is not part of the official Robust project. There is no guarantee for data consistency.</p>
                            <?php
                            include('php/loadDashboard.php');
                            ?>
                        </div>
                        <div id="bpsC1" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlC1" class="h2">RBT Burned Daily</h1>
                            <canvas id="idChartBurnHistory"></canvas>
                        </div>
                        <div id="bpsC3" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlC3" class="h2">RBT Burned Daily</h1>
                            <canvas id="idChartBurnHistoryCurrentYear"></canvas>
                        </div>
                        <div id="bpsC4" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlC4" class="h2">RBT Burned Monthly</h1>
                            <canvas id="idChartBurnHistoryMonthly"></canvas>
                        </div>
                        <div id="bpsC5" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlC5" class="h2">RBT Burned Monthly</h1>
                            <canvas id="idChartBurnHistoryMonthlyCurrentYear"></canvas>
                        </div>
                        <div id="bpsC2" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlC2" class="h2">RBT Burned Total</h1>
                            <canvas id="idChartTotalBurnHistory"></canvas>
                        </div>
                        <div id="bpsC6" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlC6" class="h2">RBT Supply</h1>
                            <canvas id="idChartSupply"></canvas>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

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
    <script src="/js/feather.min.js"></script>
    <script src="/js/chart.js"></script>
    <script src="/js/data.json"></script>
    <script src="/js/main.js"></script>
</body>

</html>