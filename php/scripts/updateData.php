<?php

use BPS\RobustDashboard\Main;

require_once('require.php');

$main = new Main();
$main->updateDataRBT();
$main->updateDataRBS();