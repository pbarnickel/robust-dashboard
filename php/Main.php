<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Main-Controller for Robust Dashboard
 * 
 */

namespace BPS\RobustDashboard;

use BPS\RobustDashboard\Constants;
use BPS\RobustDashboard\API\RequestAPI;
use BPS\RobustDashboard\API\DatabaseAPI;
use BPS\RobustDashboard\Model\RobustBurnHistory;
use BPS\RobustDashboard\Model\RobustBurnHistoryEntry;

class Main implements Constants
{

    protected $oDatabaseAPI;
    protected $oRobustBurnHistory;
    protected $oCurrentSituation;

    public function __construct()
    {
        $this->oDatabaseAPI = new DatabaseAPI();
        $this->oRobustBurnHistory = new RobustBurnHistory();
    }

    public function initDashboard()
    {

        $this->initRobustBurnHistory();
        $this->initCurrentSituation();
        $this->printRobustBurnHistory();
    }

    public function runDailyScript()
    {
        $this->initRobustBurnHistory();
        $this->updateRobustBurnHistory();
    }

    public function initRobustBurnHistory()
    {

        $oRobustBurnHistory = $this->oDatabaseAPI->readRobustBurnHistory();

        if ($oRobustBurnHistory->num_rows > 0) {
            while ($oRow = $oRobustBurnHistory->fetch_assoc()) {
                $oEntry = new RobustBurnHistoryEntry(
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_ID],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_DATE],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_TB],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_DB]
                );
                $this->oRobustBurnHistory->addEntry($oEntry);
            }
        }
    }

    public function initCurrentSituation()
    {
        $oLastEntry = $this->oRobustBurnHistory->getLastEntry();
        $sCurrentBurned = RequestAPI::getTotalBurned();
        $dCurrentBurned = bcadd($sCurrentBurned, '0', 2);
        if ($oLastEntry) {
            $dLastBurned = bcadd($oLastEntry->getTotalBurned(), '0', 2);
            $dDifferenceBurned = $sCurrentBurned - $dLastBurned;
        } else {
            $dDifferenceBurned = $dCurrentBurned;
        }
        $dDifferenceBurned = bcadd($dDifferenceBurned, '0', 2);

        $this->oCurrentSituation = new RobustBurnHistoryEntry(NULL, 'Current Situation', $dCurrentBurned, $dDifferenceBurned);

    }

    public function printRobustBurnHistory()
    {
        $sOutput = $this->oRobustBurnHistory->getHTML($this->oCurrentSituation);
        echo $sOutput;
    }

    public function updateRobustBurnHistory()
    {
        $oLastEntry = $this->oRobustBurnHistory->getLastEntry();
        $newEntry = $this->oDatabaseAPI->updateRobustBurnHistory($oLastEntry);
        if ($newEntry) {
            $this->oRobustBurnHistory->addNewEntry($newEntry);
        }
    }
}
