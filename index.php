<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Robust Dashboard</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/datatables.min.css" rel="stylesheet">
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
                    <ul class="nav flex-column mb-2">
                        <li class="nav-item">
                            <a id="bpsMenuItemHome" class="bpsMenuItem nav-link" data-target="bpsHome">
                                <span data-feather="home"></span>
                                Home
                            </a>
                        </li>
                    </ul>
                    <a class="bpsBtnMenuHdl" data-bs-toggle="collapse" href="#collapseRBT" role="button" aria-expanded="false" aria-controls="collapseRBT">
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted bpsSidebarHdl">
                            <img class="bpsMenuHdlIcon" src="/media/RBT.svg" />
                            <span>
                                RBT
                            </span>
                        </h6>
                    </a>
                    <div class="collapse" id="collapseRBT">
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

                    <a class="bpsBtnMenuHdl" data-bs-toggle="collapse" href="#collapseRBS" role="button" aria-expanded="false" aria-controls="collapseRBS">
                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted bpsSidebarHdl">
                            <img class="bpsMenuHdlIcon" src="/media/RBS.svg" />
                            <span>
                                RBS
                            </span>
                        </h6>
                    </a>
                    <div class="collapse" id="collapseRBS">
                        <div id="bpsMenuCardRBS" class="card card-body bpsMenuCard">
                            Coming soon
                        </div>
                    </div>
                </div>
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <div id="content" class="container">
                        <div id="bpsHome" class="bpsTarget">
                            <h1 id="bpsHdlHome" class="h2">Robust Dashboard</h1>
                            <p class="lead">This application serves as a general monitoring tool for robust projects. This is not part of the official Robust project. There is no guarantee for data consistency.</p>
                            <p class="lead">If you also like my work on YouTube, I would be very happy about a subscription!</p>

                            <div class="row row-cols-1 row-cols-md-2 g-4">
                                <div class="col">
                                    <div class="card bpsCard">
                                        <iframe class="bpsVideo" src="https://www.youtube.com/embed/Cpkb0WkYHkc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        <!--div class="card-body">
                                            <h5 class="card-title"></h5>
                                            <p class="card-text"></p>
                                        </div-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="bpsT1" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlT1" class="h2">RBT Burned Daily</h1>
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

                        <div id="bpsImpressum" class="bpsTarget bpsHidden">
                            <h1 id="bpsHdlImpressum" class="h2">Impressum</h1>
                            <h5>Haftungsbeschränkung für eigene Inhalte</h5>
                            <p class="lead">
                                Alle Inhalte dieses Internetauftritts wurden mit Sorgfalt und nach bestem Gewissen erstellt. Eine Gewähr für die Aktualität, Vollständigkeit und Richtigkeit sämtlicher Seiten kann ich jedoch nicht übernehmen. Gemäß § 7 Abs. 1 TMG bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich, nach den §§ 8 bis 10 TMG jedoch nicht verpflichtet, die übermittelten oder gespeicherten fremden Informationen zu überwachen. Eine umgehende Entfernung dieser Inhalte erfolgt ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung und ich hafte nicht vor dem Zeitpunkt der Kenntniserlangung.
                            </p>
                            <h5>Haftungsbeschränkung für externe Links</h5>
                            <p class="lead">
                                Dieser Internetauftritt enthält Verknüpfungen zu Webseiten Dritter, auf deren Inhalt ich keinen Einfluss habe und für die ich keine Gewähr übernehme. Für die Inhalte und Richtigkeit der Informationen ist der jeweilige Informationsanbieter der verlinkten Webseite verantwortlich. Als die Verlinkung vorgenommen wurde, waren für mich keine Rechtsverstöße erkennbar. Sollte mir eine Rechtsverletzung bekannt werden, wird der jeweilige Link umgehend von mir entfernt.
                            </p>
                            <h5>Datenschutz</h5>
                            <p class="lead">
                                Bei dem Besuch dieses Internetauftritts speichert der Webserver standardgemäß Zugriffsinformationen (IP-Adresse, Uhrzeit, aufgerufene Web-Seite, Browser-Kennung, Quelle/Verweis, von welchem Sie auf die Seite gelangten) zur statistischen Auswertung. Eine Weiterleitung der Daten an Dritte findet nicht statt. Personenbezogene Daten werden weder erfasst noch gespeichert oder ausgewertet.
                            </p>
                            <h5>Angaben gemäß § 5 TMG</h5>
                            <p class="lead">Philipp Barnickel</p>
                            <h6>Postanschrift:</h6>
                            <p class="lead">Kirschenweg 7<br>64678 Lindenfels</p>
                            <h6>Kontakt:</h6>
                            <p class="lead">E-Mail: philippbarnickel [at] gmail.com</p>
                            <h6>Hinweise zur Website</h6>
                            <h6>Information gemäß § 36 VSBG</h6>
                            <p class="lead">Gemäß § 36 VSBG (Verbraucherstreitbeilegungsgesetz – Gesetz über die alternative Streitbeilegung in Verbrauchersachen) erklärt der Betreiber dieser Website: Wir sind weder bereit noch verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                            <p><em>Das Impressum wurde mit dem <a href="https://www.activemind.de/datenschutz/impressums-generator/">Impressums-Generator der activeMind AG</a> erstellt.</em></p>
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
                <a id="bpsLinkImpressum" class="bpsMenuItem nav-link" data-target="bpsImpressum">Impressum</a>
                -
                <a target="_blank" id="bpsLinkYouTube" href="https://www.youtube.com/channel/UCfuKzzQqA_UVnWc2prIyiGA"><span data-feather="youtube"></span></a>
                <a target="_blank" id="bpsLinkGitHub" href="https://github.com/pbarnickel/robust-dashboard"><span data-feather="github"></span></a>
            </p>
        </div>
    </footer>

    <script src="/js/jquery.min.js"></script>
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/datatables.min.js"></script>
    <script src="/js/feather.min.js"></script>
    <script src="/js/chart.js"></script>
    <script src="/js/data.json"></script>
    <script src="/js/main.js"></script>
</body>

</html>