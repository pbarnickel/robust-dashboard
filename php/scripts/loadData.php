<?php

use BPS\RobustDashboard\Main;

require_once('../Constants.php');
require_once('../Model/Entry.php');
require_once('../Model/EntryRBT.php');
require_once('../Model/EntryRBS.php');
require_once('../Model/History.php');
require_once('../Model/HistoryRBT.php');
require_once('../Model/HistoryRBS.php');
require_once('../API/API.php');
require_once('../API/DatabaseAPI.php');
require_once('../API/RobustAPI.php');
require_once('../Main.php');

$main = new Main();
$main->exportDataRBT();
$main->exportDataRBS();