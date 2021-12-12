<?php

use BPS\RobustDashboard\Main;

require_once('php/Constants.php');
require_once('php/Model/RobustBurnHistoryEntry.php');
require_once('php/Model/RobustBurnHistory.php');
require_once('php/Main.php');
require_once('php/API/BaseAPI.php');
require_once('php/API/RequestAPI.php');
require_once('php/API/DatabaseAPI.php');

$oMain = new Main();
$oMain->initDashboard();
