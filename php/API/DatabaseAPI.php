<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * API for Database-Actions in relation to Robust Dashboard
 * 
 */

namespace BPS\RobustDashboard\API;

use BPS\RobustDashboard\Constants;
use BPS\RobustDashboard\API\RequestAPI;
use BPS\RobustDashboard\Model\RobustBurnHistoryEntry;
use mysqli;

class DatabaseAPI extends BaseAPI
{

    protected $oConnection;

    protected function openConnection()
    {
        $this->oConnection = mysqli_connect(Constants::DB_SERVER, Constants::DB_USER, Constants::DB_PASSWORD, Constants::DB_NAME);

        if ($this->oConnection->connect_error) {
            die('Connection failed: ' . $this->oConnection->connect_error);
        }
    }

    protected function closeConnection()
    {
        $this->oConnection->close();
    }

    public function readRobustBurnHistory()
    {

        $this->openConnection();

        $sQuery = Constants::DB_QRY_SELECT_ROBUST_BURNED_HISTORY;
        $oRobustBurnedHistory = $this->oConnection->query($sQuery);

        return $oRobustBurnedHistory;
    }

    public function updateRobustBurnHistory($oLastEntry)
    {

        $this->openConnection();

        $sDate = date('Y-m-d');

        $sTotalRobustBurned = RequestAPI::getTotalBurned();
        $dTotalRobustBurned = bcadd($sTotalRobustBurned, '0', 2);

        if($oLastEntry){
            $dLastBurned = bcadd($oLastEntry->getTotalBurned(), '0', 2);
            $dDifferenceBurned = $dTotalRobustBurned - $dLastBurned;
        } else {
            $dDifferenceBurned = $dTotalRobustBurned;
        }
        $dDifferenceBurned = bcadd($dDifferenceBurned, '0', 2);

        $sQuery = Constants::DB_QRY_INSERT_ROBUST_BURNED_HISTORY . ' ("' . $sDate . '", ' . $dTotalRobustBurned . ', ' . $dDifferenceBurned . ')';

        if ($this->oConnection->query($sQuery) === TRUE) {
            $sID = $this->oConnection->insert_id;
            $oNewEntry = new RobustBurnHistoryEntry($sID, $sDate, $dTotalRobustBurned, $dDifferenceBurned);
        } else {
            $oNewEntry = FALSE;
            //echo "Error: " . $sQuery . "<br>" . $this->oConnection->error;
        }

        $this->closeConnection();

        return $oNewEntry;
    }
}
