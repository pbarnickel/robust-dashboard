<?php

use BPS\RobustDashboard\Main;

require_once('Constants.php');
require_once('Model/RobustBurnHistoryEntry.php');
require_once('Model/RobustBurnHistory.php');
require_once('Main.php');
require_once('API/BaseAPI.php');
require_once('API/RequestAPI.php');
require_once('API/DatabaseAPI.php');

$oMain = new Main();
$oMain->runMigrationScript();
